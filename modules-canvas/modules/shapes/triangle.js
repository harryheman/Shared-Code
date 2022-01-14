import { convert } from '../helpers/convert.js'

export class Triangle {
  constructor({ ctx, listEl, length, x, y, color }) {
    this.ctx = ctx
    this.listEl = listEl
    this.length = length
    this.x = x
    this.y = y
    this.color = color
    this.name = 'Triangle'
    this.listItemEl = document.createElement('li')
  }

  draw() {
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.ctx.moveTo(this.x, this.y)
    this.ctx.lineTo(this.x + this.length, this.y)
    const height = (this.length / 2) * Math.tan(convert(60))
    this.ctx.lineTo(this.x + this.length / 2, this.y + height)
    this.ctx.fill()
  }

  report() {
    this.listItemEl.innerHTML = `<p>${this.name} area is ${Math.round(
      (Math.sqrt(3) / 4) * (this.length * this.length)
    )}px squared.</p>`
    this.listItemEl.innerHTML += `<p>${this.name} perimeter is ${
      this.length * 3
    }px.</p>`
    this.listEl.append(this.listItemEl)
  }
}
