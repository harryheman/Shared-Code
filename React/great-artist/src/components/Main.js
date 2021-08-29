import { Switch, Route } from 'react-router-dom'
import { routes } from 'data'

export default function Main() {
  return (
    <main className='main'>
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Switch>
    </main>
  )
}
