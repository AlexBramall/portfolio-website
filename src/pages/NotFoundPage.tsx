import { Link } from 'react-router-dom';
import { buttonClassName } from '../lib/buttonStyles';

export const NotFoundPage = () => {
  return (
    <div className="mx-auto max-w-prose px-6 py-24 md:px-10 lg:px-20">
      <h1 className="text-display text-text">Page not found</h1>
      <p className="mt-4 text-body text-text-secondary">
        That route is not part of this site.
      </p>
      <Link to="/" className={`${buttonClassName('primary')} mt-8`}>
        Home
      </Link>
    </div>
  );
};
