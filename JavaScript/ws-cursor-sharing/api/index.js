const WebSocket = require('ws')
const nanoid = require('nanoid')

const wss = new WebSocket.Server({ port: 7071 })
const clients = new Map()

wss.on('connection', (ws) => {
  const id = nanoid(5)
  const color = ~~(Math.random() * 360)
  const metadata = { id, color }

  clients.set(ws, metadata)

  ws.on('message', (msgStr) => {
    const msg = JSON.parse(msgStr)
    const { id, color } = clients.get(ws)

    msg.sender = id
    msg.color = color
    ;[...client.keys()].forEach((client) => {
      client.send(JSON.stringify(msg))
    })
  })
})

wss.on('close', (ws) => {
  clients.delete(ws)
})
