
// webpack.base.conf.js 文件

const path = require('path');
const webpack = require('webpack');

// 引入HappyPack插件 
const HappyPack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const smp = new SpeedMeasurePlugin();

const obj = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        // use: "babel-loader",
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            // 一个loader对应一个id
            loader: "happypack/loader?id=jsBabel"
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            limit: 8192,
          }
        }
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'font/'
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@store': path.resolve(__dirname, '../src/store'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@routes': path.resolve(__dirname, '../src/routes'),
      '@server': path.resolve(__dirname, '../src/server'),
    },
    extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx']
  },
  plugins: [
    // 设置环境变量信息
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HappyPack({
      // 用唯一的标识符id，来代表当前的HappyPack是用来处理一类特定的文件
      id:'jsBabel',
      // 如何处理.js文件，用法和Loader配置中一样
      loaders:['babel-loader'],
    }),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),
  ]
};
module.exports = obj;