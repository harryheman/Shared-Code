import webpack from 'webpack'
import WDM from 'webpack-dev-middleware'
import WHM from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config.client'
import { config } from 'dotenv'

config()

export default function compile(app) {
  if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(webpackConfig)
    const middleware = WDM(compiler, {
      publicPath: webpackConfig.output.publicPath
    })
    app.use(middleware)
    app.use(WHM(compiler))
  }
}
