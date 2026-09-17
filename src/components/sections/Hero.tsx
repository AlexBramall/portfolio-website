import { Link } from 'react-router-dom';
import { copy } from '../../data/copy';
import { buttonClassName } from '../../lib/buttonStyles';
import { Section } from '../layout/Section';

export const Hero = () => {
  return (
    <Section id="home" className="pt-20 md:pt-24">
      <p className="mb-4 text-caption uppercase tracking-wide text-text-muted">Alex Bramall</p>
      <h1 className="max-w-3xl text-display text-text">{copy.hero.roleLine}</h1>
      <p className="mt-6 max-w-2xl text-body text-text-secondary">{copy.hero.valueProp}</p>
      <p className="mt-6 inline-flex rounded-pill border border-border bg-accent-subtle px-3 py-1 text-caption text-accent-hover">
        {copy.hero.availability}
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link to="/contact" className={buttonClassName('primary')}>
          Contact
        </Link>
        <Link to="/work" className={buttonClassName('secondary')}>
          Work
        </Link>
      </div>
    </Section>
  );
};
