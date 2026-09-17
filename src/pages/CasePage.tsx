import { Link, useParams } from 'react-router-dom';
import { getCaseBySlug } from '../data/cases';
import { CaseLayout } from '../components/work/CaseLayout';
import { buttonClassName } from '../lib/buttonStyles';

export const CasePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const workCase = slug ? getCaseBySlug(slug) : undefined;

  if (!workCase) {
    return (
      <div className="mx-auto max-w-prose px-6 py-24 md:px-10 lg:px-20">
        <h1 className="text-display text-text">Case not found</h1>
        <p className="mt-4 text-body text-text-secondary">
          That work slug is not in this build.
        </p>
        <Link to="/work" className={`${buttonClassName('secondary')} mt-8`}>
          Back to work
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <Link to="/work" className="text-label text-accent hover:text-accent-hover">
          ← Work
        </Link>
        <div className="mt-8">
          <CaseLayout workCase={workCase} />
        </div>
      </div>
    </div>
  );
};
