import { Link } from 'react-router-dom';
import { copy } from '../data/copy';
import { workCases } from '../data/cases';
import { PageCtaStrip } from '../components/sections/PageCtaStrip';
import { Section } from '../components/layout/Section';
import { WorkCard } from '../components/work/WorkCard';

export const WorkPage = () => {
  return (
    <>
      <Section id="work" tone="hero" className="pt-20 md:pt-24">
        <h1 className="text-display text-text">Work</h1>
        <p className="mt-6 max-w-2xl text-body text-text-secondary">{copy.work.indexIntro}</p>
        <div className="mt-8">
          <Link
            to="/contact"
            className="text-label text-accent transition-colors duration-200 hover:text-accent-hover"
          >
            Contact
          </Link>
        </div>
      </Section>

      <Section id="work-grid">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {workCases.map((workCase) => (
            <WorkCard key={workCase.slug} workCase={workCase} />
          ))}
        </div>
      </Section>

      <PageCtaStrip id="work-cta" />
    </>
  );
};
