import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.hydrate(<App />, document.getElementById('ssr-app'))
})
