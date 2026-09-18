import { ReactNode } from 'react';

type SectionTone = 'default' | 'muted' | 'hero';

interface SectionProps {
  id?: string;
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
  width?: 'content' | 'prose';
}

function toneClassName(tone: SectionTone): string {
  switch (tone) {
    case 'default':
      return 'bg-bg';
    case 'muted':
      return 'bg-surface-muted';
    case 'hero':
      return 'bg-hero-wash';
    default: {
      const exhaustive: never = tone;
      throw new Error(`Unhandled section tone: ${exhaustive}`);
    }
  }
}

export const Section = ({
  id,
  children,
  tone = 'default',
  className = '',
  width = 'content',
}: SectionProps) => {
  const maxWidth = width === 'prose' ? 'max-w-prose' : 'max-w-5xl';

  return (
    <section
      id={id}
      className={`${toneClassName(tone)} px-5 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24 ${className}`.trim()}
    >
      <div className={`mx-auto ${maxWidth}`}>{children}</div>
    </section>
  );
};
