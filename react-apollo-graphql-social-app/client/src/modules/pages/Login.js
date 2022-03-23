// Страница авторизации

// Хук React
import { useState } from 'react'
// Средство для маршрутизации
import { Redirect } from 'react-router-dom'
// Хук Apollo
import { useMutation } from '@apollo/client'
// Semantic
import { Button, Form } from 'semantic-ui-react'
// Утилита для извлечения значений из контекста
import { useAuthContext } from '../context'
// Кастомный хук для работы с формой
import { useForm } from '../utils'
// Мутация GraphQL
import { LOGIN_USER } from '../graphql'
// Индикатор загрузки
import { Loader } from '../utils'

export const Login = () => {
  // Состояние для ошибок
  const [errors, setErrors] = useState({})
  // Получаем контекст
  const context = useAuthContext()

  // Извлекаем средства для работы с формой
  const { formData, handleChange, handleSubmit } = useForm(loginUserCb, {
    username: '',
    password: ''
  })

  // Получаем функцию для авторизации и статус загрузки от сервера
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    // Передаем данные из формы на сервер
    variables: formData,
    // После успешного выполнения мутации
    update(_, { data: { login: formData } }) {
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
  function loginUserCb() {
    loginUser()
  }

  if (loading) return <Loader />

  // Определяем пустые поля для блокировки кнопки
  const isEmpty =
    formData.username.trim() === '' || formData.password.trim() === ''

  return (
    <div className='form-box'>
      <Form onSubmit={handleSubmit} noValidate>
        <h1>Авторизация</h1>
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
          label='Пароль'
          placeholder='Пароль...'
          name='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          error={errors.password ? true : false}
        />
        <Button primary type='submit' disabled={isEmpty}>
          Войти
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
