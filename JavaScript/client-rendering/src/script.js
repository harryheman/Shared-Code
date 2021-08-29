import { checkPageName } from './helpers/check-page-name.js'

class App {
  #page = null

  constructor(container, page) {
    this.$container = container
    this.#page = page

    this.route = this.route.bind(this)

    this.#initApp()
  }

  #initApp() {
    const { url } = this.#page

    history.replaceState({ pageName: `${url}` }, `${url} page`, url)

    this.#render(this.#page)

    document.addEventListener('click', this.route, { passive: true })

    window.addEventListener('popstate', async ({ state }) => {
      const { pageName } = state

      this.#page = await checkPageName(pageName)

      this.#render(this.#page)
    })
  }

  async #render({ content }) {
    this.$container.innerHTML =
      typeof content === 'string' ? content : await content()
  }

  async route({ target }) {
    if (target.tagName !== 'A' && target.tagName !== 'ARTICLE') return

    const { url } = target.dataset
    if (this.#page.url === url) return

    this.#page = await checkPageName(url)

    this.#render(this.#page)

    this.#savePage(this.#page)
  }

  #savePage({ url }) {
    history.pushState({ pageName: `${url}` }, `${url} page`, url)

    localStorage.setItem('pageName', JSON.stringify(url))
  }
}

;(async () => {
  const container = document.querySelector('main')

  const pageName = JSON.parse(localStorage.getItem('pageName')) ?? 'home'

  const pageToRender = await checkPageName(pageName)

  new App(container, pageToRender)
})()
