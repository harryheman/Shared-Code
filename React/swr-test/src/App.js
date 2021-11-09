import './App.scss'
import { Switch, Route } from 'react-router-dom'
import { Users, User } from 'components'

const routes = [
  {
    path: '/',
    exact: true,
    component: Users
  },
  {
    path: '/:id',
    component: User
  }
]

export const App = () => {
  return (
    <>
      <Switch>
        {routes.map((routeProps, i) => (
          <Route key={i} {...routeProps} />
        ))}
      </Switch>
    </>
  )
}
