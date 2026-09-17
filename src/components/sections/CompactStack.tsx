import { copy } from '../../data/copy';
import { Section } from '../layout/Section';

export const CompactStack = () => {
  return (
    <Section id="stack">
      <h2 className="text-h2 text-text">Stack</h2>
      <div className="mt-8 flex flex-wrap gap-2">
        {copy.stack.items.map((item) => (
          <span
            key={item}
            className="rounded-pill border border-border bg-surface px-3 py-1.5 text-caption text-text-secondary"
          >
            {item}
          </span>
        ))}
      </div>
    </Section>
  );
};
