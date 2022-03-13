
// webpack.prod.conf.js 文件

const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

// 引入 html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  // 添加代码
  output: {
    filename: "js/[name].[contenthash:8].js",
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          //'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',  // 打包之后的html文件名字
      template: 'public/index.html', // html模版文件
      inject: 'body', // 在body最底部引入js文件，如果是head，就是在head中引入js
      // 压缩html文件 详情看：https://github.com/jantimon/html-webpack-plugin#minification
      minify: {   
        removeComments: true,  // 删除注释
        collapseWhitespace: true, // 去除空格
      }
    }),
    new CleanWebpackPlugin(),

    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '..', 'dll/vendor.dll.js') // 对应的 dll 文件路径
    }),
    // 告诉webpack使用了哪些第三方库代码
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '..', 'dll/vendor.manifest.json')
    }),
    
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[id].[contenthash:8].css',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minChunks: 1,
      minSize: 0,
      /*
      cacheGroups: {
        framework: {
          test: "framework",
          name: "framework",
          enforce: true
        }
      }
      */
    },
    // 压缩css代码
    minimizer: [
      new OptimizeCssAssetsPlugin({
        assetNameRegExp:/\.css$/g,
        cssProcessor:require("cssnano"),
        cssProcessorPluginOptions:{
          preset:['default', { discardComments: { removeAll:true } }]
        },
        canPrint:true
      })
    ],
  }
});