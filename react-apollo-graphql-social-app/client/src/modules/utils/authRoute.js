// Утилита для приватного роутинга

// Средства для маршрутизации
import { Route, Redirect } from 'react-router-dom'
// Утилита для извлечения данных из контекта
import { useAuthContext } from '../context/auth'

export const AuthRoute = ({ component: Component, ...rest }) => {
  // Получаем пользователя из контекста
  const { user } = useAuthContext()

  // В зависимости от того, авторизован ли пользователь,
  // отображаем те или иные ссылки
  // и выполняем перенаправление на главную страницу после авторизации
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  )
}
