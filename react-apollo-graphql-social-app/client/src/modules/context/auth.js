// Контекст с информацией об аутентификации

// Хуки и утилита для создания контекста
import { createContext, useReducer, useContext } from 'react'
// Утилита для расшифровки токена
import jwtDecode from 'jwt-decode'

// Константы
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

// Начальное состояние
const initialState = {
  user: null
}

// Токен хранится в локальном хранилище
if (window.localStorage.getItem('jwtToken')) {
  // Декодируем токен
  // Получаем id, имя и пароль пользователя
  const decodedToken = jwtDecode(
    JSON.parse(window.localStorage.getItem('jwtToken'))
  )

  // Если срок действия токена (expiresIn, exp) истек,
  // удаляем его из хранилища,
  if (decodedToken.exp * 1000 < Date.now()) {
    window.localStorage.removeItem('jwtToken')
  } else {
    // иначе, добавляем расшифрованный токен в начальное состояние
    initialState.user = decodedToken
  }
}

// Создаем контекст
const AuthContext = createContext()

// Создаем редуктор
const authReducer = (state, { type, payload }) => {
  switch (type) {
    case LOGIN: {
      return {
        ...state,
        user: payload
      }
    }
    case LOGOUT: {
      return {
        ...state,
        user: null
      }
    }
    default:
      return state
  }
}

// Создаем и экспортируем провайдер аутентификации
export const AuthProvider = ({ children }) => {
  // Получаем состояние и диспетчера
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Функция авторизации
  const login = (userData) => {
    // Записываем токен в локальное хранилище
    window.localStorage.setItem('jwtToken', JSON.stringify(userData.token))

    dispatch({
      type: LOGIN,
      payload: userData
    })
  }

  // Функция выхода из системы
  const logout = () => {
    // Удаляем токен из локального хранилища
    window.localStorage.removeItem('jwtToken')
    dispatch({ type: LOGOUT })
  }

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Утилита для извлечения значений из контекста
export const useAuthContext = () => useContext(AuthContext)
