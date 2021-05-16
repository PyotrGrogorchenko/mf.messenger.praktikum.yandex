// module.exports = ({ file, options, env }) => ({
//   parser: false,
//   plugins: {
//     'postcss-import': {},
//     'postcss-cssnext': {},
//     'cssnano':  env === 'production'  ? {} : false
//   }
// })

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true
          }
        }
      ]
    })
  ]
}
