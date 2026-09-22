import { ResumeEmployer } from '../../types';
import { employerKindClassName } from '../../lib/chipStyles';

interface EmployerTileProps {
  employer: ResumeEmployer;
}

function employerTone(weight: ResumeEmployer['weight']): {
  tile: string;
  name: string;
  role: string;
} {
  switch (weight) {
    case 'featured':
      return {
        tile: 'rounded-card border border-border bg-surface p-6 shadow-card md:p-8',
        name: 'text-h3 text-text',
        role: 'text-body text-text',
      };
    case 'quiet':
      return {
        tile: 'rounded-card border border-border bg-surface p-5 md:p-6',
        name: 'text-h3 text-text-secondary',
        role: 'text-body text-text-secondary',
      };
    default: {
      const exhaustive: never = weight;
      throw new Error(`Unhandled employer weight: ${exhaustive}`);
    }
  }
}

export const EmployerTile = ({ employer }: EmployerTileProps) => {
  const tone = employerTone(employer.weight);

  return (
    <article className={tone.tile}>
      {employer.kind ? <p className={employerKindClassName(employer.kind)}>{employer.kind}</p> : null}
      <h3 className={`${tone.name} ${employer.kind ? 'mt-4' : ''}`.trim()}>{employer.name}</h3>
      <div className="mt-4 flex flex-col gap-4">
        {employer.roles.map((role) => (
          <div key={role.title}>
            <p className={tone.role}>{role.title}</p>
            <p className="mt-1 text-caption text-text-muted tabular">{role.dates}</p>
          </div>
        ))}
      </div>
    </article>
  );
};
