const $ = document.querySelector('canvas').getContext('2d')
const scoreElem = document.querySelector('.score')

const rows = 20
const cols = 10
const size = 20
const empty = 'white'

function drawSquare(x, y, color) {
  $.fillStyle = color
  $.fillRect(x * size, y * size, size, size)

  $.strokeStyle = '#999'
  $.strokeRect(x * size, y * size, size, size)
}

// create board
let board = []
for (let r = 0; r < rows; r++) {
  board[r] = []
  for (let c = 0; c < cols; c++) {
    board[r][c] = empty
  }
}

function drawBoard() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      drawSquare(c, r, board[r][c])
    }
  }
}
drawBoard()

// pieces and their colors
const P = [
  [Z, 'red'],
  [S, 'green'],
  [T, 'yellow'],
  [O, 'blue'],
  [L, 'purple'],
  [I, 'cyan'],
  [J, 'orange']
]

let score = 0
class Piece {
  constructor(tetro, color) {
    this.tetro = tetro
    this.color = color

    this.tetroN = 0 // start from first pattern
    this.tetroA = this.tetro[this.tetroN] // active tetromino

    // control pieces
    this.x = 3
    this.y = -2
  }

  fill(color) {
    for (let r = 0; r < this.tetroA.length; r++) {
      for (let c = 0; c < this.tetroA.length; c++) {
        // draw occupied squares
        if (this.tetroA[r][c]) {
          drawSquare(this.x + c, this.y + r, color)
        }
      }
    }
  }

  draw() {
    this.fill(this.color)
  }

  undraw() {
    this.fill(empty)
  }

  move(direction) {
    switch (direction) {
      case 'down':
        if (!this.collision(0, 1, this.tetroA)) {
          this.undraw()
          this.y++
          this.draw()
        } else {
          // lock piece and draw new
          this.lock()
          p = randomPiece()
        }
        break
      case 'right':
        if (!this.collision(1, 0, this.tetroA)) {
          this.undraw()
          this.x++
          this.draw()
        }
        break
      case 'left':
        if (!this.collision(-1, 0, this.tetroA)) {
          this.undraw()
          this.x--
          this.draw()
        }
        break
    }
  }

  rotate() {
    let nextPattern = this.tetro[(this.tetroN + 1) % this.tetro.length]
    let kick = 0

    if (this.collision(0, 0, nextPattern)) {
      this.x > C / 2 // right wall
        ? // move piece to left
          (kick = -1) // left wall
        : // move piece to right
          (kick = 1)
    }

    if (!this.collision(kick, 0, nextPattern)) {
      this.undraw()
      this.x += kick
      this.tetroN = (this.tetroN + 1) % this.tetro.length // (0+1)%4 = 1
      this.tetroA = this.tetro[this.tetroN]
      this.draw()
    }
  }

  lock() {
    for (let r = 0; r < this.tetroA.length; r++) {
      for (let c = 0; c < this.tetroA.length; c++) {
        // skip empty squares
        if (!this.tetroA[r][c]) continue

        // pieces locked on top - game over
        if (this.y + r < 0) {
          gameOver = true
          break
        }
        // lock piece
        board[this.y + r][this.x + c] = this.color
      }
    }

    // remove full rows
    for (let r = 0; r < rows; r++) {
      let isRowFull = true
      for (let c = 0; c < cols; c++) {
        isRowFull = isRowFull && board[r][c] != empty
      }
      if (isRowFull) {
        // move down all rows above
        for (let y = r; y > 1; y--) {
          for (let c = 0; c < cols; c++) {
            board[y][c] = board[y - 1][c]
          }
        }

        // top row has no row above
        for (let c = 0; c < cols; c++) board[0][c] = empty

        score += 10
      }
    }

    drawBoard()
    scoreElem.textContent = score
  }

  collision(x, y, piece) {
    for (let r = 0; r < piece.length; r++) {
      for (let c = 0; c < piece.length; c++) {
        // skip empty square
        if (!piece[r][c]) continue

        // coordinates after movement
        let newX = this.x + c + x
        let newY = this.y + r + y

        if (newX < 0 || newX >= cols || newY >= rows) return true

        // newY < 0; board[-1] will crash game
        if (newY < 0) continue

        // check locked piece
        if (board[newY][newX] != empty) return true
      }
    }
    return false
  }
}

function randomPiece() {
  let r = Math.floor(Math.random() * P.length) // 0 -> 6
  return new Piece(P[r][0], P[r][1])
}
let p = randomPiece()

document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 37:
      p.move('left')
      dropStart = Date.now()
      break
    case 38:
      p.rotate()
      dropStart = Date.now()
      break
    case 39:
      p.move('right')
      dropStart = Date.now()
      break
    case 40:
      p.move('down')
      break
  }
})

let dropStart = Date.now()
let gameOver = false

function drop() {
  let now = Date.now()
  let delta = now - dropStart
  if (delta > 1000) {
    p.move('down')
    dropStart = Date.now()
  }

  !gameOver ? requestAnimationFrame(drop) : location.reload()
}
drop()
