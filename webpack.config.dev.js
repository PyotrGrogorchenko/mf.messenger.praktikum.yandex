const { merge } = require('webpack-merge')
const common = require('./webpack.config.js')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: 'dist',
    compress: true,
    port: 4000,
    hot: true
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      filename: 'index.html',
    })
  ]

})
