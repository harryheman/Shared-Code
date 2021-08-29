export class Square {
  constructor({ ctx, listEl, length, x, y, color }) {
    this.ctx = ctx
    this.listEl = listEl
    this.length = length
    this.x = x
    this.y = y
    this.color = color
    this.name = 'Square'
    this.listItemEl = document.createElement('li')
  }

  draw() {
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(this.x, this.y, this.length, this.length)
  }

  report() {
    this.listItemEl.innerHTML = `<p>${this.name} area is ${
      this.length * this.length
    }px squared.</p>`
    this.listItemEl.innerHTML += `<p>${this.name} perimeter is ${
      this.length * 4
    }px.</p>`
    this.listEl.append(this.listItemEl)
  }
}
