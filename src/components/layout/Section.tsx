import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  muted?: boolean;
  className?: string;
  width?: 'content' | 'prose';
}

export const Section = ({
  id,
  children,
  muted = false,
  className = '',
  width = 'content',
}: SectionProps) => {
  const maxWidth = width === 'prose' ? 'max-w-prose' : 'max-w-5xl';

  return (
    <section
      id={id}
      className={`${muted ? 'bg-surface-muted' : 'bg-bg'} px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-24 ${className}`.trim()}
    >
      <div className={`mx-auto ${maxWidth}`}>{children}</div>
    </section>
  );
};
