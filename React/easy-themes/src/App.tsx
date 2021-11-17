import './App.css'
import useLocalStorage from 'use-local-storage'
import Square from './components/square/Square'

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorage(
    'theme',
    defaultDark ? 'dark' : 'light'
  )

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <div className='App' data-theme={theme}>
      <span>Easy Darkmode and Themes in React</span>
      <button onClick={switchTheme}>
        Switch to {theme[0].toUpperCase() + theme.slice(1)} Theme
      </button>
      <Square />
    </div>
  )
}

export default App
