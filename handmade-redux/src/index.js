import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import connect from './scripts/redux'
import { SET_RANDOM_COLOR } from './scripts/redux/types'

const getRandomColor = () =>
  `#${((Math.random() * 0xffffff) << 0).toString(16)}`

const Button = connect(['randomColor'], {
  setRandomColor: () => {
    const randomColor = getRandomColor()

    return {
      type: SET_RANDOM_COLOR,
      randomColor
    }
  }
})(({ randomColor, setRandomColor }) => (
  <button onClick={setRandomColor} style={{ backgroundColor: randomColor }}>
    Set Color
  </button>
))

ReactDOM.render(
  <React.StrictMode>
    <>
      <App />
      <Button />
    </>
  </React.StrictMode>,
  document.getElementById('root')
)
