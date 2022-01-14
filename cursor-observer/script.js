let c,
  $,
  u = 10,
  m = {
    x: innerWidth / 2,
    y: innerHeight / 2
  }

window.onmousemove = (e) => {
  m.x = e.clientX
  m.y = e.clientY
}

function gc() {
  let s = '0123456789abcdef',
    c = '#'
  for (let i = 0; i < 6; i++) {
    c += s[Math.ceil(Math.random() * 15)]
  }
  return c
}

let a = []
window.onload = function () {
  c = document.querySelector('canvas')
  $ = c.getContext('2d')

  for (let i = 0; i < 10; i++) {
    let r = 30,
      x = Math.random() * (innerWidth - 2 * r) + r,
      y = Math.random() * (innerHeight - 2 * r) + r,
      t = new obj(
        innerWidth / 2,
        innerHeight / 2.5,
        'red',
        Math.random() * 200 + 20,
        2
      )
    a.push(t)
  }

  $.lineWidth = 2
  $.globalAlpha = 0.5
  resize()
  anim()
}

window.onresize = () => resize()

function resize() {
  c.height = innerHeight
  c.width = innerWidth
  for (let i = 0; i < 101; i++) {
    let r = 30,
      x = Math.random() * (innerWidth - 2 * r) + r,
      y = Math.random() * (innerHeight - 2 * r) + r
    a[i] = new obj(
      innerWidth / 2,
      innerHeight / 2,
      4,
      gc(),
      Math.random() * 200 + 20,
      0.02
    )
  }
}

function obj(x, y, r, cc, o, s) {
  this.x = x
  this.y = y
  this.r = r
  this.cc = cc
  this.theta = Math.random() * Math.PI * 2
  this.s = s
  this.o = o
  this.t = Math.random() * 150

  this.o = o
  this.dr = function () {
    let ls = {
      x: this.x,
      y: this.y
    }
    this.theta += this.s
    this.x = m.x + Math.cos(this.theta) * this.t
    this.y = m.y + Math.sin(this.theta) * this.t

    $.beginPath()
    $.lineWidth = this.r
    $.strokeStyle = this.cc
    $.moveTo(ls.x, ls.y)
    $.lineTo(this.x, this.y)
    $.stroke()
  }
}

function anim() {
  requestAnimationFrame(anim)
  $.fillStyle = 'rgba(0, 0, 0, .05)'
  $.fillRect(0, 0, c.width, c.height)
  a.forEach((e) => e.dr())
}
