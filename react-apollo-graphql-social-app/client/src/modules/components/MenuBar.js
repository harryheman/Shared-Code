// Панель навигации

// Хуки React
import { useState, useEffect } from 'react'
// Средство для маршрутизации и хук Router
import { Link, useLocation } from 'react-router-dom'
// Semantic
import { Menu } from 'semantic-ui-react'
// Утилита для извлечения значений из контекста
import { useAuthContext } from '../context/auth'

export const MenuBar = () => {
  // Получаем пользователя и функцию для выхода из системы из контекста
  const { user, logout } = useAuthContext()

  // Получаем и преобразуем текущую локацию
  const { pathname } = useLocation()
  const path = pathname === '/' ? 'home' : pathname.slice(1)

  // Состояние активной ссылки
  const [active, setActive] = useState(path)

  // Обновляем состояние активной ссылки при изменении локации
  useEffect(() => {
    setActive(path)
  }, [pathname])

  // Функция для изменения состояния активной ссылки
  const handleClick = (_, { name }) => {
    setActive(name)
  }

  const menuBar = user ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item name={user.username} active as={Link} to='/' />

      <Menu.Menu position='right'>
        <Menu.Item name='logout' onClick={logout}>
          Выйти
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='home'
        active={active === 'home'}
        onClick={handleClick}
        as={Link}
        to='/'
      >
        Главная
      </Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={active === 'login'}
          onClick={handleClick}
          as={Link}
          to='/login'
        >
          Войти
        </Menu.Item>
        <Menu.Item
          name='register'
          active={active === 'register'}
          onClick={handleClick}
          as={Link}
          to='/register'
        >
          Регистрация
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )

  return menuBar
}
