// Кнопка для удаления поста или комментария

// Хук React
import { useState } from 'react'
// Хук Apollo
import { useMutation } from '@apollo/client'
// Semantic
import { Button, Confirm, Icon } from 'semantic-ui-react'
// Всплывающая подсказка
import { MyPopup } from '../utils'
// Запрос и мутации GraphQL
import {
  FETCH_POSTS_QUERY,
  DELETE_POST_MUTATION,
  DELETE_COMMENT_MUTATION
} from '../graphql'

// Функция принимает id поста и комментария
export const DeleteButton = ({ postId, commentId, cb }) => {
  // Состояние модульного окна для подтверждения удаления поста или комментария
  const [confirmOpen, setConfirmOpen] = useState(false)

  // Определяем мутацию по наличию id комментария.
  // Если таковой имеется, значит, мы удаляем комментарий, иначе, мы удаляем пост
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

  // Получаем соответствующую функцию от сервера
  const [deletePostOrComment] = useMutation(mutation, {
    // Передаем id поста и комментария серверу
    variables: {
      postId,
      commentId
    },
    // В случае успешного выполнения мутации
    update(proxy) {
      // Закрываем модальное окно
      setConfirmOpen(false)

      // Если мы удаляем пост
      if (!commentId) {
        // Получаем посты
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        })
        // Обновляем их
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: data.getPosts.filter((post) => post.id !== postId)
          }
        })
      }
      // Выполняем колбек:
      // перенаправление на главную страницу при удалении отображаемого поста
      if (cb) cb()
    }
  })

  return (
    <>
      <MyPopup content={commentId ? 'Удалить комментарий' : 'Удалить пост'}>
        <Button
          as='div'
          color='red'
          floated='right'
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name='trash' />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        content='Вы уверены?'
        cancelButton='Отмена'
        confirmButton='Удалить'
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
        style={{ maxWidth: '480px' }}
      />
    </>
  )
}
