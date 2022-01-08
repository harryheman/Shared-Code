const path = require('path')
const CWD = process.cwd()

const config = {
  name: 'browser',
  mode: 'production',
  entry: [path.join(CWD, 'client/index.js')],
  output: {
    path: path.join(CWD, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
}

module.exports = config
