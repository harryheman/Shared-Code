import React, { StrictMode } from 'react'
import { render } from 'react-dom'

import App from './App'
import { Provider } from './context'

render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
