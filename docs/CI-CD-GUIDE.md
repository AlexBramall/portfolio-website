# CI/CD Implementation Guide

A comprehensive guide to setting up a professional CI/CD pipeline for this portfolio website.

## 📖 What is CI/CD?

**CI/CD** (Continuous Integration / Continuous Deployment) automates the process of testing, building, and deploying your application.

### **Continuous Integration (CI)**
- Automatically tests code when you push changes
- Runs linting and type checking
- Builds the application to catch errors early
- Ensures code quality before merging

### **Continuous Deployment (CD)**
- Automatically deploys successful builds
- Publishes to production or staging environments
- No manual deployment steps needed
- Fast, reliable releases

### **Why It Matters**
✅ Catch bugs before they reach production
✅ Consistent, repeatable deployments
✅ Faster development cycles
✅ Increased confidence in releases
✅ Professional development workflow

---

## 🚀 Recommended CI/CD Stack

For this React/TypeScript portfolio, I recommend:

### **Platform: GitHub Actions**
- ✅ **Free** for public repositories (2,000 minutes/month for private)
- ✅ **Native GitHub integration** - no external service needed
- ✅ **YAML configuration** - easy to read and modify
- ✅ **Rich ecosystem** - thousands of pre-built actions
- ✅ **Matrix builds** - test on multiple Node versions
- ✅ **Secrets management** - secure environment variables

### **Alternative Platforms**
- **Vercel** - Zero-config deployments for Next.js/React (free tier)
- **Netlify** - Similar to Vercel with great DX (free tier)
- **GitLab CI/CD** - If using GitLab instead of GitHub
- **CircleCI** - More powerful, complex pricing
- **Travis CI** - Legacy option, less popular now

---

## 🏗️ CI/CD Pipeline Architecture

### **Recommended Pipeline**

```
┌─────────────────────────────────────────────────────────────┐
│  Developer pushes code to GitHub                            │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  Stage 1: Quality Checks (CI)                               │
├─────────────────────────────────────────────────────────────┤
│  • Install dependencies (with caching)                      │
│  • Run ESLint (code quality)                                │
│  • Run TypeScript type checking                             │
│  • Run Prettier (code formatting check)                     │
│  • Run unit tests (when added)                              │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼ (only if all checks pass)
┌─────────────────────────────────────────────────────────────┐
│  Stage 2: Build (CI)                                        │
├─────────────────────────────────────────────────────────────┤
│  • Build production bundle                                  │
│  • Verify build succeeds                                    │
│  • Upload build artifacts                                   │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼ (only on main branch)
┌─────────────────────────────────────────────────────────────┐
│  Stage 3: Deploy (CD)                                       │
├─────────────────────────────────────────────────────────────┤
│  • Deploy to staging (on develop branch)                    │
│  • Deploy to production (on main branch)                    │
│  • Update Sentry release                                    │
│  • Send deployment notification                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 GitHub Actions Implementation

### **Step 1: Create Workflow Directory**

```bash
mkdir -p .github/workflows
```

### **Step 2: Create CI Workflow**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  quality-checks:
    name: Quality Checks
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Check TypeScript types
        run: npx tsc --noEmit

      - name: Run tests (when available)
        run: npm test --if-present
        continue-on-error: true

  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: quality-checks

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build production bundle
        run: npm run build
        env:
          VITE_SENTRY_DSN: ${{ secrets.VITE_SENTRY_DSN }}

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
          retention-days: 7
```

