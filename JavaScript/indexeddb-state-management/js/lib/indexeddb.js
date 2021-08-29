export class IndexedDB {
  constructor(dbName, dbVersion, dbUpgrade) {
    return new Promise((resolve, reject) => {
      this.db = null

      if (!('indexedDB' in window)) reject('not supported')

      const dbOpen = indexedDB.open(dbName, dbVersion)

      if (dbUpgrade) {
        dbOpen.onupgradeneeded = (e) => {
          dbUpgrade(dbOpen.result, e.oldVersion, e.newVersion)
        }
      }

      dbOpen.onsuccess = () => {
        this.db = dbOpen.result
        resolve(this)
      }

      dbOpen.onerror = (e) => {
        reject(`IndexedDB error: ${e.target.errorCode}`)
      }
    })
  }

  get connection() {
    return this.db
  }

  set(storeName, name, value) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite')
      const store = transaction.objectStore(storeName)

      store.put(value, name)

      transaction.oncomplete = () => {
        resolve(true)
      }

      transaction.onerror = () => {
        reject(transaction.error)
      }
    })
  }

  get(storeName, name) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.get(name)

      request.onsuccess = () => {
        resolve(request.result)
      }

      request.onerror = () => {
        reject(request.error)
      }
    })
  }
}
