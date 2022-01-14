function Banner() {
  let keyword = 'HELLO',
    c,
    $,
    bgC,
    bg$,
    denseness = 10,
    parts = [],
    mouse = {
      x: -100,
      y: -100
    },
    mouseOnScreen = false,
    itercount = 0,
    itertot = 40

  this.init = function () {
    c = document.querySelector('canvas')
    $ = c.getContext('2d')

    c.width = innerWidth
    c.height = innerHeight

    bgC = document.createElement('canvas')
    bg$ = bgC.getContext('2d')

    bgC.width = innerWidth
    bgC.height = innerHeight

    c.addEventListener('mousemove', mouseMove)
    c.addEventListener('mouseout', mouseOut)

    start()
  }

  let start = function () {
    bg$.fillStyle = 'black'
    bg$.font = '300px impact'
    bg$.textAlign = 'center'
    bg$.textBaseline = 'middle'
    bg$.fillText(keyword, c.width / 2, c.height / 2)

    clear()
    getCoords()
  }

  let getCoords = function () {
    let imgData, pixel, height, width

    imgData = bg$.getImageData(0, 0, c.width, c.height)

    for (height = 0; height < bgC.height; height += denseness) {
      for (width = 0; width < bgC.width; width += denseness) {
        pixel = imgData.data[(width + height * bgC.width) * 4 - 1]
        if (pixel == 255) {
          drawCircle(width, height)
        }
      }
    }
    setInterval(update, 40)
  }

  let drawCircle = function (x, y) {
    let startX = Math.random() * c.width,
      startY = Math.random() * c.height,
      velX = (x - startX) / itertot,
      velY = (y - startY) / itertot

    parts.push({
      c: '#' + ((Math.random() * 0x949494 + 0xaaaaaa) | 0).toString(16),
      x: x,
      y: y,
      x2: startX,
      y2: startY,
      r: true,
      v: {
        x: velX,
        y: velY
      }
    })
  }

  let update = function () {
    let i, dx, dy, sqrDist, scale
    itercount++
    clear()
    for (i = 0; i < parts.length; i++) {
      if (parts[i].r == true) {
        parts[i].x2 += parts[i].v.x
        parts[i].y2 += parts[i].v.y
      }
      if (itercount == itertot) {
        parts[i].v = {
          x: Math.random() * 6 * 2 - 6,
          y: Math.random() * 6 * 2 - 6
        }
        parts[i].r = false
      }

      dx = parts[i].x - mouse.x
      dy = parts[i].y - mouse.y
      sqrDist = Math.sqrt(dx * dx + dy * dy)

      if (sqrDist < 20) {
        parts[i].r = true
      }

      $.fillStyle = parts[i].c
      $.beginPath()
      $.arc(parts[i].x2, parts[i].y2, 4, 0, Math.PI * 2)
      $.closePath()
      $.fill()
    }
  }

  let mouseMove = function (e) {
    if (e.layerX || e.layerX == 0) {
      mouseOnScreen = true

      mouse.x = e.layerX - c.offsetLeft
      mouse.y = e.layerY - c.offsetTop
    }
  }

  let mouseOut = function () {
    mouseOnScreen = false
    mouse.x = -100
    mouse.y = -100
  }

  let clear = function () {
    $.fillStyle = '#222'
    $.fillRect(0, 0, c.width, c.height)
  }
}

let banner = new Banner()
banner.init()
