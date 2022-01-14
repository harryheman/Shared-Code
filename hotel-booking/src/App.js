import './App.css'
import { Switch, Route } from 'react-router-dom'

import { Home, Rooms, SingleRoom, Error } from 'pages'
import { Navbar } from 'components'

export const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/rooms',
    component: Rooms,
    exact: true
  },
  {
    path: '/rooms/:slug',
    component: SingleRoom
  },
  {
    path: '/*',
    component: Error
  }
]

export const App = () => (
  <>
    <Navbar />
    <Switch>
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Switch>
  </>
)
