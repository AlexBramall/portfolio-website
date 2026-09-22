import { ResumeEmployer } from '../../types';

interface EmployerEntryProps {
  employer: ResumeEmployer;
}

export const EmployerEntry = ({ employer }: EmployerEntryProps) => {
  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <h3 className="resume-employer">{employer.name}</h3>
      <ul className="mt-1.5 space-y-1">
        {employer.roles.map((role) => (
          <li
            key={role.title}
            className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <p className="resume-job min-w-0">{role.title}</p>
            <p className="shrink-0 text-caption tabular text-text-muted">{role.dates}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
