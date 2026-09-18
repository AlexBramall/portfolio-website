import { Link } from 'react-router-dom';
import { WorkCase } from '../../types';
import { isFilled } from '../../lib/placeholder';
import { tagChipClassName } from '../../lib/chipStyles';

interface WorkCardProps {
  workCase: WorkCase;
}

export const WorkCard = ({ workCase }: WorkCardProps) => {
  return (
    <Link
      to={`/work/${workCase.slug}`}
      className="group flex h-full flex-col rounded-card border border-border bg-surface p-6 shadow-card transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-border-strong hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transform-none md:p-8"
    >
      <p className="text-caption tracking-wide text-accent-2">{workCase.eyebrow}</p>
      <h3 className="mt-3 text-h3 text-text">{workCase.title}</h3>
      <p className="mt-2 flex-1 text-body text-text-secondary">{workCase.outcome}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {workCase.tags.slice(0, 4).map((tag, index) => (
          <span key={tag} className={tagChipClassName(index)}>
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
