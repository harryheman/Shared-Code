import { convert } from '../helpers/convert.js'

export class Circle {
  constructor({ ctx, listEl, radius, x, y, color }) {
    this.ctx = ctx
    this.listEl = listEl
    this.radius = radius
    this.x = x
    this.y = y
    this.color = color
    this.name = 'Circle'
    this.listItemEl = document.createElement('li')
  }

  draw() {
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, convert(0), convert(360))
    this.ctx.fill()
  }

  report() {
    this.listItemEl.innerHTML = `<p>${this.name} area is ${Math.round(
      Math.PI * (this.radius * this.radius)
    )}px squared.</p>`
    this.listItemEl.innerHTML += `<p>${this.name} circumference is ${Math.round(
      2 * Math.PI * this.radius
    )}px.</p>`
    this.listEl.append(this.listItemEl)
  }
}
