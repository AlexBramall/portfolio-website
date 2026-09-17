import * as Sentry from "@sentry/react";

export const initSentry = () => {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN || "", // You'll need to add this to your .env file
    integrations: [Sentry.browserTracingIntegration()],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    tracePropagationTargets: ["localhost", /^https:\/\/yourapp\.io\/api/],
    // Environment
    environment: import.meta.env.MODE,
    // Additional options
    beforeSend(event) {
      // Filter out development errors if needed
      if (import.meta.env.DEV) {
        console.log('Sentry Event:', event);
      }
      return event;
    },
  });
};

// Custom error boundary component
export const SentryErrorBoundary = Sentry.withErrorBoundary;

// Manual error reporting functions
export const captureError = (error: Error, context?: Record<string, string>) => {
  Sentry.withScope((scope) => {
    if (context) {
      Object.keys(context).forEach(key => {
        scope.setTag(key, context[key]);
      });
    }
    Sentry.captureException(error);
  });
};

export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info') => {
  Sentry.captureMessage(message, level);
};

// User context
export const setUserContext = (user: { id?: string; email?: string; username?: string }) => {
  Sentry.setUser(user);
};

// Custom tags for better error categorization
export const setCustomTags = (tags: Record<string, string>) => {
  Sentry.withScope((scope) => {
    Object.keys(tags).forEach(key => {
      scope.setTag(key, tags[key]);
    });
  });
};
