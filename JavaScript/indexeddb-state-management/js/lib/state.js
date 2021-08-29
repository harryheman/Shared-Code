import { IndexedDB } from './indexeddb.js'

export class State {
  static dbName = 'stateDB'
  static dbVersion = 1
  static storeName = 'state'
  static DB = null
  static target = new EventTarget()

  constructor(observed, updateCallback) {
    this.updateCallback = updateCallback

    this.observed = new Set(observed)

    State.target.addEventListener('set', (e) => {
      if (this.updateCallback && this.observed.has(e.detail.name)) {
        this.updateCallback(e.detail.name, e.detail.value)
      }
    })
  }

  async dbConnect() {
    State.DB =
      State.DB ||
      (await new IndexedDB(
        State.dbName,
        State.dbVersion,
        (db, oldVersion, newVersion) => {
          switch (oldVersion) {
            case 0: {
              db.createObjectStore(State.storeName)
            }
          }
        }
      ))
    return State.DB
  }

  async set(name, value) {
    this.observed.add(name)

    const db = await this.dbConnect()
    await db.set(State.storeName, name, value)

    const event = new CustomEvent('set', { detail: { name, value } })
    State.target.dispatchEvent(event)
  }

  async get(name) {
    this.observed.add(name)

    const db = await this.dbConnect()
    return await db.get(State.storeName, name)
  }
}
