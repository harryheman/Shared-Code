const getTemplate = (user) => `
<div class="card">
    <div class="row">
        <div class="col-md-4">
            <img src="${user.img}" class="card-img" alt="user-photo">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${
                  user.id !== null ? `Id: ${user.id}` : `User hasn't id`
                }</h5>
                <p class="card-text">Name: ${user.name}</p>
                <p class="card-text">Username: ${user.username}</p>
                <p class="card-text">Email: ${user.email}</p>
                <p class="card-text">Age: ${user.age}</p>
            </div>
        </div>
    </div>
</div>
`

class App {
  constructor(selector) {
    this.$ = document.querySelector(selector)
    this.#init()
  }

  #init() {
    this.startBtn = this.$.querySelector('[data-type="start-btn"]')
    this.stopBtn = this.$.querySelector('[data-type="stop-btn"]')
    this.eventLog = this.$.querySelector('[data-type="event-log"]')
    this.clickHandler = this.clickHandler.bind(this)
    this.$.addEventListener('click', this.clickHandler)
  }

  clickHandler(e) {
    if (e.target.tagName === 'BUTTON') {
      const { type } = e.target.dataset

      if (type === 'start-btn') {
        this.startEvents()
      } else if (type === 'stop-btn') {
        this.stopEvents()
      }

      this.changeDisabled()
    }
  }

  changeDisabled() {
    if (this.stopBtn.disabled) {
      this.stopBtn.disabled = false
      this.startBtn.disabled = true
    } else {
      this.stopBtn.disabled = true
      this.startBtn.disabled = false
    }
  }

  startEvents() {
    this.eventSource = new EventSource(
      'https://server-sent-events-example.herokuapp.com/getUsers'
    )

    this.eventLog.textContent = 'Accepting data from the server.'

    this.eventSource.addEventListener(
      'message',
      (e) => {
        if (e.lastEventId === '-1') {
          this.eventSource.close()
          this.eventLog.textContent = 'End of stream from the server.'

          this.changeDisabled()
        }
      },
      { once: true }
    )

    this.eventSource.addEventListener('randomUser', (e) => {
      const userData = JSON.parse(e.data)
      console.log(userData)

      const { id, name, login, email, dob, picture } = userData

      const i = id.value
      const fullName = `${name.first} ${name.last}`
      const username = login.username
      const age = dob.age
      const img = picture.large

      const user = {
        id: i,
        name: fullName,
        username,
        email,
        age,
        img
      }

      const template = getTemplate(user)

      this.$.insertAdjacentHTML('beforeend', template)
    })

    this.eventSource.addEventListener(
      'error',
      (e) => {
        this.eventSource.close()

        this.eventLog.textContent = `Got an error: ${e}`

        this.changeDisabled()
      },
      { once: true }
    )
  }

  stopEvents() {
    this.eventSource.close()
    this.eventLog.textContent = 'Event stream closed by client.'
  }
}

const app = new App('main')
