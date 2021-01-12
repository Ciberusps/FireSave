import ua from "universal-analytics";
import { machineIdSync } from "node-machine-id";

import { GA_TRACKING_ID } from "./config";

// TODO: types?
let visitor: any = null;

// TODO: move app to separate file and add "version" here
const init = () => {
  visitor = ua(GA_TRACKING_ID, { uid: machineIdSync() });
};

const pageView = (url: string) => {
  visitor.pageview(url, (err: any) => {
    if (!err) {
      console.log("Analytics | pageViewed", url);
    } else {
      // TODO: send to sentry
      console.log(err);
    }
  });
};

const Analytics = {
  init,
  pageView,
};

export default Analytics;
