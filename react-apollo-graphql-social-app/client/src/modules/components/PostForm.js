// Форма для добавления поста

// Хук Apollo
import { useMutation } from '@apollo/client'
// Semantic
import { Button, Form } from 'semantic-ui-react'
// Кастомный хук для работы с формой
import { useForm } from '../utils'
// Запрос и мутация GraphQL
import { FETCH_POSTS_QUERY, CREATE_POST_MUTATION } from '../graphql'

export const PostForm = () => {
  // Извлекаем средства для работы с формой
  const { formData, handleChange, handleSubmit } = useForm(createPostCb, {
    body: ''
  })

  // Получаем функцию для создание поста и ошибку от сервера
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    // Передаем данные из формы серверу
    variables: formData,
    // В случае успешного выполнения мутации
    update(proxy, result) {
      // Получаем посты
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      })
      // и обновляем их
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts]
        }
      })
      formData.body = ''
    }
  })

  // Хак, обусловленный hoisting
  function createPostCb() {
    createPost()
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>Создать пост:</h2>
        <Form.Field>
          <Form.Input
            placeholder='Пост...'
            name='body'
            value={formData.body}
            onChange={handleChange}
            error={error}
          />
        </Form.Field>
        <Button
          type='submit'
          color='teal'
          disabled={formData.body.trim() === ''}
        >
          Добавить
        </Button>
      </Form>
      {/* Ошибки */}
      {error && (
        <div className='ui error message' style={{ marginBottom: 20 }}>
          <ul className='list'>{error.message}</ul>
        </div>
      )}
    </>
  )
}
