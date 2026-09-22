import { Link } from 'react-router-dom';
import { copy } from '../data/copy';
import { buttonClassName } from '../lib/buttonStyles';
import { stackChipClassName } from '../lib/chipStyles';
import { EmployerTile } from '../components/resume/EmployerTile';
import { PageCtaStrip } from '../components/sections/PageCtaStrip';
import { Section } from '../components/layout/Section';

export const ResumePage = () => {
  const pdfUrl = copy.resume.pdfUrl;

  return (
    <>
      <Section id="resume" tone="hero" className="pt-20 md:pt-24">
        <h1 className="text-display text-text">Resume</h1>
        <p className="mt-6 max-w-2xl text-body text-text-secondary">{copy.hero.roleLine}</p>
        <p className="mt-3 text-caption text-text-muted">{copy.resume.location}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link to="/contact" className={buttonClassName('primary')}>
            Contact
          </Link>
          {pdfUrl ? (
            <a
              href={pdfUrl}
              className={buttonClassName('secondary')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download PDF
            </a>
          ) : null}
        </div>
      </Section>

      <Section id="resume-experience">
        <h2 className="text-h2 text-text">Experience</h2>
        <div className="mt-8 flex flex-col gap-6">
          {copy.resume.employers.map((employer) => (
            <EmployerTile key={employer.id} employer={employer} />
          ))}
        </div>
      </Section>

      <Section id="resume-education">
        <h2 className="text-h2 text-text">Education</h2>
        <article className="mt-8 rounded-card bg-surface-muted p-6 md:p-8">
          <h3 className="text-h3 text-text">{copy.resume.education.school}</h3>
          <p className="mt-2 text-body text-text-secondary">{copy.resume.education.credential}</p>
        </article>
      </Section>

      <Section id="resume-skills">
        <h2 className="text-h2 text-text">Skills</h2>
        <div className="mt-8 flex flex-wrap gap-2">
          {copy.resume.skills.map((skill, index) => (
            <span key={skill} className={stackChipClassName(index)}>
              {skill}
            </span>
          ))}
        </div>
      </Section>

      <PageCtaStrip id="resume-cta" showResume={false} />
    </>
  );
};
