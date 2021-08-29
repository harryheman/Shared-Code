class MyClass {
  constructor() {
    Object.defineProperty(this, 'data', {
      get() {
        const actualData = someExpensiveOperation()

        Object.defineProperty(this, 'data', {
          value: actualData,
          writable: false,
          configurable: false
        })

        return actualData
      },
      configurable: true,
      enumerable: true
    })
  }
}

const obj = {
  get data() {
    const actualData = someExpensiveOperation()

    Object.defineProperty(this, 'data', {
      value: actualData,
      writable: false,
      configurable: false,
      enumerable: false
    })

    return actualData
  }
}

const bindAll = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === 'function') {
      obj[key] = obj[key].bind(obj)
    }
  }
}
