module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/global.scss";`,
      },
    },
    extract: {
      ignoreOrder: true
    },
  },
  configureWebpack: {
    performance: {
      maxEntrypointSize: 600000,
      maxAssetSize: 600000,
    },
  },
};
