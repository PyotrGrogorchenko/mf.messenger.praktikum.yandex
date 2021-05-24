import path from 'path'
import { createFsFromVolume, Volume } from 'memfs'
import webpack, { Stats } from 'webpack'

export default (fixture: string, options = {}): Promise<Stats> => {
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

  return new Promise<Stats>((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || !stats) reject(err)
      if (stats && stats.hasErrors()) reject(stats.toJson().errors)
      resolve(stats as webpack.Stats)
    })
  })
}
