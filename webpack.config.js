const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    main: './static/js/index.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'static/dist')
    //path: 'static/dist'
  }
}