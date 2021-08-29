const C = document.querySelector('canvas')
const W = C.width
const H = C.height
const $ = C.getContext('2d')

function drawRect(x, y, w, h, color) {
  $.fillStyle = color
  $.fillRect(x, y, w, h)
}
drawRect(0, 0, W, H, 'black')

const user = {
  x: 0,
  y: H / 2 - 50,
  width: 10,
  height: 100,
  color: 'white',
  score: 0
}

const com = {
  x: W - 10,
  y: H / 2 - 50,
  width: 10,
  height: 100,
  color: 'white',
  score: 0
}

const net = {
  x: W / 2 - 1,
  y: 0,
  width: 2,
  height: 10,
  color: 'white'
}

const ball = {
  x: W / 2,
  y: H / 2,
  speed: 7,
  cx: 5,
  cy: 5,
  r: 10,
  color: 'white'
}

function drawCircle(x, y, r, color) {
  $.fillStyle = color
  $.beginPath()
  $.arc(x, y, r, 0, 2 * Math.PI)
  $.closePath()
  $.fill()
}

function drawText(text, x, y, color) {
  $.fillStyle = color
  $.font = '75px fantasy'
  $.fillText(text, x, y)
}

function drawNet() {
  for (let i = 0; i < H; i += 15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color)
  }
}

function collision(b, p) {
  p.top = p.y
  p.bottom = p.y + p.height
  p.left = p.x
  p.right = p.x + p.width

  b.top = b.y - b.r
  b.bottom = b.y + b.r
  b.left = b.x - b.r
  b.right = b.x + b.r

  return (
    p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top
  )
}

function update() {
  if (ball.x - ball.r < 0) {
    com.score++
    resetBall()
  } else if (ball.x + ball.r > W) {
    user.score++
    resetBall()
  }

  ball.x += ball.cx
  ball.y += ball.cy

  com.y += (ball.y - (com.y + com.height / 2)) * 0.1

  if (ball.y - ball.r < 0 || ball.y + ball.r > H) {
    ball.cy = -ball.cy
  }

  let player = ball.x + ball.r < W / 2 ? user : com

  if (collision(ball, player)) {
    let collidePoint =
      (ball.y - (player.y + player.height / 2)) / (player.height / 2)

    let angleRad = (Math.PI / 4) * collidePoint

    let direction = ball.x + ball.r < W / 2 ? 1 : -1
    ball.cx = direction * ball.speed * Math.cos(angleRad)
    ball.cy = ball.speed * Math.sin(angleRad)

    ball.speed += 0.1
  }
}

function render() {
  drawRect(0, 0, W, H, 'black')

  drawText(user.score, W / 4, H / 5, user.color)

  drawText(com.score, (3 * W) / 4, H / 5, com.color)

  drawNet()

  drawRect(user.x, user.y, user.width, user.height, user.color)

  drawRect(com.x, com.y, com.width, com.height, com.color)

  drawCircle(ball.x, ball.y, ball.r, ball.color)
}

function resetBall() {
  ball.x = W / 2
  ball.y = H / 2
  ball.speed = 7
  ball.cx = -ball.cx
}

C.addEventListener('mousemove', movePaddle)

function movePaddle(event) {
  let rect = C.getBoundingClientRect()
  user.y = event.clientY - rect.top - user.height / 2
}

function game() {
  update()
  render()
}

const framePerSecond = 50

setInterval(game, 1000 / framePerSecond)
