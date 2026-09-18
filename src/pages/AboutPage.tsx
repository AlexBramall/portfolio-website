import { Link } from 'react-router-dom';
import { copy } from '../data/copy';
import { buttonClassName } from '../lib/buttonStyles';
import { stackChipClassName } from '../lib/chipStyles';
import { ChapterTile } from '../components/about/ChapterTile';
import { ResumeLink } from '../components/ui/ResumeLink';
import { Section } from '../components/layout/Section';

export const AboutPage = () => {
  return (
    <>
      <Section id="about" tone="hero" className="pt-20 md:pt-24">
        <h1 className="text-display text-text">About</h1>
        <p className="mt-6 max-w-2xl text-body text-text-secondary">{copy.about.arc}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link to="/contact" className={buttonClassName('primary')}>
            Contact
          </Link>
          <ResumeLink className={buttonClassName('secondary')} />
        </div>
      </Section>

      <Section id="about-chapters">
        <h2 className="text-h2 text-text">Experience</h2>
        <div className="mt-8 flex flex-col gap-6">
          {copy.about.chapters.map((chapter, index) => (
            <ChapterTile key={chapter.id} chapter={chapter} index={index} />
          ))}
        </div>
      </Section>

      <Section id="about-credentials">
        <h2 className="text-h2 text-text">Credentials</h2>
        <div className="mt-8 rounded-card bg-surface-muted p-6 md:p-8">
          <div className="flex flex-wrap gap-2">
            {copy.about.credentials.map((item, index) => (
              <span key={item} className={stackChipClassName(index)}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section id="about-cta" tone="muted">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-h3 text-text">Get in touch</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className={buttonClassName('primary')}>
              Contact
            </Link>
            <ResumeLink className={buttonClassName('secondary')} />
          </div>
        </div>
      </Section>
    </>
  );
};
