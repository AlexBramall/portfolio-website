import { WorkCase } from '../../types';
import { isFilled } from '../../lib/placeholder';
import { ResultBadge } from '../ui/ResultBadge';

interface CaseLayoutProps {
  workCase: WorkCase;
}

const toc = [
  { id: 'context', label: 'Context' },
  { id: 'role-scope', label: 'Role & scope' },
  { id: 'constraints', label: 'Constraints' },
  { id: 'insights', label: 'Insights' },
  { id: 'options-rejected', label: 'Options rejected' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'what-shipped', label: 'What shipped' },
  { id: 'ai-honesty', label: 'AI tooling honesty' },
  { id: 'results', label: 'Results' },
  { id: 'learnings', label: 'Learnings' },
] as const;

function CaseSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: string;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-h2 text-text">{title}</h2>
      <p className="mt-4 text-body text-text-secondary">{children}</p>
    </section>
  );
}

export const CaseLayout = ({ workCase }: CaseLayoutProps) => {
  const resultItems = workCase.results.items.filter((item) => isFilled(item.value));
  const artifacts = workCase.artifacts.filter((item) => item.label.trim().length > 0);

  return (
    <article className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
      <nav
        aria-label="Case sections"
        className="mb-10 hidden lg:sticky lg:top-24 lg:mb-0 lg:block lg:self-start"
      >
        <ul className="space-y-2">
          {toc.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-caption text-text-muted transition-colors duration-150 hover:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="max-w-prose space-y-12">
        <header>
          <p className="mb-3 text-caption uppercase tracking-wide text-text-muted">Case</p>
          <h1 className="text-display text-text">{workCase.title}</h1>
          <p className="mt-4 text-body text-text-secondary">{workCase.outcome}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {workCase.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-pill bg-surface-muted px-3 py-1 text-caption text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <CaseSection id="context" title="Context">
          {workCase.context}
        </CaseSection>
        <CaseSection id="role-scope" title="Role & scope">
          {workCase.roleScope}
        </CaseSection>
        <CaseSection id="constraints" title="Constraints">
          {workCase.constraints}
        </CaseSection>
        <CaseSection id="insights" title="Insights">
          {workCase.insights}
        </CaseSection>
        <CaseSection id="options-rejected" title="Options rejected">
          {workCase.optionsRejected}
        </CaseSection>
        <CaseSection id="decisions" title="Decisions">
          {workCase.decisions}
        </CaseSection>
        <CaseSection id="what-shipped" title="What shipped">
          {workCase.whatShipped}
        </CaseSection>
        <CaseSection id="ai-honesty" title="AI tooling honesty">
          {workCase.aiHonesty}
        </CaseSection>

        <section id="results" className="scroll-mt-24">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-h2 text-text">Results</h2>
            <ResultBadge kind={workCase.results.kind} />
          </div>
          <p className="mt-4 text-body text-text-secondary">{workCase.results.summary}</p>
          {resultItems.length > 0 ? (
            <ul className="mt-6 space-y-2">
              {resultItems.map((item) => (
                <li key={item.label} className="flex justify-between gap-4 text-body">
                  <span className="text-text-muted">{item.label}</span>
                  <span className="tabular text-text">{item.value}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        <CaseSection id="learnings" title="Learnings">
          {workCase.learnings}
        </CaseSection>

        {artifacts.length > 0 ? (
          <section id="artifacts" className="scroll-mt-24">
            <h2 className="text-h2 text-text">Artifacts</h2>
            <ul className="mt-4 space-y-2">
              {artifacts.map((artifact) => (
                <li key={artifact.label}>
                  {artifact.href ? (
                    <a
                      href={artifact.href}
                      className="text-label text-accent hover:text-accent-hover"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {artifact.label}
                    </a>
                  ) : (
                    <span className="text-body text-text-secondary">{artifact.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
};
