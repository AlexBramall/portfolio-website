import { copy } from '../../data/copy';
import { Section } from '../layout/Section';

export const HowIWork = () => {
  return (
    <Section id="how-i-work">
      <h2 className="text-h2 text-text">How I work</h2>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {copy.process.bullets.map((bullet, index) => (
          <div
            key={bullet}
            className="rounded-card border border-border bg-surface p-6 shadow-card"
          >
            <p className="text-caption font-medium uppercase tracking-wide text-accent">
              {`0${index + 1}`}
            </p>
            <p className="mt-3 text-body text-text-secondary">{bullet}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-card bg-surface-muted p-6 md:p-8">
        <h3 className="text-h3 text-text">AI tooling honesty</h3>
        <p className="mt-3 text-body text-text-secondary">{copy.ai.honesty}</p>
      </div>
    </Section>
  );
};
