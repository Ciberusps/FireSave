module.exports = {
  webpack: (config, { isServer }) => {
    config.target = "electron-renderer";

    // override config here (e.g. `url-loader` you mentioned)

    if (isServer) {
      // if you need to handle NEXT.js' server webpack process, configure it here
    }

    return config;
  },
};
