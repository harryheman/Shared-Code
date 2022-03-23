// Провайдер Apollo

// Основной компонент приложения
import { App } from './App'
// Утилиты для создания провайдера
import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client'
// Утилита для определения контекста
import { setContext } from '@apollo/client/link/context'

// Генерируем URL сервера
const httpLink = new HttpLink({
  uri: 'http://localhost:5000'
})

// Включаем заголовок авторизации в запрос
const authLink = setContext((_, { headers }) => {
  // Получаем токен из локального хранилища
  const token = JSON.parse(window.localStorage.getItem('jwtToken'))

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

// Создаем клиента
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

// Экспортируем провайдер
export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
