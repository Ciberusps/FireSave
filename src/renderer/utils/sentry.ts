import * as SentryInstance from "@sentry/node";

import { IS_DEV, SENTRY_DSN } from "./config";

const init = async () => {
  const isDev = IS_DEV || false;
  SentryInstance.init({
    dsn: SENTRY_DSN,
    enabled: !isDev,
  });
};

const send = (
  error: any,
  tags?: Record<string, any>,
  extras?: Record<string, any>
) => {
  SentryInstance.withScope((scope) => {
    if (tags) scope.setTags(tags);
    if (extras) scope.setExtras(extras);
    SentryInstance.captureException(error);
    console.error(error);
  });
};

const ErrorReporter = {
  init,
  send,
};

export default ErrorReporter;
