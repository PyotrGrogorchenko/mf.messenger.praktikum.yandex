const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './static/js/index.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {

    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.ts$/,
        use: {}

      }
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({filename: 'bundle.css'}),
    // Не получилось с ts??? С js ok
    new ESLintPlugin({extensions: ['js'], files: 'static/js/index.js'}),
    //new ESLintPlugin({extensions: ['ts'], files: 'ts/index.ts'}), // 
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      filename: 'index.html',
    }),
  ],

}
