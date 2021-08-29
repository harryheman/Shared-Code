import React from 'react'
import style from './style'

const App = () => (
  <>
    <div className={style.app}>hello world</div>
    <button onClick={() => alert('hello world')}>say hello</button>
  </>
)

export default App
