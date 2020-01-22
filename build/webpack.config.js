const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const HappyPack = require('happypack');
const os = require('os');
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
function resolve(p){
  return path.join(__dirname, p);
}

module.exports = {
  entry: {
    app: resolve(__dirname, '../src/main.ts')
  },
  output: {
    filename: 'script/[name].[hash:8].js', // 打包后的文件名称
    path: resolve(__dirname, '../dist') // 打包后的目录
  },
  performance: {
    hints: false, // 枚举
    maxAssetSize: 300000, // 整数类型（以字节为单位）
    maxEntrypointSize: 500000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // 从右向左解析原则
      },
      {
        test: /\.tsx?$/,
        loader: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: ['happypack/loader?id=happyBabel'], // 'eslint-loader'
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i, //图片文件
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 10000,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      '@': resolve('../src'),
      '@assets': resolve('../src/assets'),
      '@components': resolve('../src/components'),
      '@api': resolve('../src/api'),
      '@i18n': resolve('../src/i18n')
    },
    extensions: ['*', '.ts', '.js', '.json', '.vue']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
      filename: 'index.html',
      inject: true,
      title: 'yht1',
      favicon: resolve('../public/favicon.ico'),
      minify: {
        collapseWhitespace: true //删除空格、换行
      }
    }),
    require('autoprefixer'),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].css'
    }),
    new HappyPack({
      id: 'happyBabel',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        // 'eslint-loader'
      ],
      threadPool: HappyThreadPool
    }),
    new vueLoaderPlugin(),
    new Webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(resolve('../dll/app-manifest.json'))
    }),
    new CopyWebpackPlugin([
      // 拷贝生成的文件到dist目录 这样每次不必手动去cv
      { from: resolve('../dll'), to: 'dll', ignore: ['*.json'] }
    ])
  ]
};
