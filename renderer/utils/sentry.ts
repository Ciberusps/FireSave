import * as SentryInstance from "@sentry/node";

import { getVal, SENTRY_DSN } from "./config";

const init = async () => {
  const isDev = Boolean(await getVal("IS_DEV")) || false;
  SentryInstance.init({
    dsn: SENTRY_DSN,
    enabled: !isDev,
  });
};

const Sentry = {
  init,
};

export default Sentry;
