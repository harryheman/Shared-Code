import { Home, Login, Checkout, Orders, Payment } from 'pages'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe(process.env.REACT_APP_PK_TEST)

const StripePayment = () => (
  <Elements stripe={promise}>
    <Payment />
  </Elements>
)

export const routes = [
  {
    path: '/',
    Component: Home,
    exact: true
  },
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/checkout',
    Component: Checkout
  },
  {
    path: '/orders',
    Component: Orders
  },
  {
    path: '/payment',
    Component: StripePayment
  }
]
