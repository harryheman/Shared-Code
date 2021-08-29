import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaAlignRight } from 'react-icons/fa'
import logo from 'images/logo.svg'

export const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            <img src={logo} alt='' />
          </Link>
          <button
            className='nav-btn'
            onClick={() => {
              setOpen(!open)
            }}
          >
            <FaAlignRight className='nav-icon' />
          </button>
        </div>
        <ul className={open ? 'nav-links show-nav' : 'nav-links'}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/rooms'>Rooms</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
