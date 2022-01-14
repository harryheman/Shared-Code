const c = document.querySelector('canvas'),
  $ = c.getContext('2d')

document.querySelector('.generate').onclick = generateCanvas

function generateCanvas() {
  let shapeForm = document.querySelector('select').value
  let shapeWidth = parseInt(document.querySelector('.shapeWidth').value)
  let shapeNumber = parseInt(document.querySelector('.shapeNumber').value)
  let shapeAmount = Math.pow(shapeNumber, 2)
  let backColor = document.querySelector('.backColor').value

  let W = (H = shapeWidth * shapeNumber)
  c.setAttribute('width', W)
  c.setAttribute('height', H)

  let border = 1
  let borderColor = 'rgba(0,0,0,.4)'
  let isShown = false

  if (
    shapeWidth < 10 ||
    shapeWidth > 50 ||
    shapeNumber < 10 ||
    shapeNumber > 50 ||
    isNaN(shapeWidth) ||
    isNaN(shapeNumber)
  ) {
    throw new Error(alert('wrong number'))
  } else if (shapeForm === 'squares') {
    c.style.display = 'block'
    squares()
  } else {
    c.style.display = 'block'
    circles()
  }

  function squares() {
    let x = (y = 0)

    let squares = []

    let w = (h = shapeWidth)

    addSquares()

    function Square(x, y) {
      this.x = x
      this.y = y
      this.color = backColor
      this.isSelected = false
    }

    function addSquares() {
      for (let i = 0; i < shapeAmount; i++) {
        let square = new Square(x, y)
        x += w
        if (x == W) {
          y += h
          x = 0
        }
        squares.push(square)
      }
      drawSquares()
    }

    function drawSquares() {
      $.clearRect(0, 0, W, H)

      for (let i = 0; i < squares.length; i++) {
        let square = squares[i]
        $.beginPath()
        $.rect(square.x, square.y, w, h)
        $.fillStyle = square.color
        $.lineWidth = border
        $.strokeStyle = borderColor
        $.fill()
        $.stroke()
        if (isShown) {
          $.beginPath()
          $.font = '8pt Calibri'
          $.fillStyle = 'rgba(0,0,0,.6)'
          $.fillText(i + 1, square.x, square.y + 8)
        }
      }
    }

    c.onclick = select

    function select(e) {
      let clickX = e.pageX - c.offsetLeft,
        clickY = e.pageY - c.offsetTop

      for (let i = 0; i < squares.length; i++) {
        let square = squares[i]

        if (
          clickX > square.x &&
          clickX < square.x + w &&
          clickY > square.y &&
          clickY < square.y + h
        ) {
          if (square.isSelected == false) {
            square.isSelected = true
            square.color = document.querySelector('.shapeColor').value
          } else {
            square.isSelected = false
            square.color = backColor
          }
          drawSquares()
        }
      }
    }

    document.querySelector('.show').onclick = showNumbers

    function showNumbers() {
      if (!isShown) {
        isShown = true
        for (let i = 0; i < squares.length; i++) {
          let square = squares[i]
          $.beginPath()
          $.font = '8pt Calibri'
          $.fillStyle = 'rgba(0,0,0,.6)'
          $.fillText(i + 1, square.x, square.y + 8)
        }
      } else {
        isShown = false
      }
      drawSquares()
    }
  }

  function circles() {
    let r = shapeWidth / 2

    let x = (y = r)

    let circles = []

    addCircles()

    function Circle(x, y) {
      this.x = x
      this.y = y
      this.color = backColor
      this.isSelected = false
    }

    function addCircles() {
      for (let i = 0; i < shapeAmount; i++) {
        let circle = new Circle(x, y)
        x += shapeWidth
        if (x == W + r) {
          y += shapeWidth
          x = r
        }
        circles.push(circle)
      }
      drawCircles()
    }

    function drawCircles() {
      $.clearRect(0, 0, W, H)

      for (let i = 0; i < circles.length; i++) {
        let circle = circles[i]
        $.beginPath()
        $.arc(circle.x, circle.y, r, 0, Math.PI * 2)
        $.fillStyle = circle.color
        $.strokeStyle = borderColor
        $.lineWidth = border
        $.fill()
        $.stroke()
        if (isShown) {
          $.beginPath()
          $.font = '8pt Calibri'
          $.fillStyle = 'rgba(0,0,0,.6)'
          $.fillText(i + 1, circle.x - 8, circle.y)
        }
      }
    }

    c.onclick = select

    function select(e) {
      let clickX = e.pageX - c.offsetLeft,
        clickY = e.pageY - c.offsetTop

      for (let i = 0; i < circles.length; i++) {
        let circle = circles[i]

        let distanceFromCenter = Math.sqrt(
          Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2)
        )

        if (distanceFromCenter <= r) {
          if (circle.isSelected == false) {
            circle.isSelected = true
            circle.color = document.querySelector('.shapeColor').value
          } else {
            circle.isSelected = false
            circle.color = backColor
          }
          drawCircles()
        }
      }
    }

    document.querySelector('.show').onclick = showNumbers

    function showNumbers() {
      if (!isShown) {
        isShown = true
        for (let i = 0; i < circles.length; i++) {
          let circle = circles[i]
          $.beginPath()
          $.font = '8pt Calibri'
          $.fillStyle = 'rgba(0,0,0,.6)'
          $.fillText(i + 1, circle.x - 8, circle.y)
        }
      } else {
        isShown = false
      }
      drawCircles()
    }
  }

  document.querySelector('.save').onclick = () => {
    let img = document.querySelector('img')

    img == null
      ? (document.body.appendChild(
          document.createElement('img')
        ).src = c.toDataURL())
      : document.body.removeChild(img)
  }

  document.querySelector('.clear').onclick = () => {
    $.clearRect(0, 0, W, H)
    generateCanvas()
  }

  document.querySelector('.delete').onclick = () => {
    $.clearRect(0, 0, W, H)
    c.style.display = 'none'
  }
}
