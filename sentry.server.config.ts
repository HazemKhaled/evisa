import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,

  // Debug logs (disable in production)
  debug: false,

  // Performance monitoring
  tracesSampleRate: 1.0,

  // Enable all features except logs as per PRD
  beforeSend(event) {
    // Filter out log-type events
    if (event.level === "log" || event.level === "debug" || event.level === "info") {
      return null;
    }
    return event;
  },
});
