#!/usr/bin/env node
/**
 * Verification harness for the Vite+React portfolio site.
 * Launch, doctor, drive (Chrome CDP), and clean up an isolated instance.
 * Evidence files are never deleted by cleanup.
 */
import { spawn, spawnSync, execSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const helperDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(helperDir, '../../../..');
const DEFAULT_PORT = 4173;
const DEFAULT_HOST = '127.0.0.1';
const APP_BASE = '/portfolio-website/';
const READY_TIMEOUT_MS = 60_000;
const CDP_TIMEOUT_MS = 30_000;

function usage(exitCode = 1) {
  const text = `control-portfolio — isolated launch/doctor/drive/cleanup for this portfolio

Usage:
  control-portfolio launch [--mode preview|dev] [--port N] [--host HOST]
  control-portfolio doctor
  control-portfolio url
  control-portfolio browser goto [--url URL]
  control-portfolio browser click --role ROLE --name NAME
  control-portfolio browser click --selector CSS
  control-portfolio browser wait-for --text TEXT [--timeout MS]
  control-portfolio browser wait-for --selector CSS [--timeout MS] [--in-view]
  control-portfolio browser contains --text TEXT
  control-portfolio browser snapshot --aria [--path FILE]
  control-portfolio browser screenshot [--path FILE] [--full-page]
  control-portfolio browser viewport --width N --height N [--mobile]
  control-portfolio browser eval --expr JS
  control-portfolio cleanup

Env:
  VERIFY_RUN_ID          Isolate concurrent runs (default: default)
  VERIFY_PORT            App port (default: 4173)
  VERIFY_HOST            Bind host (default: 127.0.0.1)
  VERIFY_MODE            preview (production build) or dev (default: preview)
  VERIFY_ROOT            Repo root override
  VERIFY_STATE_DIR       Directory for state.json (default: /tmp/verify-portfolio/<run-id>)
  VERIFY_EVIDENCE_DIR    Proof artifacts; cleanup does not delete this
  CHROME_PATH            Chrome/Chromium binary override
`;
  process.stderr.write(text);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--help' || token === '-h') {
      out.help = true;
    } else if (token.startsWith('--')) {
      const key = token.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) {
        out[key] = true;
      } else {
        out[key] = next;
        i += 1;
      }
    } else {
      out._.push(token);
    }
  }
  return out;
}

function runId() {
  return process.env.VERIFY_RUN_ID || 'default';
}

function stateDir() {
  return process.env.VERIFY_STATE_DIR || path.join('/tmp/verify-portfolio', runId());
}

function evidenceDir() {
  return process.env.VERIFY_EVIDENCE_DIR || path.join(stateDir(), 'evidence');
}

function statePath() {
  return path.join(stateDir(), 'state.json');
}

function readState() {
  const file = statePath();
  if (!fs.existsSync(file)) {
    throw new Error(`No verification instance state at ${file}. Run launch first.`);
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeState(state) {
  fs.mkdirSync(stateDir(), { recursive: true });
  fs.writeFileSync(statePath(), `${JSON.stringify(state, null, 2)}\n`);
}

function appUrl(host, port) {
  return `http://${host}:${port}${APP_BASE}`;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function isAlive(pid) {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function cmdlineFromPs(pid) {
  const numeric = Number(pid);
  if (!Number.isInteger(numeric) || numeric <= 0) return '';
  for (const format of ['command=', 'args=']) {
    const result = spawnSync('ps', ['-ww', '-p', String(numeric), '-o', format], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    if (result.status !== 0) continue;
    const text = String(result.stdout || '').trim();
    if (text) return text;
  }
  return '';
}

function cmdlineOf(pid) {
  // Linux exposes /proc/<pid>/cmdline. macOS does not; ask ps when it is absent.
  const procPath = `/proc/${pid}/cmdline`;
  if (fs.existsSync(procPath)) {
    try {
      const text = fs.readFileSync(procPath, 'utf8').replace(/\0/g, ' ').trim();
      if (text) return text;
    } catch {
      // unreadable proc entry; fall through to ps
    }
  }
  return cmdlineFromPs(pid);
}

function ensureGlobalWebSocket() {
  if (typeof globalThis.WebSocket === 'function') return;

  const [major, minor] = process.versions.node.split('.').map((part) => Number.parseInt(part, 10));
  const flagSupported =
    Number.isFinite(major) && Number.isFinite(minor) && (major > 20 || (major === 20 && minor >= 10));
  if (process.env.VERIFY_WS_REEXEC === '1' || !flagSupported) {
    process.stderr.write(
      `Global WebSocket is unavailable on Node ${process.versions.node}. Chrome CDP needs Node 22+ (built in) or Node 20.10+ / 21 with --experimental-websocket.\n`,
    );
    process.exit(1);
  }

  const script = fileURLToPath(import.meta.url);
  const execArgv = process.execArgv.filter((arg) => arg !== '--no-experimental-websocket');
  if (!execArgv.includes('--experimental-websocket')) {
    execArgv.unshift('--experimental-websocket');
  }
  const child = spawnSync(process.execPath, [...execArgv, script, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, VERIFY_WS_REEXEC: '1' },
  });
  process.exit(child.status === null ? 1 : child.status);
}

function resolveChrome() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const candidates = [
    'google-chrome',
    'google-chrome-stable',
    'chromium',
    'chromium-browser',
  ];
  for (const name of candidates) {
    try {
      const found = execSync(`command -v ${name}`, { encoding: 'utf8' }).trim();
      if (found) return found;
    } catch {
      // keep looking
    }
  }
  throw new Error('No Chrome/Chromium binary found. Set CHROME_PATH or install google-chrome.');
}

function httpGet(url, timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, { timeout: timeoutMs }, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode || 0,
          text: Buffer.concat(chunks).toString('utf8'),
        });
      });
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`HTTP timeout for ${url}`));
    });
  });
}

