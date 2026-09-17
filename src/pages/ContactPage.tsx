import { copy } from '../data/copy';
import { buttonClassName } from '../lib/buttonStyles';
import { Section } from '../components/layout/Section';

export const ContactPage = () => {
  return (
    <Section width="prose" id="contact">
      <h1 className="text-display text-text">Contact</h1>
      <p className="mt-6 text-body text-text-secondary">{copy.contact.intro}</p>
      <p className="mt-4 text-body text-text-muted">{copy.contact.channels}</p>
      <a href="mailto:alex.Bramall@email.com" className={`${buttonClassName('primary')} mt-8`}>
        Email
      </a>
    </Section>
  );
};
