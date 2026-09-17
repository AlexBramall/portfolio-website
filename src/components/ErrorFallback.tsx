import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import * as Sentry from '@sentry/react';
import { Button } from './ui/Button';

interface ErrorFallbackProps {
  error: unknown;
  resetError: () => void;
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

const ErrorFallback = ({ error, resetError }: ErrorFallbackProps) => {
  const handleReportError = () => {
    Sentry.showReportDialog();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md rounded-card border border-border bg-surface p-8 text-center shadow-card">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-pill bg-accent-subtle">
          <AlertTriangle className="h-8 w-8 text-accent-hover" />
        </div>

        <h1 className="mb-4 text-h2 text-text">Something went wrong</h1>

        <p className="mb-6 text-body text-text-secondary">
          An unexpected error was reported. You can retry or return home.
        </p>

        <div className="mb-6 rounded-control bg-surface-muted p-4 text-left">
          <p className="mb-2 text-caption text-text-muted">Error details:</p>
          <code className="break-all text-caption text-danger">{errorMessage(error)}</code>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" variant="primary" className="flex-1" onClick={resetError}>
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={() => {
              window.location.href = import.meta.env.BASE_URL;
            }}
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
        </div>

        <button
          type="button"
          onClick={handleReportError}
          className="mt-4 text-caption text-text-muted hover:text-text"
        >
          Report this issue
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
