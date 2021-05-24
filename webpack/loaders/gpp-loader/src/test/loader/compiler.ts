import path from 'path'
import webpack from 'webpack'
import { createFsFromVolume, Volume } from 'memfs'

export default (fixture: string, options = {}) => {
  const compiler = webpack({
    context: `${__dirname}/example`,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            loader: path.resolve(__dirname, '../../index.ts'),
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