### **Step 3: Create Deployment Workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build for production
        run: npm run build
        env:
          VITE_SENTRY_DSN: ${{ secrets.VITE_SENTRY_DSN }}
          VITE_APP_ENV: production

      # Option 1: Deploy to GitHub Pages
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist

      # Option 2: Deploy to Netlify (comment out Option 1 if using this)
      # - name: Deploy to Netlify
      #   uses: nwtgck/actions-netlify@v2
      #   with:
      #     publish-dir: './dist'
      #     production-branch: main
      #     production-deploy: true
      #   env:
      #     NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
      #     NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}

      # Option 3: Deploy to Vercel (comment out Option 1 if using this)
      # - name: Deploy to Vercel
      #   uses: amondnet/vercel-action@v25
      #   with:
      #     vercel-token: ${{ secrets.VERCEL_TOKEN }}
      #     vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
      #     vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
      #     vercel-args: '--prod'

      - name: Create Sentry release
        uses: getsentry/action-release@v1
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
          SENTRY_ORG: ${{ secrets.SENTRY_ORG }}
          SENTRY_PROJECT: ${{ secrets.SENTRY_PROJECT }}
        with:
          environment: production
          version: ${{ github.sha }}
```

### **Step 4: Add PR Preview Workflow**

Create `.github/workflows/preview.yml`:

```yaml
name: Preview Deployment

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  deploy-preview:
    name: Deploy Preview
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build for preview
        run: npm run build
        env:
          VITE_SENTRY_DSN: ${{ secrets.VITE_SENTRY_DSN }}
          VITE_APP_ENV: preview

      - name: Deploy to Netlify (Preview)
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: './dist'
          production-deploy: false
          alias: pr-${{ github.event.number }}
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}

      - name: Comment PR with preview URL
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `🚀 Preview deployed! Check it out at: https://pr-${{ github.event.number }}--yoursite.netlify.app`
            })
```

---

## 🔐 Setting Up Secrets

GitHub Actions requires secrets for sensitive data like API keys.

### **How to Add Secrets**

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:

```bash
# Sentry (for error tracking)
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
SENTRY_AUTH_TOKEN=your-sentry-auth-token
SENTRY_ORG=your-org-name
SENTRY_PROJECT=your-project-name

# Netlify (if using Netlify)
NETLIFY_AUTH_TOKEN=your-netlify-token
NETLIFY_SITE_ID=your-site-id

# Vercel (if using Vercel)
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id

# AWS (if deploying to S3)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
S3_BUCKET=your-bucket-name
```

---

## 🌐 Deployment Options Comparison

| Platform | Pros | Cons | Best For |
|----------|------|------|----------|
| **Vercel** | • Zero config for React<br>• Automatic previews<br>• Edge network<br>• Great DX | • Vendor lock-in<br>• Limited free tier | Production apps with high traffic |
| **Netlify** | • Easy setup<br>• Form handling<br>• Serverless functions<br>• Great free tier | • Slightly slower builds than Vercel | Small to medium projects |
| **GitHub Pages** | • 100% free<br>• Native GitHub integration<br>• Simple | • Static only<br>• No serverless functions<br>• Slower than CDNs | Personal portfolios, docs |
| **AWS S3 + CloudFront** | • Complete control<br>• Scalable<br>• Professional | • More complex setup<br>• Costs can add up | Enterprise projects |
| **Cloudflare Pages** | • Free unlimited requests<br>• Fast global CDN<br>• Workers for edge computing | • Newer, less mature | Modern web apps |

### **Recommendation for This Project**

**Best Choice: Vercel or Netlify**
- Both have excellent free tiers
- Automatic HTTPS
- Preview deployments for PRs
- Built-in CDN
- Zero configuration needed

**Budget Choice: GitHub Pages**
- Completely free
- Good for portfolio sites
- No server-side features needed

---

## 🧪 Adding Tests to Pipeline

Currently, the project has no tests. Here's how to add them:

### **Install Testing Libraries**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### **Create Vitest Config**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
});
```

### **Add Test Script**

In `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### **Example Component Test**

Create `src/components/sections/Hero.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';
import { describe, it, expect, vi } from 'vitest';

