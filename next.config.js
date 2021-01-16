module.exports = {
  webpack: (config, options) => {
    config.target = "electron-renderer";

    if (!options.isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }

    config.plugins.push(
      new options.webpack.DefinePlugin({
        "process.env.NEXT_IS_SERVER": JSON.stringify(options.isServer.toString()),
      })
    );

    return config;
  },
};
