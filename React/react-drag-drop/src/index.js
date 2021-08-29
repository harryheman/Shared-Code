import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'

import { App } from './components'

import '@atlaskit/css-reset'

const GlobalStyles = createGlobalStyle`
  body {
    display: grid;
    place-items:center;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
