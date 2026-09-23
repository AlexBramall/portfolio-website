import { Link } from 'react-router-dom';
import { EmployerEntry } from '../components/resume/EmployerEntry';
import { copy } from '../data/copy';

const metaLinkClassName =
  'text-accent underline-offset-2 hover:text-accent-hover hover:underline';

export const ResumePage = () => {
  const pdfUrl = copy.resume.pdfUrl;
  const { education, skills } = copy.resume;

  return (
    <div className="resume-canvas bg-bg px-3 py-8 sm:px-6 sm:py-10 md:py-12">
      <article
        id="resume"
        className="resume-sheet mx-auto w-full max-w-[720px] rounded-sm border border-border bg-surface px-6 py-8 text-text shadow-paper sm:px-10 sm:py-10"
      >
        <header>
          <h1 className="resume-name">{copy.resume.name}</h1>
          <p className="resume-role mt-1 text-text-secondary">{copy.hero.roleLine}</p>
          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-caption text-text-secondary">
            <span>{copy.resume.location}</span>
            <span aria-hidden="true" className="text-text-muted">
              ·
            </span>
            <Link to="/contact" className={metaLinkClassName}>
              Contact
            </Link>
            <span aria-hidden="true" className="text-text-muted">
              ·
            </span>
            <a
              href={copy.resume.linkedinHref}
              className={metaLinkClassName}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            {pdfUrl ? (
              <>
                <span aria-hidden="true" className="text-text-muted">
                  ·
                </span>
                <a
                  href={pdfUrl}
                  className={metaLinkClassName}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download PDF
                </a>
              </>
            ) : null}
          </p>
        </header>

        <section id="resume-experience" className="resume-block">
          <h2 className="resume-section-label">Experience</h2>
          <div className="mt-3 divide-y divide-border">
            {copy.resume.employers.map((employer) => (
              <EmployerEntry key={employer.id} employer={employer} />
            ))}
          </div>
        </section>

        <section id="resume-education" className="resume-block">
          <h2 className="resume-section-label">Education</h2>
          <p className="resume-quiet mt-2 text-text">
            <span className="font-semibold">{education.school}</span>
            <span className="text-text-muted"> · </span>
            <span className="text-text-secondary">{education.credential}</span>
          </p>
        </section>

        <section id="resume-skills" className="resume-block">
          <h2 className="resume-section-label">Skills</h2>
          <p className="resume-quiet mt-2 text-text-secondary">{skills.join(' · ')}</p>
        </section>

        <p id="resume-contact" className="resume-block text-caption text-text-secondary">
          <Link to="/contact" className={metaLinkClassName}>
            Contact
          </Link>
        </p>
      </article>
    </div>
  );
};
