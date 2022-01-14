import React from 'react'
import { unstable_createRoot } from 'react-dom'
import { RecoilRoot } from 'recoil'

import App from './App'

import 'semantic-ui-css/semantic.min.css'

const root$ = document.getElementById('root')
unstable_createRoot(root$).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
)
