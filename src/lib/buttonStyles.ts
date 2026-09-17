import { ButtonVariant } from '../types';

const shared =
  'inline-flex h-11 items-center justify-center gap-2 rounded-control px-6 text-label font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50';

export function buttonClassName(variant: ButtonVariant): string {
  switch (variant) {
    case 'primary':
      return `${shared} bg-accent text-white hover:bg-accent-hover`;
    case 'secondary':
      return `${shared} border border-border bg-surface text-text hover:bg-surface-muted`;
    case 'ghost':
      return `${shared} bg-transparent text-text-secondary hover:bg-surface-muted hover:text-text`;
    default: {
      const exhaustive: never = variant;
      throw new Error(`Unhandled button variant: ${exhaustive}`);
    }
  }
}
