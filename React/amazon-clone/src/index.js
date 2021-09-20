import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import './index.css'
import { App } from 'App'
import { StateProvider } from 'context'

const rootEl = document.getElementById('root')
render(
  <StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </StrictMode>,
  rootEl
)
