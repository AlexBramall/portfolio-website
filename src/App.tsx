import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { useEffect } from 'react';
import { captureMessage, setCustomTags } from './sentry';
import ErrorFallback from './components/ErrorFallback';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { CasePage } from './pages/CasePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent = Sentry.withProfiler(() => {
  useEffect(() => {
    setCustomTags({
      page: 'portfolio',
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
    });
    captureMessage('Portfolio page loaded', 'info');
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<CasePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/hire" element={<Navigate to="/contact" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});

const App = () => {
  return (
    <Sentry.ErrorBoundary fallback={ErrorFallback} showDialog>
      <AppContent />
    </Sentry.ErrorBoundary>
  );
};

export default App;
