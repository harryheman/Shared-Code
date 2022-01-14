const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = (app) => {
  app.use(
    createProxyMiddleware('/.netlify/functions', {
      target: 'http://localhost:9000',
      pathRewrite: {
        '^/\\.netlify/functions': ''
      }
    })
  )
}
