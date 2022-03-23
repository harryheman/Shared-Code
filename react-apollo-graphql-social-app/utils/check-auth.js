// Утилита для проверки аутентификации

const jwt = require('jsonwebtoken')
// "Кастомная" ошибка аутентификации
const { AuthenticationError } = require('apollo-server')

// "Соль", которая использовалась для шифрования
const { SECRET } = require('../config')

module.exports = (context) => {
  // context = { headers }
  // Получаем HTTP-заголовок с информацией об аутентификации
  const authHeader = context.req.headers.authorization

  if (authHeader) {
    // Bearer [token]
    // Получаем токен
    const token = authHeader.split('Bearer ')[1]

    if (token) {
      try {
        // Проверяем аутентификацию
        const user = jwt.verify(token, SECRET)
        return user
      } catch (err) {
        throw new AuthenticationError('Неправильный/Устаревший токен')
      }
    }

    throw new Error("Токен аутентификации должен иметь вид 'Bearer [token]'")
  }
  throw new Error('Должен быть предоставлен HTTP-заголовок "Authorization"')
}
