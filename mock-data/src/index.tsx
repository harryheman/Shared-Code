import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import { configureStore } from './store'

export const store = configureStore()

function prepare() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mocks')
    return worker.start()
  }
  return Promise.resolve()
}
prepare().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
})
