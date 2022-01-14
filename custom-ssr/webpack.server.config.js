const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')
const { merge } = require('webpack-merge')
const sharedConfig = require('./webpack.shared.config.js')

let config = {
  target: 'node',

  entry: './server/index.js',

  output: {
    path: path.join(__dirname, './build/server'),
    filename: 'bundle.js'
  },

  externals: [webpackNodeExternals()],

  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportOnlyLocals: true,
                exportLocalsConvention: 'camelCase',
                localIdentName: '[local]_[hash:base64:5]'
              }
            }
          }
        ]
      }
    ]
  }
}

module.exports = merge(sharedConfig, config)
