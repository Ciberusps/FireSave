const pageView = (url: string) => {
  window.api.analyticsPageView(url);
};

const Analytics = { pageView };

export default Analytics;
