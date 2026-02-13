import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { captureError, captureMessage } from '../sentry';
import { SectionId } from '../types';

export const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId: SectionId) => {
    try {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Track navigation events
        Sentry.addBreadcrumb({
          message: `Navigated to section: ${sectionId}`,
          category: 'navigation',
          level: 'info',
        });
      } else {
        captureMessage(`Section not found: ${sectionId}`, 'warning');
      }
    } catch (error) {
      captureError(error as Error, { context: 'scroll_to_section', sectionId });
    }
  }, []);

  return scrollToSection;
};
