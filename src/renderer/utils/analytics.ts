const pageView = (url: string) => {
  window.electron.analyticsPageView(url);
};

const Analytics = { pageView };

export default Analytics;
