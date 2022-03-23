// Основной компонент приложения

// Средства для маршрутизации
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// Semantic
import { Container } from 'semantic-ui-react'
// Компонент
import { MenuBar } from 'modules/components'
// Страницы
import { Home, Login, Register, SinglePost } from 'modules/pages'
// Стили
import 'semantic-ui-css/semantic.min.css'
import './App.css'
// Провайдер аутентификации
import { AuthProvider } from 'modules/context/auth'
// Утилита для приватного роутинга
import { AuthRoute } from 'modules/utils/authRoute'

export const App = () => (
  <Container>
    <AuthProvider>
      <Router>
        <MenuBar />
        <Switch>
          <Route path='/' component={Home} exact />
          <AuthRoute path='/login' component={Login} exact />
          <AuthRoute path='/register' component={Register} exact />
          <Route path='/posts/:postId' component={SinglePost} exact />
        </Switch>
      </Router>
    </AuthProvider>
  </Container>
)
