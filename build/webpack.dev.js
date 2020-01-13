const Webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const WebpackMerge = require('webpack-merge');

module.exports = WebpackMerge(webpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    proxy: {
      context: ['/*', '/*/*'],
      target: 'http://localhost:3000'
    },
    contentBase: '../dist'
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()]
});
