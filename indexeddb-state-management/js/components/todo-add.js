import { State } from '../lib/state.js'

class TodoAdd extends HTMLElement {
  static template = /*html*/ `
    <style>
      form { display: flex; justify-content: space-between; padding: 0.5em; }
      input { flex: 3 1 10em; font-size: 1em; padding: 6px; }
      button { width: 4em; }
    </style>
    <form>
      <input type="text" placeholder="add new item" required />
      <button>add</button>
    </form>
  `

  constructor() {
    super()
    this.state = new State(['todolist'], (name, value) => (this[name] = value))
  }

  async connectedCallback() {
    this.todolist = (await this.state.get(['todolist'])) || []

    const shadow = this.attachShadow({ mode: 'closed' })
    shadow.innerHTML = TodoAdd.template

    const add = shadow.querySelector('input')

    shadow.querySelector('form').addEventListener('submit', async (e) => {
      e.preventDefault()

      await this.state.set('todolist', this.todolist.concat(add.value))

      add.value = ''
      add.focus()
    })
  }
}

customElements.define('todo-add', TodoAdd)
