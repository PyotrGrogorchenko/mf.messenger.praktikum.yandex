import path from 'path'
import webpack from 'webpack'
import { createFsFromVolume, Volume } from 'memfs'

export default (fixture: string, options = {}): Promise<webpack.Stats> => {
  const compiler = webpack({
    context: path.resolve(__dirname, './example'),
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.txt$/,
          use: {
            loader: path.resolve(__dirname, '../test/loader.ts'),
            options
          }
        }
      ]
    }
  })

  compiler.outputFileSystem = createFsFromVolume(new Volume())
  compiler.outputFileSystem.join = path.join.bind(path)

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || !stats) reject(err)
      if (stats && stats.hasErrors()) reject(stats.toJson().errors)

      resolve(stats)
    })
  })
}
