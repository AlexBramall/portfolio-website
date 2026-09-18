import { ButtonVariant } from '../types';

const shared =
  'inline-flex h-12 items-center justify-center gap-2 rounded-pill px-6 text-label font-medium transition-[color,background-color,box-shadow,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 motion-reduce:transform-none';

export function buttonClassName(variant: ButtonVariant): string {
  switch (variant) {
    case 'primary':
      return `${shared} bg-accent text-white hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-card`;
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
