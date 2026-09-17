import { workCases } from '../data/cases';
import { Section } from '../components/layout/Section';
import { WorkCard } from '../components/work/WorkCard';

export const WorkPage = () => {
  return (
    <Section id="work">
      <h1 className="text-display text-text">Work</h1>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workCases.map((workCase) => (
          <WorkCard key={workCase.slug} workCase={workCase} />
        ))}
      </div>
    </Section>
  );
};
