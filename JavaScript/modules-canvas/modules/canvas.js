export default class Canvas {
  constructor(parent, width, height) {
    this.parent = parent
    this.width = width
    this.height = height
    this.ctx = null
    this.listEl = null
    this.clearCanvas = this.clearCanvas.bind(this)
  }

  createCanvas() {
    if (this.ctx !== null) {
      console.log('Canvas already created!')
      return
    } else {
      const canvasEl = document.createElement('canvas')

      canvasEl.setAttribute('width', this.width)
      canvasEl.setAttribute('height', this.height)

      this.parent.append(canvasEl)

      this.ctx = canvasEl.getContext('2d')
    }

    return this
  }

  createReportList() {
    if (this.listEl !== null) {
      console.log('Report list already created!')
      return
    } else {
      const listEl = document.createElement('ul')
      this.parent.append(listEl)

      this.listEl = listEl
    }

    return this
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.listEl.innerHTML = ''
  }
}
