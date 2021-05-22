import { Configuration } from 'webpack'
import path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { DIST_DIR, SRC_DIR } from './env'

export const config: Configuration = {
  mode: 'development',
  context: path.resolve(SRC_DIR),
  entry: {
    main: path.join(SRC_DIR, 'index.ts')
  },
  output: {
    path: DIST_DIR,
    filename: '[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.ts', '.wasm', '.tsx', '.mjs', '.cjs', '.js', '.json'],
    plugins: [
      new TsconfigPathsPlugin(
        {
          configFile: 'tsconfig.json'
        }
      )]
  },
  devServer: {
    contentBase: 'dist',
    compress: true,
    port: 4000,
    hot: true
  },
  devtool: 'source-map',
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'loaders')]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [
          /node_modules/
        ],
        use: [
          'babel-loader',
          'gpp-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.html'
    }),
    new CleanWebpackPlugin()
  ]
}
