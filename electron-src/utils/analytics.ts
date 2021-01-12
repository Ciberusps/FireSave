import ua from "universal-analytics";
import { machineIdSync } from "node-machine-id";

import { GA_TRACKING_ID } from "./config";

// TODO: types?
let visitor: ua.Visitor | null = null;

// TODO: move app to separate file and add "version" here
const init = () => {
  visitor = ua(GA_TRACKING_ID, { uid: machineIdSync() });
};

const pageView = (url: string) => {
  try {
    visitor?.pageview(url, (err: any) => {
      if (!err) {
        console.log("Analytics | pageViewed", url);
      } else {
        // TODO: send to sentry
        console.log(err);
      }
    });
  } catch (err) {
    // TODO: send to sentry
    console.log(err);
  }
};

type TEvent = {
  category: string;
  action: string;
  labels?: string[];
  value?: number;
};

const sendEvent = (event: TEvent) => {
  const labels = !!event.labels?.length ? event.labels.join(",") : undefined;
  try {
    visitor
      ?.event({
        ec: event.category,
        ea: event.action,
        el: labels,
        ev: event.value,
      })
      .send();
    console.log("Analytics | event sended", JSON.stringify(event));
  } catch (err) {
    // TODO: send to sentry
    console.log(err);
  }
};

const Analytics = {
  init,
  pageView,
  sendEvent,
};

export default Analytics;
