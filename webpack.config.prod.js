const { merge } = require('webpack-merge')
const common = require('./webpack.config.js')

const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer:
    [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]},
  plugins: [
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
  ]
})