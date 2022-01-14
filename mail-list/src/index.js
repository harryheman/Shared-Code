import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Spinner } from './hooks'

import 'semantic-ui-css/semantic.min.css'
import './index.css'

const Home = lazy(() => import('./pages/Home'))
const Subscribe = lazy(() => import('./pages/Subscribe'))
const Unsubscribe = lazy(() => import('./pages/Unsubscribe'))
const Success = lazy(() => import('./pages/Success'))
const NotFound = lazy(() => import('./pages/NotFound'))

ReactDOM.render(
  <Suspense fallback={<Spinner />}>
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/subscribe' component={Subscribe} />
        <Route path='/unsubscribe/:email' component={Unsubscribe} />
        <Route path='/success' component={Success} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Suspense>,
  document.getElementById('root')
)
