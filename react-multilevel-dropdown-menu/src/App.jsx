import { Navbar } from './components'

export default function App() {
  return (
    <header>
      <div className='nav-area'>
        <a href='#' className='logo'>
          Logo
        </a>
        <Navbar />
      </div>
    </header>
  )
}
