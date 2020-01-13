var path = require('path');

module.exports = {
  build: {
    env: {
      NODE_ENV: 'production'
    },
    index: path.resolve(__dirname, '../elm/index.html'),
    assetsRoot: path.resolve(__dirname, '../elm'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/elm/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: {
      NODE_ENV: 'development'
    },
    port: 8000,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    context: [
      //代理路径
      '/shopping',
      '/ugc',
      '/v1',
      '/v2',
      '/v3',
      '/v4',
      '/bos',
      '/member',
      '/promotion',
      '/eus',
      '/payapi',
      '/img'
    ],
    proxypath: 'http://cangdu.org:8001',
    cssSourceMap: false
  }
};
