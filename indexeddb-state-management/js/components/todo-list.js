import { State } from '../lib/state.js'

class TodoList extends HTMLElement {
  static style = /*html*/ `
    <style>
      ol { padding: 0; margin: 1em 0; }
      li { list-style: numeric inside; padding: 0.5em; margin: 0; }
      li:hover, li:focus-within { background-color: #eee; }
      button { width: 4em; float: right; }
    </style>
  `

  static template = `<li>$1 <button value="$2">done</button></li>`

  constructor() {
    super()
    this.state = new State(['todolist'], this.render.bind(this))
  }

  async connectedCallback() {
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.render('todolist', (await this.state.get('todolist')) || [])

    this.shadow.addEventListener('click', async (e) => {
      if (e.target.nodeName !== 'BUTTON') return
      this.todolist.splice(e.target.value, 1)
      await this.state.set('todolist', this.todolist)
    })
  }

  render(name, value) {
    this[name] = value

    let list = ''
    this.todolist.map((v, i) => {
      list += TodoList.template.replace('$1', v).replace('$2', i)
    })

    this.shadow.innerHTML = `${TodoList.style}<ol>${list}</ol>`
  }
}

customElements.define('todo-list', TodoList)
