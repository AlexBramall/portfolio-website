import { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { captureError } from '../sentry';

export const useActiveSection = (sections: SectionId[]) => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  useEffect(() => {
    const handleScroll = () => {
      try {
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      } catch (error) {
        captureError(error as Error, { context: 'scroll_handler' });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return activeSection;
};
