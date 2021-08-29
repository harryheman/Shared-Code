let c = document.querySelector('canvas'),
  $ = c.getContext('2d'),
  w = (c.width = innerWidth),
  h = (c.height = innerHeight),
  random = Math.random

$.fillStyle = 'black'
$.fillRect(0, 0, w, h)

let heartPos = function (rad) {
  return [
    Math.pow(Math.sin(rad), 3),
    -(
      15 * Math.cos(rad) -
      5 * Math.cos(2 * rad) -
      2 * Math.cos(3 * rad) -
      Math.cos(4 * rad)
    )
  ]
}

let scaleAndTranslate = function (pos, sx, sy, dx, dy) {
  return [dx + pos[0] * sx, dy + pos[1] * sy]
}

window.addEventListener('resize', function () {
  w = c.width = innerWidth
  h = c.height = innerHeight
  $.fillStyle = 'black'
  $.fillRect(0, 0, w, h)
})

let traceCount = 50,
  pointsOrigin = [],
  dr = 0.1,
  i

for (i = 0; i < Math.PI * 2; i += dr)
  pointsOrigin.push(scaleAndTranslate(heartPos(i), 210, 13, 0, 0))

for (i = 0; i < Math.PI * 2; i += dr)
  pointsOrigin.push(scaleAndTranslate(heartPos(i), 150, 9, 0, 0))

for (i = 0; i < Math.PI * 2; i += dr)
  pointsOrigin.push(scaleAndTranslate(heartPos(i), 90, 5, 0, 0))

let heartPointsCount = pointsOrigin.length,
  targetPoints = []

let pulse = function (kx, ky) {
  for (i = 0; i < pointsOrigin.length; i++) {
    targetPoints[i] = []
    targetPoints[i][0] = kx * pointsOrigin[i][0] + w / 2
    targetPoints[i][1] = ky * pointsOrigin[i][1] + h / 2
  }
}

let e = []
for (i = 0; i < heartPointsCount; i++) {
  let x = random() * w
  let y = random() * h

  e[i] = {
    vx: 0,
    vy: 0,
    R: 2,
    speed: random() + 5,
    q: ~~(random() * heartPointsCount),
    D: 2 * (i % 2) - 1,
    force: 0.2 * random() + 0.7,
    f:
      'hsla(0,' +
      ~~(40 * random() + 60) +
      '%,' +
      ~~(60 * random() + 20) +
      '%,.3)',
    trace: []
  }

  for (let k = 0; k < traceCount; k++)
    e[i].trace[k] = {
      x: x,
      y: y
    }
}

let config = {
  traceK: 0.4,
  timeDelta: 0.01
}

let time = 0
let loop = function () {
  let n = -Math.cos(time)

  pulse((1 + n) * 0.5, (1 + n) * 0.5)

  time += (Math.sin(time) < 0 ? 9 : n > 0.8 ? 0.2 : 1) * config.timeDelta

  $.fillStyle = 'rgba(0,0,0,.1)'
  $.fillRect(0, 0, w, h)

  for (i = e.length; i--; ) {
    let u = e[i],
      q = targetPoints[u.q],
      dx = u.trace[0].x - q[0],
      dy = u.trace[1].y - q[1],
      length = Math.sqrt(dx * dx + dy * dy)

    if (10 > length) {
      if (0.95 < random()) {
        u.q = ~~(random() * heartPointsCount)
      } else {
        if (0.99 < random()) {
          u.D *= -1
        }

        u.q += u.D
        u.q %= heartPointsCount

        if (0 > u.q) {
          u.q += heartPointsCount
        }
      }
    }

    u.vx += (-dx / length) * u.speed
    u.vy += (-dy / length) * u.speed

    u.trace[0].x += u.vx
    u.trace[0].y += u.vy

    u.vx *= u.force
    u.vy *= u.force

    for (k = 0; k < u.trace.length - 1; ) {
      let T = u.trace[k]
      let N = u.trace[++k]
      N.x -= config.traceK * (N.x - T.x)
      N.y -= config.traceK * (N.y - T.y)
    }

    $.fillStyle = u.f
    for (k = 0; k < u.trace.length; k++) {
      $.fillRect(u.trace[k].x, u.trace[k].y, 1, 1)
    }
  }

  requestAnimationFrame(loop, c)
}

loop()
