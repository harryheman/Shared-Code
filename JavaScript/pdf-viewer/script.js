class PDFViewer {
  constructor(selector, url) {
    this.container = document.querySelector(selector)
    this.url = url

    this.pdf = null
    this.currentPage = 1
    this.totalPages = 0
    this.currentZoom = 1

    // this.state = {
    //   pdf = null
    //   currentPage: 1,
    //   totalPages: 0,
    //   currentZoom: 1,
    // }

    this.canvas = this.container.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.onClick = this.onClick.bind(this)
    this.onChange = this.onChange.bind(this)

    this.container.addEventListener('click', this.onClick)
    this.container.addEventListener('change', this.onChange)

    document.addEventListener('keydown', this.onKeydown)

    this.#init()
  }

  async #init() {
    const pdf = await pdfjsLib.getDocument(this.url)
    this.pdf = pdf
    this.totalPages = this.pdf._pdfInfo.numPages
    current_page.max = this.totalPages

    this.#render()
  }

  async #render() {
    const currentPage = await this.pdf.getPage(this.currentPage)
    const viewport = currentPage.getViewport(this.currentZoom)

    this.canvas.width = viewport.width
    this.canvas.height = viewport.height

    currentPage.render({
      canvasContext: this.ctx,
      viewport
    })
  }

  onClick(e) {
    if (e.target.tagName !== 'BUTTON' || this.pdf === null) return

    const btnName = e.target.id

    switch (btnName) {
      case 'prev_btn':
        if (this.currentPage !== 1) {
          current_page.value = --this.currentPage
          this.#render()
        }
        break
      case 'next_btn':
        if (this.currentPage !== this.totalPages) {
          current_page.value = ++this.currentPage
          this.#render()
        }
        break
      case 'zoom_in':
        if (this.currentZoom !== 1.5) {
          this.currentZoom += 0.5
          this.#render()
        }
        break
      case 'zoom_out':
        if (this.currentZoom !== 0.5) {
          this.currentZoom -= 0.5
          this.#render()
        }
        break
    }
  }

  onChange() {
    if (this.pdf === null) return

    const pageNum = current_page.valueAsNumber

    if (pageNum >= 1 && pageNum <= this.totalPages) {
      this.currentPage = pageNum
      this.#render()
    }
  }

  onKeydown(e) {
    const { key } = e

    switch (key) {
      case 'ArrowLeft':
        prev_btn.click()
        break
      case 'ArrowRight':
        next_btn.click()
        break
      case '+':
        zoom_in.click()
        break
      case '-':
        zoom_out.click()
        break
    }
  }
}

new PDFViewer(
  '#viewer_box',
  'https://thebestcode.ru/public/books/design_patterns.pdf'
)
