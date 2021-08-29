;(async () => {
  const ws = await connectToServer()

  ws.onmessage = (wsMsg) => {
    const body = JSON.parse(wsMsg.data)
    const cursor = getOrCreateCursor(body)
    cursor.style.transform = `translate(${body.x}px, ${body.y}px)`
  }

  window.onmousemove = ({ clientX, clientY }) => {
    ws.send(JSON.stringify({ x: clientX, y: clientY }))
  }

  async function connectToServer() {
    const ws = new WebSocket('ws://localhost:7071/ws')
    return new Promise((res) => {
      const timer = setInterval(() => {
        if (ws.readyState === 1) {
          clearInterval(timer)
          res(ws)
        }
      }, 10)
    })
  }

  function getOrCreateCursor({ sender, color }) {
    const existing = document.querySelector(`[data-sender='${sender}']`)
    if (existing) {
      return existing
    }

    const template = document.getElementById('cursor')
    const cursor = template.content.firstElementChild.cloneNode(true)
    const svgPath = cursor.querySelector('path')

    cursor.setAttribute('data-sender', sender)
    svgPath.setAttribute('fill', `hsl(${color}, 50%, 50%)`)
    document.body.append(cursor)

    return cursor
  }
})()
