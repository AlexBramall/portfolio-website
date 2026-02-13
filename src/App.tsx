import { useEffect } from 'react';
import * as Sentry from "@sentry/react";
import { captureMessage, setCustomTags } from './sentry';
import ErrorFallback from './components/ErrorFallback';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { useActiveSection } from './hooks/useActiveSection';
import { useScrollToSection } from './hooks/useScrollToSection';
import { SectionId } from './types';

const sections: SectionId[] = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

const AppContent = Sentry.withProfiler(() => {
  const activeSection = useActiveSection(sections);
  const scrollToSection = useScrollToSection();

  useEffect(() => {
    // Set custom tags for better error tracking
    setCustomTags({
      page: 'portfolio',
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`
    });

    // Log page load
    captureMessage('Portfolio page loaded', 'info');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header activeSection={activeSection} onNavigate={scrollToSection} />
      <Hero onNavigate={scrollToSection} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
});

// Wrap the entire app with Sentry's error boundary
const App = () => {
  return (
    <Sentry.ErrorBoundary fallback={ErrorFallback} showDialog>
      <AppContent />
    </Sentry.ErrorBoundary>
  );
};

export default App;
