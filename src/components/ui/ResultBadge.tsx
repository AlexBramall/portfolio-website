import { ResultKind } from '../../types';

interface ResultBadgeProps {
  kind: ResultKind;
}

function badgeClassName(kind: ResultKind): string {
  const shared =
    'inline-flex items-center rounded-pill px-2.5 py-1 text-caption font-medium capitalize';

  switch (kind) {
    case 'measured':
      return `${shared} bg-accent-subtle text-accent-hover`;
    case 'proxy':
      return `${shared} bg-surface-muted text-text-secondary`;
    case 'projected':
      return `${shared} border border-border text-text-muted`;
    default: {
      const exhaustive: never = kind;
      throw new Error(`Unhandled result kind: ${exhaustive}`);
    }
  }
}

export const ResultBadge = ({ kind }: ResultBadgeProps) => {
  return <span className={badgeClassName(kind)}>{kind}</span>;
};
