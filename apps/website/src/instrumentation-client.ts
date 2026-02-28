// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  const isProduction = process.env.NODE_ENV === "production";
  const replayEnabled =
    process.env.NEXT_PUBLIC_SENTRY_REPLAY_ENABLED === "true";
  const consoleLogsEnabled =
    process.env.NEXT_PUBLIC_SENTRY_CONSOLE_LOGS === "true";

  const integrations = [Sentry.browserTracingIntegration()];

  if (replayEnabled) {
    integrations.push(
      Sentry.replayIntegration({
        maskAllText: false,
      })
    );
  }

  if (consoleLogsEnabled || !isProduction) {
    integrations.push(
      Sentry.consoleLoggingIntegration({ levels: ["warn", "error"] })
    );
  }

  Sentry.init({
    dsn,
    integrations,
    tracesSampleRate: isProduction ? 0.05 : 1,
    enableLogs: !isProduction,
    replaysSessionSampleRate: replayEnabled ? 0.05 : 0,
    replaysOnErrorSampleRate: replayEnabled ? 1 : 0,
    debug: false,
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