describe('Hero Component', () => {
  it('renders the hero section with name', () => {
    const mockNavigate = vi.fn();
    render(<Hero onNavigate={mockNavigate} />);

    expect(screen.getByText('Alex Bramall')).toBeInTheDocument();
    expect(screen.getByText('Technical Project Manager')).toBeInTheDocument();
  });

  it('calls navigate when View My Work is clicked', () => {
    const mockNavigate = vi.fn();
    render(<Hero onNavigate={mockNavigate} />);

    const button = screen.getByText('View My Work');
    button.click();

    expect(mockNavigate).toHaveBeenCalledWith('projects');
  });
});
```

---

## 📊 Advanced CI/CD Features

### **1. Code Coverage Reports**

Add to `.github/workflows/ci.yml`:

```yaml
- name: Run tests with coverage
  run: npm run test:coverage

- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/coverage-final.json
    flags: unittests
```

### **2. Lighthouse CI (Performance Audits)**

Create `.github/workflows/lighthouse.yml`:

```yaml
name: Lighthouse CI

on: [push]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20.x'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:5173
          uploadArtifacts: true
          temporaryPublicStorage: true
```

### **3. Dependency Security Scanning**

Add to `.github/workflows/security.yml`:

```yaml
name: Security Scan

on:
  schedule:
    - cron: '0 0 * * 0' # Weekly on Sunday
  push:
    branches: [main]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Snyk to check for vulnerabilities
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
```

### **4. Automated Dependency Updates**

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    reviewers:
      - "your-github-username"
    labels:
      - "dependencies"
      - "automated"
```

### **5. Bundle Size Monitoring**

Add to package.json scripts:

```json
{
  "scripts": {
    "analyze": "vite-bundle-visualizer"
  }
}
```

Add to CI workflow:

```yaml
- name: Analyze bundle size
  run: |
    npm run build
    npx vite-bundle-visualizer --open=false

- name: Check bundle size
  uses: andresz1/size-limit-action@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
```

---

## 🎯 Best Practices

### **1. Branch Protection Rules**

Set up in GitHub Settings → Branches:
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging
- ✅ Require linear history
- ✅ Include administrators

### **2. Deployment Environments**

Create multiple environments:
- **Production** (`main` branch) - Live site
- **Staging** (`develop` branch) - Pre-production testing
- **Preview** (Pull requests) - Feature testing

### **3. Rollback Strategy**

```yaml
# Add to deploy workflow
- name: Create deployment tag
  run: |
    git tag "deploy-$(date +%Y%m%d-%H%M%S)"
    git push origin --tags

# To rollback:
# git checkout <previous-tag>
# git push origin main --force
```

### **4. Monitoring Deployments**

```yaml
- name: Notify deployment
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: 'Deployment to production completed!'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
  if: always()
```

---

## 🚀 Quick Start Checklist

To implement CI/CD for this project:

- [ ] Create `.github/workflows/ci.yml`
- [ ] Create `.github/workflows/deploy.yml`
- [ ] Add GitHub secrets (Sentry, deployment platform)
- [ ] Choose deployment platform (Vercel/Netlify/GitHub Pages)
- [ ] Set up branch protection rules
- [ ] Add tests (optional but recommended)
- [ ] Configure Dependabot for automated updates
- [ ] Set up deployment notifications
- [ ] Test the pipeline with a PR
- [ ] Monitor first production deployment

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Netlify Deployment Guide](https://docs.netlify.com/)
- [Vitest Documentation](https://vitest.dev/)
- [Sentry CI/CD Integration](https://docs.sentry.io/product/cli/)

---

## 💡 Next Steps

1. **Start Simple**: Implement basic CI (lint + build) first
2. **Add Tests**: Gradually add test coverage
3. **Enable CD**: Deploy to staging, then production
4. **Monitor**: Set up performance and error monitoring
5. **Iterate**: Add more checks and optimizations over time

Your portfolio will be deployed automatically with every commit, tested for quality, and monitored for errors - a truly professional development workflow! 🎉
