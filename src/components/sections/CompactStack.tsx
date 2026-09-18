import { copy } from '../../data/copy';
import { stackChipClassName } from '../../lib/chipStyles';
import { Section } from '../layout/Section';

export const CompactStack = () => {
  return (
    <Section id="stack">
      <h2 className="text-h2 text-text">Stack</h2>
      <div className="mt-8 flex flex-wrap gap-2">
        {copy.stack.items.map((item, index) => (
          <span key={item} className={stackChipClassName(index)}>
            {item}
          </span>
        ))}
      </div>
    </Section>
  );
};
