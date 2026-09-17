import { copy } from '../data/copy';
import { Section } from '../components/layout/Section';

export const AboutPage = () => {
  return (
    <Section width="prose" id="about">
      <h1 className="text-display text-text">About</h1>
      <p className="mt-6 text-body text-text-secondary">{copy.about.arc}</p>
    </Section>
  );
};