async function waitForHttpOk(url, timeoutMs) {
  const start = Date.now();
  let lastError = 'not attempted';
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await httpGet(url);
      if (res.status >= 200 && res.status < 400) return res;
      lastError = `status ${res.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await sleep(250);
  }
  throw new Error(`Timed out waiting for ${url} (${lastError})`);
}

function ensureDeps() {
  if (!fs.existsSync(path.join(repoRoot, 'node_modules', 'vite'))) {
    execSync('npm ci', { cwd: repoRoot, stdio: 'inherit' });
  }
}

function viteBin() {
  const bin = path.join(repoRoot, 'node_modules', '.bin', 'vite');
  if (!fs.existsSync(bin)) {
    throw new Error(`vite not found at ${bin}; launch should have run npm ci`);
  }
  return bin;
}

function killPidTree(pid) {
  if (!pid || !isAlive(pid)) return;
  try {
    process.kill(-pid, 'SIGTERM');
  } catch {
    try {
      process.kill(pid, 'SIGTERM');
    } catch {
      // already gone
    }
  }
}

async function waitUntilDead(pid, timeoutMs) {
  const start = Date.now();
  while (isAlive(pid) && Date.now() - start < timeoutMs) {
    await sleep(100);
  }
  if (isAlive(pid)) {
    try {
      process.kill(-pid, 'SIGKILL');
    } catch {
      try {
        process.kill(pid, 'SIGKILL');
      } catch {
        // gone
      }
    }
  }
}

class Cdp {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.nextId = 0;
    this.pending = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.addEventListener('open', () => resolve());
      this.ws.addEventListener('error', (event) => {
        reject(new Error(`CDP websocket error: ${event.message || 'failed to connect'}`));
      });
    });
    this.ws.addEventListener('message', (event) => {
      const msg = JSON.parse(String(event.data));
      if (msg.id == null) return;
      const waiter = this.pending.get(msg.id);
      if (!waiter) return;
      this.pending.delete(msg.id);
      if (msg.error) {
        waiter.reject(new Error(`${msg.error.message} (${msg.error.code})`));
      } else {
        waiter.resolve(msg.result);
      }
    });
  }

  send(method, params = {}) {
    const id = (this.nextId += 1);
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`CDP timeout: ${method}`));
      }, CDP_TIMEOUT_MS);
      this.pending.set(id, {
        resolve: (value) => {
          clearTimeout(timer);
          resolve(value);
        },
        reject: (error) => {
          clearTimeout(timer);
          reject(error);
        },
      });
    });
  }

  close() {
    try {
      this.ws?.close();
    } catch {
      // ignore
    }
  }
}

async function waitForDevtools(portFile, timeoutMs = 15_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (fs.existsSync(portFile)) {
      const raw = fs.readFileSync(portFile, 'utf8').trim();
      const port = Number(raw.split('\n')[0]);
      if (Number.isFinite(port) && port > 0) return port;
    }
    await sleep(50);
  }
  throw new Error(`Chrome did not write ${portFile}`);
}

async function pageWebSocketUrl(debugPort) {
  const start = Date.now();
  let lastError = 'no targets';
  while (Date.now() - start < 15_000) {
    try {
      const res = await httpGet(`http://127.0.0.1:${debugPort}/json/list`);
      const targets = JSON.parse(res.text);
      const page = targets.find((target) => target.type === 'page' && target.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
      lastError = `targets: ${targets.map((t) => t.type).join(',') || 'none'}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await sleep(100);
  }
  throw new Error(`No Chrome page target on debug port ${debugPort} (${lastError})`);
}

async function launchChrome(state) {
  const chromePath = resolveChrome();
  const userDataDir = path.join(stateDir(), 'chrome-profile');
  fs.rmSync(userDataDir, { recursive: true, force: true });
  fs.mkdirSync(userDataDir, { recursive: true });
  const logPath = path.join(stateDir(), 'chrome.log');
  const logFd = fs.openSync(logPath, 'w');
  const child = spawn(
    chromePath,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-dev-shm-usage',
      '--disable-background-networking',
      '--disable-sync',
      '--disable-extensions',
      '--mute-audio',
      '--remote-debugging-port=0',
      `--user-data-dir=${userDataDir}`,
      '--window-size=1280,800',
      'about:blank',
    ],
    {
      cwd: repoRoot,
      detached: true,
      stdio: ['ignore', logFd, logFd],
      env: { ...process.env, HOME: userDataDir },
    },
  );
  fs.closeSync(logFd);
  child.unref();
  const debugPort = await waitForDevtools(path.join(userDataDir, 'DevToolsActivePort'));
  state.chrome = {
    pid: child.pid,
    debugPort,
    userDataDir,
    logPath,
    binary: chromePath,
  };
  writeState(state);
  return state;
}

async function connectPage(state) {
  if (!state.chrome?.pid || !isAlive(state.chrome.pid)) {
    await launchChrome(state);
  }
  const wsUrl = await pageWebSocketUrl(state.chrome.debugPort);
  const cdp = new Cdp(wsUrl);
  await cdp.connect();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('DOM.enable');
  if (!state.chrome.viewport) {
    await setViewport(cdp, 1280, 800, false);
    state.chrome.viewport = { width: 1280, height: 800, mobile: false };
    writeState(state);
  }
  return cdp;
}

async function setViewport(cdp, width, height, mobile) {
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
  });
}

async function evaluate(cdp, expression) {
  const result = await cdp.send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails) {
    const text = result.exceptionDetails.text || 'Runtime.evaluate failed';
    throw new Error(text);
  }
  return result.result?.value;
}

async function waitForMount(cdp, timeoutMs = 20_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const mounted = await evaluate(
      cdp,
      `!!document.querySelector('nav') && !!document.querySelector('h1')`,
    );
    if (mounted) return;
    await sleep(150);
  }
  throw new Error('Portfolio SPA did not mount (nav or h1 missing)');
}

function resolveEvidencePath(filePath, fallbackName) {
  const target = filePath || path.join(evidenceDir(), fallbackName);
  const resolved = path.isAbsolute(target) ? target : path.resolve(evidenceDir(), target);
  fs.mkdirSync(path.dirname(resolved), { recursive: true });
  return resolved;
}

async function cmdLaunch(flags) {
  const host = flags.host || process.env.VERIFY_HOST || DEFAULT_HOST;
  const port = Number(flags.port || process.env.VERIFY_PORT || DEFAULT_PORT);
  const mode = flags.mode || process.env.VERIFY_MODE || 'preview';
  if (mode !== 'preview' && mode !== 'dev') {
    throw new Error(`Unknown mode ${mode}; use preview or dev`);
  }

  if (fs.existsSync(statePath())) {
    try {
      const existing = readState();
      const doctor = await inspectInstance(existing, { throwOnFail: false });
      if (doctor.ok) {
        process.stdout.write(`Already running ${existing.url} (pid ${existing.pid})\n`);
        process.stdout.write(`${JSON.stringify(existing, null, 2)}\n`);
        return;
      }
      await cmdCleanup({ silent: true, keepEvidence: true });
    } catch {
      await cmdCleanup({ silent: true, keepEvidence: true });
    }
  }

  ensureDeps();
  if (mode === 'preview') {
    execSync('npm run build', { cwd: repoRoot, stdio: 'inherit' });
  }

  fs.mkdirSync(stateDir(), { recursive: true });
  fs.mkdirSync(evidenceDir(), { recursive: true });
  const logPath = path.join(stateDir(), 'vite.log');
  const logFd = fs.openSync(logPath, 'w');
  const args =
    mode === 'preview'
      ? ['preview', '--host', host, '--port', String(port), '--strictPort']
      : ['--host', host, '--port', String(port), '--strictPort'];
  const child = spawn(viteBin(), args, {
    cwd: repoRoot,
    detached: true,
    stdio: ['ignore', logFd, logFd],
    env: { ...process.env },
  });
  fs.closeSync(logFd);
  child.unref();

  const url = appUrl(host, port);
  const state = {
    runId: runId(),
    mode,
    pid: child.pid,
    host,
    port,
    url,
    repoRoot,
    logPath,
    evidenceDir: evidenceDir(),
    stateDir: stateDir(),
    startedAt: new Date().toISOString(),
    hostname: os.hostname(),
  };
  writeState(state);

  try {
    await waitForHttpOk(url, READY_TIMEOUT_MS);
  } catch (error) {
    await cmdCleanup({ silent: true, keepEvidence: true });
    throw error;
  }

  process.stdout.write(`Launched ${mode} at ${url} (pid ${child.pid})\n`);
  process.stdout.write(`State: ${statePath()}\n`);
  process.stdout.write(`Evidence: ${evidenceDir()}\n`);
}

async function inspectInstance(state, { throwOnFail }) {
  const checks = [];
  const add = (name, ok, detail) => {
    checks.push({ name, ok, detail });
  };

  add('state-file', true, statePath());
  add('pid-alive', isAlive(state.pid), `pid ${state.pid}`);
  const cmd = cmdlineOf(state.pid);
  add(
    'pid-is-vite',
    /vite/.test(cmd),
    cmd || 'could not read process command line',
  );

  let httpStatus = 0;
  let html = '';
  try {
    const res = await httpGet(state.url);
    httpStatus = res.status;
    html = res.text;
  } catch (error) {
    html = error instanceof Error ? error.message : String(error);
  }
  add('http-ok', httpStatus >= 200 && httpStatus < 400, `GET ${state.url} -> ${httpStatus}`);
  add(
    'html-title',
    html.includes('Alex Bramall | Technical Program Manager'),
    'static index.html title',
  );
  add('html-root', html.includes('id="root"') || html.includes("id='root'"), 'SPA root');
  add('app-base', state.url.endsWith(APP_BASE), state.url);

  const failed = checks.filter((check) => !check.ok);
  const result = {
    ok: failed.length === 0,
    url: state.url,
    pid: state.pid,
    mode: state.mode,
    runId: state.runId,
    evidenceDir: state.evidenceDir || evidenceDir(),
    checks,
  };
  if (!result.ok && throwOnFail) {
    const summary = failed.map((check) => `${check.name}: ${check.detail}`).join('; ');
    throw new Error(`Doctor failed: ${summary}`);
  }
  return result;
}

async function cmdDoctor() {
  const state = readState();
  const result = await inspectInstance(state, { throwOnFail: false });
  let rendered = null;
  if (result.ok) {
    const cdp = await connectPage(state);
    try {
      await cdp.send('Page.navigate', { url: state.url });
      await waitForMount(cdp);
      const probe = await evaluate(
        cdp,
        `({
          title: document.title,
          h1: document.querySelector('#home h1')?.textContent?.trim() || '',
          wordmark: document.querySelector('nav a')?.textContent?.trim() || '',
          sections: [...document.querySelectorAll('section[id]')].map((el) => el.id),
          workNav: [...document.querySelectorAll('a')].some((el) => el.textContent.trim() === 'Work'),
          contactNav: [...document.querySelectorAll('a')].some((el) => el.textContent.trim() === 'Contact'),
          hireNav: [...document.querySelectorAll('a')].some((el) => el.textContent.trim() === 'Hire')
        })`,
      );
      rendered = probe;
      const renderOk =
        Boolean(probe.h1) &&
        probe.wordmark === 'Alex Bramall' &&
        probe.workNav === true &&
        probe.contactNav === true &&
        probe.hireNav === false &&
        Array.isArray(probe.sections) &&
        ['home', 'selected-work', 'how-i-work', 'stack', 'contact-strip'].every((id) =>
          probe.sections.includes(id),
        ) &&
        !probe.sections.includes('hire');
      result.checks.push({
        name: 'spa-rendered',
        ok: renderOk,
        detail: JSON.stringify(probe),
      });
      result.ok = result.ok && renderOk;
    } finally {
      cdp.close();
    }
  }
  result.rendered = rendered;
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (!result.ok) process.exit(1);
}

async function cmdCleanup({ silent = false, keepEvidence = true } = {}) {
  let state = null;
  try {
    state = readState();
  } catch {
    if (!silent) process.stdout.write('Nothing to clean up.\n');
    return;
  }
  if (state.chrome?.pid) {
    killPidTree(state.chrome.pid);
    await waitUntilDead(state.chrome.pid, 3000);
  }
  if (state.pid) {
    killPidTree(state.pid);
    await waitUntilDead(state.pid, 5000);
  }
  if (state.chrome?.userDataDir) {
    fs.rmSync(state.chrome.userDataDir, { recursive: true, force: true });
  }
  const keep = keepEvidence;
  const evidence = state.evidenceDir || evidenceDir();
  for (const file of ['state.json', 'vite.log', 'chrome.log']) {
    const target = path.join(stateDir(), file);
    if (fs.existsSync(target)) fs.rmSync(target);
  }
  if (!keep) {
    fs.rmSync(evidence, { recursive: true, force: true });
  }
  if (!silent) {
    process.stdout.write(`Cleaned instance pid ${state.pid || 'n/a'}.\n`);
    process.stdout.write(`Evidence retained at ${evidence}\n`);
  }
}

async function withPage(fn) {
  const state = readState();
  await inspectInstance(state, { throwOnFail: true });
  const cdp = await connectPage(state);
  try {
    return await fn(cdp, state);
  } finally {
    cdp.close();
  }
}

async function cmdGoto(flags, stateFromCaller, cdpFromCaller) {
  const run = async (cdp, state) => {
    const url = flags.url || state.url;
    await cdp.send('Page.navigate', { url });
    await waitForMount(cdp);
    const info = await evaluate(
      cdp,
      `({ title: document.title, href: location.href, h1: document.querySelector('h1')?.textContent?.trim() })`,
    );
    process.stdout.write(`${JSON.stringify({ ok: true, ...info }, null, 2)}\n`);
  };
  if (cdpFromCaller) return run(cdpFromCaller, stateFromCaller);
  return withPage(run);
}

async function cmdClick(flags) {
  if (!flags.selector && !(flags.role && flags.name != null)) {
    throw new Error('click requires --selector CSS or --role ROLE --name NAME');
  }
  await withPage(async (cdp, state) => {
    const href = await evaluate(cdp, 'location.href');
    if (!href.includes(APP_BASE)) {
      await cdp.send('Page.navigate', { url: state.url });
      await waitForMount(cdp);
    }
    const result = await evaluate(
      cdp,
      `(() => {
        const selector = ${JSON.stringify(flags.selector || null)};
        const role = ${JSON.stringify(flags.role || null)};
        const name = ${JSON.stringify(flags.name || '')};
        const visible = (el) => {
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false;
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        };
        const accName = (el) => {
          const labelled = el.getAttribute('aria-label');
          if (labelled) return labelled.trim();
          return (el.innerText || el.textContent || '').replace(/\\s+/g, ' ').trim();
        };
        const implicitRole = (el) => {
          const explicit = el.getAttribute('role');
          if (explicit) return explicit;
          const tag = el.tagName;
          if (tag === 'BUTTON') return 'button';
          if (tag === 'A') return 'link';
          if (tag === 'IMG') return 'img';
          if (/^H[1-6]$/.test(tag)) return 'heading';
          if (tag === 'NAV') return 'navigation';
          return tag.toLowerCase();
        };
        let match = null;
        if (selector) {
          const nodes = [...document.querySelectorAll(selector)].filter(visible);
          match = nodes[0] || null;
        } else {
          const nodes = [...document.querySelectorAll('a, button, [role], h1, h2, h3, img, nav')];
          match = nodes.find((el) => visible(el) && implicitRole(el) === role && accName(el) === name) || null;
        }
        if (!match) {
          const visibleButtons = [...document.querySelectorAll('a, button, [role="button"]')]
            .filter(visible)
            .map((el) => ({ role: implicitRole(el), name: accName(el) }));
          return { ok: false, visibleButtons };
        }
        const rect = match.getBoundingClientRect();
        const onScreen =
          rect.top >= 0 &&
          rect.bottom <= window.innerHeight &&
          rect.left >= 0 &&
          rect.right <= window.innerWidth;
        if (!onScreen) match.scrollIntoView({ block: 'center', inline: 'nearest' });
        match.click();
        return {
          ok: true,
          tag: match.tagName,
          name: accName(match),
          role: implicitRole(match),
          x: Math.round(rect.x),
          y: Math.round(rect.y),
        };
      })()`,
    );
    if (!result?.ok) {
      throw new Error(`No visible ${flags.role || 'element'} named ${JSON.stringify(flags.name || flags.selector)}. Visible: ${JSON.stringify(result?.visibleButtons || [])}`);
    }
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  });
}

async function cmdWaitFor(flags) {
  const timeout = Number(flags.timeout || 8000);
  const inViewOnly = Boolean(flags['in-view']);
  if (inViewOnly && flags.text) {
    throw new Error('wait-for --in-view requires --selector, not --text');
  }
  if (inViewOnly && !flags.selector) {
    throw new Error('wait-for --in-view requires --selector');
  }
  await withPage(async (cdp) => {
    const start = Date.now();
    let last = null;
    let lastScroll = null;
    let stableFrames = 0;
    while (Date.now() - start < timeout) {
      last = await evaluate(
        cdp,
        `(() => {
          const text = ${JSON.stringify(flags.text || null)};
          const selector = ${JSON.stringify(flags.selector || null)};
          const inViewOnly = ${JSON.stringify(inViewOnly)};
          if (text) {
            const body = document.body.innerText || '';
            return { ok: body.includes(text), detail: text };
          }
          const el = document.querySelector(selector);
          if (!el) return { ok: false, detail: 'missing' };
          const r = el.getBoundingClientRect();
          const header = 80;
          const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
          const atEnd = window.scrollY >= maxScroll - 4;
          const nearTop = r.top >= -24 && r.top <= header + 72;
          const intersects = r.bottom > header && r.top < window.innerHeight;
          const inView = r.bottom > 0 && r.top < window.innerHeight && r.width > 0 && r.height > 0;
          const ok = inViewOnly ? inView : intersects && (nearTop || atEnd);
          return {
            ok,
            detail: {
              id: el.id,
              top: Math.round(r.top),
              height: Math.round(r.height),
              scrollY: Math.round(window.scrollY),
              atEnd,
              nearTop,
              inView,
            },
          };
        })()`,
      );
      const scrollY = last?.detail?.scrollY;
      if (last?.ok && scrollY === lastScroll) stableFrames += 1;
      else stableFrames = 0;
      lastScroll = scrollY;
      if (last?.ok && (last.detail == null || stableFrames >= 2)) {
        process.stdout.write(`${JSON.stringify(last, null, 2)}\n`);
        return;
      }
      await sleep(150);
    }
    throw new Error(`wait-for timed out: ${JSON.stringify(last)}`);
  });
}

async function cmdContains(flags) {
  if (!flags.text) throw new Error('contains requires --text');
  await withPage(async (cdp) => {
    const body = await evaluate(cdp, 'document.body.innerText || ""');
    const ok = String(body).includes(flags.text);
    process.stdout.write(`${JSON.stringify({ ok, text: flags.text }, null, 2)}\n`);
    if (!ok) process.exit(1);
  });
}

async function cmdSnapshot(flags) {
  await withPage(async (cdp) => {
    const snapshot = await evaluate(
      cdp,
      `(() => {
        const accName = (el) => {
          const labelled = el.getAttribute('aria-label');
          if (labelled) return labelled.trim();
          const alt = el.getAttribute('alt');
          if (alt) return alt.trim();
          return (el.innerText || el.textContent || '').replace(/\\s+/g, ' ').trim();
        };
        const visible = (el) => {
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') return false;
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        };
        const inView = (el) => {
          const r = el.getBoundingClientRect();
          return r.bottom > 0 && r.top < window.innerHeight && r.width > 0 && r.height > 0;
        };
        const mark = (line, el) => line + (inView(el) ? ' [in-view]' : '');
        const lines = [
          'title: ' + document.title,
          'url: ' + location.href,
          'scrollY: ' + Math.round(window.scrollY),
          'viewport: ' + window.innerWidth + 'x' + window.innerHeight,
          '',
        ];
        for (const el of document.querySelectorAll('nav, section[id], h1, h2, h3, button, a, img[alt]')) {
          if (!visible(el)) continue;
          const tag = el.tagName.toLowerCase();
          if (tag === 'section') {
            lines.push(mark('section#' + el.id, el));
            continue;
          }
          if (tag === 'nav') {
            lines.push(mark('navigation', el));
            continue;
          }
          const name = accName(el);
          if (!name) continue;
          if (tag === 'h1' || tag === 'h2' || tag === 'h3') {
            lines.push(mark('heading' + tag.slice(1) + ' "' + name.replace(/"/g, '\\\\"') + '"', el));
          } else if (tag === 'button') {
            lines.push(mark('button "' + name.replace(/"/g, '\\\\"') + '"', el));
          } else if (tag === 'a') {
            lines.push(mark('link "' + name.replace(/"/g, '\\\\"') + '" href=' + (el.getAttribute('href') || ''), el));
          } else if (tag === 'img') {
            lines.push(mark('img "' + name.replace(/"/g, '\\\\"') + '"', el));
          }
        }
        return lines.join('\\n');
      })()`,
    );
    const outPath = resolveEvidencePath(flags.path, 'snapshot.aria.txt');
    fs.writeFileSync(outPath, `${snapshot}\n`);
    process.stdout.write(`Wrote ${outPath}\n`);
    if (!flags.path) process.stdout.write(`${snapshot}\n`);
  });
}

async function cmdScreenshot(flags) {
  await withPage(async (cdp, state) => {
    const fullPage = Boolean(flags['full-page']);
    const previous = state.chrome?.viewport || { width: 1280, height: 800, mobile: false };
    if (fullPage) {
      const metrics = await evaluate(
        cdp,
        `({ width: Math.max(document.documentElement.scrollWidth, 1280), height: Math.max(document.documentElement.scrollHeight, 800) })`,
      );
      await setViewport(cdp, metrics.width, Math.min(metrics.height, 8000), false);
    }
    const shot = await cdp.send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
      captureBeyondViewport: fullPage,
    });
    const outPath = resolveEvidencePath(flags.path, 'screenshot.png');
    fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
    if (fullPage) {
      await setViewport(cdp, previous.width, previous.height, previous.mobile);
    }
    process.stdout.write(`Wrote ${outPath}\n`);
  });
}

async function cmdViewport(flags) {
  const width = Number(flags.width);
  const height = Number(flags.height);
  if (!width || !height) throw new Error('viewport requires --width and --height');
  const mobile = Boolean(flags.mobile);
  await withPage(async (cdp, state) => {
    await setViewport(cdp, width, height, mobile);
    state.chrome.viewport = { width, height, mobile };
    writeState(state);
    process.stdout.write(`${JSON.stringify(state.chrome.viewport)}\n`);
  });
}

async function cmdEval(flags) {
  if (!flags.expr) throw new Error('eval requires --expr JS');
  await withPage(async (cdp) => {
    const value = await evaluate(cdp, flags.expr);
    process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
  });
}

async function main() {
  ensureGlobalWebSocket();
  const flags = parseArgs(process.argv.slice(2));
  if (flags.help) usage(0);
  const [command, sub] = flags._;
  if (!command) usage(1);
  process.env.VERIFY_ROOT = process.env.VERIFY_ROOT || repoRoot;

  try {
    switch (command) {
      case 'launch':
        await cmdLaunch(flags);
        break;
      case 'doctor':
        await cmdDoctor();
        break;
      case 'url': {
        const state = readState();
        process.stdout.write(`${state.url}\n`);
        break;
      }
      case 'cleanup':
        await cmdCleanup();
        break;
      case 'browser': {
        switch (sub) {
          case 'goto':
            await cmdGoto(flags);
            break;
          case 'click':
            await cmdClick(flags);
            break;
          case 'wait-for':
            await cmdWaitFor(flags);
            break;
          case 'contains':
            await cmdContains(flags);
            break;
          case 'snapshot':
            await cmdSnapshot(flags);
            break;
          case 'screenshot':
            await cmdScreenshot(flags);
            break;
          case 'viewport':
            await cmdViewport(flags);
            break;
          case 'eval':
            await cmdEval(flags);
            break;
          default:
            usage(1);
        }
        break;
      }
      default:
        usage(1);
    }
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  }
}

await main();
