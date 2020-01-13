const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const BundleAnalyzerPlugin = WebpackBundleAnalyzer.BundleAnalyzerPlugin;
const WebpackMerge = require('webpack-merge');
const webpackConfig = require('./webpack.prod.js');

module.exports = WebpackMerge(webpackConfig, {
  plugins: [new BundleAnalyzerPlugin()]
});
