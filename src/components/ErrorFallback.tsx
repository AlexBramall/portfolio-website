import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import * as Sentry from "@sentry/react";
import type { FallbackRender } from "@sentry/react";

const errorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

const ErrorFallback: FallbackRender = ({ error, resetError }) => {
  const handleReportError = () => {
    Sentry.showReportDialog();
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center">
        <div className="bg-nav-pill rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-dark-gray" />
        </div>

        <h1 className="text-heading-lg font-bold text-black mb-4">
          Oops! Something went wrong
        </h1>

        <p className="text-muted-text mb-6">
          We've encountered an unexpected error. Don't worry, our team has been notified and we're working on a fix.
        </p>

        <div className="bg-surface rounded-2xl p-4 mb-6 text-left">
          <p className="text-caption text-light-muted mb-2">Error details:</p>
          <code className="text-xs text-dark-gray break-all">
            {errorMessage(error)}
          </code>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={resetError}
            className="flex-1 bg-black text-white px-8 py-3.5 rounded-full text-label font-medium hover:bg-dark-gray transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>

          <button
            onClick={() => window.location.href = '/'}
            className="flex-1 border border-button-border text-dark-gray px-8 py-3.5 rounded-full text-label font-medium hover:border-muted-text hover:text-black transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
        </div>

        <button
          onClick={handleReportError}
          className="mt-4 text-caption text-light-muted hover:text-black transition-colors"
        >
          Report this issue
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
