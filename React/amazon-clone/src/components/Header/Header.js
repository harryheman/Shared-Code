import './Header.css'
import { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Drawer } from '@material-ui/core'
import { Search, ShoppingBasket } from '@material-ui/icons'
import { useStateContext, A } from 'context'
import { auth } from 'fb'
import { Checkout } from 'pages'

export const Header = () => {
  const history = useHistory()

  const [{ cart, user, drawer }, dispatch] = useStateContext()

  const onAuth = () => {
    if (user) {
      auth.signOut()
    }
  }

  const onClose = ({ code }) => {
    if (code === 'Escape') {
      dispatch(A.setDrawer(false))
    }
  }

  useEffect(() => {
    return () => onClose()
  }, [])

  return (
    <div className='header'>
      <Link to='/'>
        <img
          src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
          alt=''
          className='header__logo'
        />
      </Link>

      <div className='header__search'>
        <input type='text' className='header__searchInput' />
        <Search className='header__searchIcon' />
      </div>

      <div className='header__nav'>
        <Link to={!user ? '/login' : '/'}>
          <div className='header__option' onClick={onAuth}>
            <span className='header__optionLineOne'>
              Hello {!user ? 'Guest' : user.email}
            </span>
            <span className='header__optionLineTwo'>
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>

        <Link to='/orders'>
          <div className='header__option'>
            <span className='header__optionLineOne'>Returns</span>
            <span className='header__optionLineTwo'>&amp; Orders</span>
          </div>
        </Link>

        <Link
          to='#'
          onClick={() => {
            if (user) {
              dispatch(A.setDrawer(true))
            } else {
              history.push('/login')
            }
          }}
        >
          <div className='header__optionCart'>
            <ShoppingBasket />
            <span className='header__optionLineTwo header__cartCount'>
              {cart.length}
            </span>
          </div>
        </Link>
        <Drawer open={drawer} style={{ width: '50%' }} onClose={onClose}>
          <Checkout />
        </Drawer>
      </div>
    </div>
  )
}
