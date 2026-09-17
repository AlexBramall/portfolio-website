import { copy } from '../../data/copy';
import { Section } from '../layout/Section';

export const HowIWork = () => {
  return (
    <Section id="how-i-work" muted>
      <h2 className="text-h2 text-text">How I work</h2>
      <ul className="mt-8 space-y-3">
        {copy.process.bullets.map((bullet) => (
          <li key={bullet} className="text-body text-text-secondary">
            {bullet}
          </li>
        ))}
      </ul>
      <div className="mt-8 rounded-card border border-border bg-surface p-5">
        <h3 className="text-h3 text-text">AI tooling honesty</h3>
        <p className="mt-3 text-body text-text-secondary">{copy.ai.honesty}</p>
      </div>
    </Section>
  );
};
