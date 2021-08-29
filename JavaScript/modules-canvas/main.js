import Canvas from './modules/canvas.js'

const { ctx, listEl, clearCanvas } = new Canvas(document.body, 400, 300)
  .createCanvas()
  .createReportList()

document.addEventListener('click', async (e) => {
  if (e.target.tagName !== 'BUTTON') return

  if (e.target.className === 'draw_btn') {
    const { btn: btnName } = e.target.dataset

    const shapeName = `${btnName[0].toUpperCase()}${btnName.slice(1)}`

    const shapeParams = {}

    const inputsEl = e.target.parentElement.querySelectorAll('input')

    inputsEl.forEach((input) => {
      const { prop } = input.dataset
      const value = !isNaN(input.value) ? input.valueAsNumber : input.value
      shapeParams[prop] = value
    })
    shapeParams.ctx = ctx
    shapeParams.listEl = listEl

    console.log(shapeParams)

    const ShapeModule = await import(`./modules/shapes/${btnName}.js`)
    const shape = new ShapeModule[shapeName](shapeParams)

    shape.draw()
    shape.report()
  } else {
    clearCanvas()
  }
})
