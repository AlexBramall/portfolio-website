import { proofChips } from '../../data/proof';
import { Section } from '../layout/Section';

const visibleChips = proofChips.filter((chip) => {
  const value = chip.value?.trim();
  return Boolean(value);
});

export const ProofBar = () => {
  if (visibleChips.length === 0) {
    return null;
  }

  return (
    <Section id="proof" className="py-10 md:py-12 lg:py-14">
      <ul className="flex flex-wrap gap-3">
        {visibleChips.map((chip) => (
          <li
            key={chip.id}
            className="flex items-baseline gap-2 rounded-pill border border-border bg-accent-subtle px-4 py-2"
          >
            <span className="tabular text-h3 text-text">{chip.value}</span>
            <span className="text-caption text-text-muted">{chip.label}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
};
