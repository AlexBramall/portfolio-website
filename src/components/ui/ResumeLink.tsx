import { MouseEventHandler } from 'react';
import { copy } from '../../data/copy';

interface ResumeLinkProps {
  className: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export const ResumeLink = ({ className, onClick }: ResumeLinkProps) => {
  return (
    <a
      href={copy.resume.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      Resume
    </a>
  );
};
