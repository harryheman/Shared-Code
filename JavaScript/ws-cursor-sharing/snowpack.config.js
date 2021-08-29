const proxy = require('http2-proxy')

module.exports = {
  mount: {
    app: '/'
  },
  routes: [
    {
      src: '/ws',
      upgrade: (req, socket, head) => {
        const defaultWsHandler = (err, req, socket, head) => {
          if (err) {
            console.error(err)
            socket.destroy()
          }
        }

        proxy.ws(
          req,
          socket,
          head,
          { hostname: 'localhost', port: 7071 },
          defaultWsHandler
        )
      }
    }
  ]
}
