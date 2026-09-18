import { Link } from 'react-router-dom';
import { featuredCases } from '../../data/cases';
import { Section } from '../layout/Section';
import { WorkCard } from '../work/WorkCard';

export const SelectedWork = () => {
  return (
    <Section id="selected-work">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-h2 text-text">Selected work</h2>
        </div>
        <Link
          to="/work"
          className="text-label text-accent transition-colors duration-200 hover:text-accent-hover"
        >
          All work
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredCases.map((workCase) => (
          <WorkCard key={workCase.slug} workCase={workCase} />
        ))}
      </div>
    </Section>
  );
};
