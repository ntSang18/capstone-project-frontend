const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
module.exports = {
  lintOnSave: false,
  outputDir: '../dist',
  assetsDir: './static',
  productionSourceMap: false,
  pages: {
    index: {
      entry: './src/pages/client/main.js',
      template: 'public/index.html',
      title: 'Index',
    },
    admin: {
      entry: './src/pages/admin/main.js',
      template: 'public/index.html',
      title: 'Admin',
    },
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // mutate config for production...
    } else {
      // mutate for development...
      config.devtool = 'source-map';
    }
    config.plugins = [
      ...config.plugins, // this is important !
      new NodePolyfillPlugin(), // new plugins...
    ];
  },
};
