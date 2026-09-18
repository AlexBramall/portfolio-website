import { Link } from 'react-router-dom';
import { copy } from '../../data/copy';
import { buttonClassName } from '../../lib/buttonStyles';
import { Section } from '../layout/Section';

export const ContactStrip = () => {
  return (
    <Section id="contact-strip" tone="muted">
      <div className="rounded-card border border-border bg-surface p-6 shadow-card md:p-8">
        <h2 className="text-h2 text-text">Contact</h2>
        <p className="mt-4 max-w-2xl text-body text-text-secondary">{copy.contact.intro}</p>
        <p className="mt-3 text-body text-text-muted">{copy.contact.channels}</p>
        <div className="mt-8">
          <Link to="/contact" className={buttonClassName('primary')}>
            Contact
          </Link>
        </div>
      </div>
    </Section>
  );
};
