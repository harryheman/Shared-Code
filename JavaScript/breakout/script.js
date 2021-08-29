const canvas = document.querySelector('canvas')
const $ = canvas.getContext('2d')
const w = canvas.width
const h = canvas.height

let score = 0

const brickRows = 9
const brickCols = 5

const ball = {
  x: w / 2,
  y: h / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4
}

const paddle = {
  x: w / 2 - 40,
  y: h - 30,
  w: 75,
  h: 15,
  speed: 8,
  dx: 0
}

const brick = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
}

const bricks = []
for (let i = 0; i < brickRows; i++) {
  bricks[i] = []
  for (let j = 0; j < brickCols; j++) {
    const x = i * (brick.w + brick.padding) + brick.offsetX
    const y = j * (brick.h + brick.padding) + brick.offsetY
    bricks[i][j] = {
      x,
      y,
      ...brick
    }
  }
}

function drawBall() {
  $.beginPath()
  $.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI)
  $.fillStyle = 'seagreen'
  $.fill()
  $.closePath()
}

function drawPaddle() {
  $.beginPath()
  $.rect(paddle.x, paddle.y, paddle.w, paddle.h)
  $.fillStyle = 'steelblue'
  $.fill()
  $.closePath()
}

function drawScore() {
  $.font = '20px Helvetica'
  $.fillText(`Score: ${score}`, w - 100, 30)
}

function drawBricks() {
  bricks.forEach((col) => {
    col.forEach((brick) => {
      $.beginPath()
      $.rect(brick.x, brick.y, brick.w, brick.h)
      $.fillStyle = brick.visible ? 'indianred' : 'transparent'
      $.fill()
      $.closePath()
    })
  })
}

function movePaddle() {
  paddle.x += paddle.dx

  // wall?
  if (paddle.x + paddle.w > w) {
    paddle.x = w - paddle.w
  } else if (paddle.x < 0) {
    paddle.x = 0
  }
}

function moveBall() {
  ball.x += ball.dx
  ball.y += ball.dy

  // wall?
  if (ball.x + ball.size > w || ball.x - ball.size < 0) {
    ball.dx *= -1 // ball.dx = ball.dx * -1
  } else if (ball.y + ball.size > h || ball.y - ball.size < 0) {
    ball.dy *= -1
  }

  // paddle?
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed
  }

  // brick?
  bricks.forEach((col) => {
    col.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left
          ball.x + ball.size < brick.x + brick.w && // right
          ball.y + ball.size > brick.y && // top
          ball.y - ball.size < brick.y + brick.h // bottom
        ) {
          ball.dy *= -1
          ball.speed += 0.25
          brick.visible = false

          increaseScore()
        }
      }
    })
  })

  // gameover
  if (ball.y + ball.size > h) {
    showBricks()
    score = 0
  }
}

function increaseScore() {
  score++

  if (score % brickRows ** 2 === 0) showBricks()
}

function showBricks() {
  bricks.forEach((col) => {
    col.forEach((brick) => (brick.visible = true))
  })
  ball.speed = 4
}

function drawAll() {
  $.clearRect(0, 0, w, h)

  drawBall()
  drawPaddle()
  drawScore()
  drawBricks()
}

function update() {
  movePaddle()
  moveBall()

  drawAll()

  requestAnimationFrame(update)
}

update()

document.addEventListener('keydown', (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed
  }
})
document.addEventListener('keyup', () => (paddle.dx = 0))
