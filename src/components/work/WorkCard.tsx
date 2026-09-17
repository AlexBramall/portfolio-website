import { Link } from 'react-router-dom';
import { WorkCase } from '../../types';
import { isFilled } from '../../lib/placeholder';

interface WorkCardProps {
  workCase: WorkCase;
}

export const WorkCard = ({ workCase }: WorkCardProps) => {
  return (
    <Link
      to={`/work/${workCase.slug}`}
      className="group flex h-full flex-col rounded-card border border-border bg-surface p-5 transition duration-150 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-card motion-reduce:transform-none"
    >
      <h3 className="text-h3 text-text">{workCase.title}</h3>
      <p className="mt-2 flex-1 text-body text-text-secondary">{workCase.outcome}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {workCase.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-pill bg-surface-muted px-2.5 py-1 text-caption text-text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
      {isFilled(workCase.metric) ? (
        <p className="mt-4 tabular text-label text-text">{workCase.metric}</p>
      ) : null}
      <p className="mt-5 text-label text-accent group-hover:text-accent-hover">View case →</p>
    </Link>
  );
};
