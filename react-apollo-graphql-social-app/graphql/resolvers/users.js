// Пользовательские операции

// Утилита для шифрования
const bcrypt = require('bcryptjs')
// Утилита для генерации токена
const jwt = require('jsonwebtoken')
// Кастомная ошибка пользовательского ввода
const { UserInputError } = require('apollo-server')

// Утилиты для валидации
const {
  validateRegisterInput,
  validateLoginInput
} = require('../../utils/validators')
// Соль, используемая для шифрования
const { SECRET } = require('../../config')
// Модель пользователя
const User = require('../../models/User')

// Утилита для генерации токена
const generateToken = (user) =>
  // Для генерации токена используется id, имя и email пользователя
  // Мы не можем включить в токен аватар,
  // поскольку строка получится слишком длинной из-за преобразования изображения в строку в формате base64
  jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email
    },
    SECRET,
    {
      // Время, в течение которого токен считается действительным (1 час)
      expiresIn: '1h'
    }
  )

module.exports = {
  // Мутации - операции по изменению "состояния" пользователей
  Mutation: {
    // Авторизация
    async login(_, { username, password }) {
      // Выполняем валидацию введенных пользователем данных
      const { valid, errors } = validateLoginInput(username, password)

      if (!valid) throw new UserInputError('Ошибки', { errors })

      // Получаем пользователя из БД по имени
      const user = await User.findOne({ username })

      if (!user) {
        errors.general = 'Пользователь не найден'
        throw new UserInputError('Пользователь не найден', { errors })
      }

      // Проверяем пароль, сравнивая пароль, введенный пользователем, и пароль из БД
      const match = await bcrypt.compare(password, user.password)

      if (!match) {
        errors.general = 'Неправильный пароль'
        throw new UserInputError('Неправильный пароль', { errors })
      }

      // Создаем токен
      const token = generateToken(user)

      // Возвращаем данные пользователя, его id и токен
      return {
        ...user._doc,
        id: user._id,
        token
      }
    },
    // Регистрация
    async register(
      _,
      { registerInput: { username, avatar, email, password, confirmPassword } }
    ) {
      // Выполняем валидацию
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      )

      if (!valid) {
        throw new UserInputError('Ошибки', { errors })
      }

      // Пытаемся найти пользователя с таким email
      const user = await User.findOne({ email })

      if (user)
        throw new UserInputError('Email занят', {
          errors: {
            email: 'Данный email занят'
          }
        })

      // Шифруем пароль
      password = await bcrypt.hash(password, 12)

      // Создаем пользователя
      const newUser = new User({
        username,
        avatar,
        email,
        password,
        confirmPassword,
        createdAt: new Date().toISOString()
      })

      // Сохраняем пользователя в БД
      const res = await newUser.save()

      // Создаем токен
      const token = generateToken(res)

      // Возвращаем данные пользователя, его id и токен
      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}
