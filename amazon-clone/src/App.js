import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Header } from 'components'
import { routes } from 'routes'
import { useStateContext, A, S } from 'context'
import { auth } from 'fb'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const App = () => {
  const [state, dispatch] = useStateContext()
  console.log(state)

  const notify = (variant, text, position) =>
    toast[variant](text, {
      position,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined
    })

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(A.setUser(user))
        notify('success', 'Logged in', 'top-center')
        const cart = S.getCartFromStorage()
        if (cart) {
          dispatch(A.setCart(cart))
          notify('info', 'Products set to cart')
        }
      } else {
        dispatch(A.setUser(null))
      }
    })
  }, [])

  return (
    <div className='app'>
      <Router>
        <Header />
        <Switch>
          {routes.map(({ Component, ...rest }, i) => (
            <Route key={i} {...rest}>
              <Component />
            </Route>
          ))}
        </Switch>
        <ToastContainer
          position='bottom-center'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
      </Router>
    </div>
  )
}
