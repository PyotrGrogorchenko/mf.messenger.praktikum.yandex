import { Configuration } from 'webpack'
import path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { DIST_DIR, SRC_DIR } from './env'

export const config: Configuration = {
  mode: 'development',
  context: path.resolve(SRC_DIR),
  entry: [
    path.join(SRC_DIR)
  ],
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts'],
    plugins: [
      new TsconfigPathsPlugin(
        {
          configFile: 'tsconfig.json'
        }
      )]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.css$/i,
        use: [
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
