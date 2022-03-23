// Страница регистрации

// Хук React
import { useState } from 'react'
// Средство для маршрутизации
import { Redirect } from 'react-router-dom'
// Хук Apollo
import { useMutation } from '@apollo/client'
// Semantic
import { Button, Form } from 'semantic-ui-react'
// Утилита для извлечения значений из контекста
import { useAuthContext } from '../context/auth'
// Кастомный хук для работы с формой
import { useForm } from '../utils'
// Мутация GraphQL
import { REGISTER_USER } from '../graphql'
// Индикатор загрузки и утилита для преобразования изображения в строку в формате base64
import { Loader, convertImg } from '../utils'

export const Register = () => {
  // Состояние для ошибок
  const [errors, setErrors] = useState({})
  // Получаем контекст
  const context = useAuthContext()

  // Извлекаем средства для работы с формой
  const { formData, handleChange, handleSubmit } = useForm(registerUser, {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    avatar: ''
  })

  // Получаем функцию для регистрации и статус загрузки от сервера
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    // Передаем данные из формы на сервер
    variables: formData,
    // При успешном выполнении мутации
    update(_, { data: { register: formData } }) {
      // Выполняем авторизацию
      context.login(formData)
      // и перенаправление на главную страницу
      return <Redirect to='/' />
    },
    // В случае возникновения ошибки
    onError(err) {
      // Обновляем состояние ошибок
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    }
  })

  // Хак, обусловленный hoisting
  function registerUser() {
    addUser()
  }

  // Функция для преобразования аватара в строку
  async function uploadAvatar({ target: { files, name } }) {
    const img = files[0]
    const str = await convertImg(img)
    handleChange({ target: { name, value: str } })
  }

  if (loading) return <Loader />

  return (
    <div className='form-box'>
      <Form onSubmit={handleSubmit} noValidate>
        <h1>Регистрация</h1>
        <Form.Input
          label='Имя'
          placeholder='Имя...'
          name='username'
          type='text'
          value={formData.username}
          onChange={handleChange}
          error={errors.username ? true : false}
        />
        <Form.Input
          label='Аватар'
          name='avatar'
          type='file'
          onChange={uploadAvatar}
        />
        <Form.Input
          label='Email'
          placeholder='Email...'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          error={errors.email ? true : false}
        />
        <Form.Input
          label='Пароль'
          placeholder='Пароль...'
          name='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          error={errors.password ? true : false}
        />
        <Form.Input
          label='Подтвердите пароль'
          placeholder='Пароль...'
          name='confirmPassword'
          type='password'
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword ? true : false}
        />
        <Button primary type='submit'>
          Зарегистрироваться
        </Button>
      </Form>
      {/* Ошибки */}
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
