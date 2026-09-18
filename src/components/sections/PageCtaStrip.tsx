import { Link } from 'react-router-dom';
import { buttonClassName } from '../../lib/buttonStyles';
import { ResumeLink } from '../ui/ResumeLink';
import { Section } from '../layout/Section';

interface PageCtaStripProps {
  id: string;
}

export const PageCtaStrip = ({ id }: PageCtaStripProps) => {
  return (
    <Section id={id} tone="muted">
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
  );
};
