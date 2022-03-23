// Страница поста

// Хуки React
import { useState, useRef } from 'react'
// Хуки Router
import { useParams, useHistory } from 'react-router-dom'
// Хуки Apollo
import { useQuery, useMutation } from '@apollo/client'
// Semantic
import { Card, Form, Grid, Image } from 'semantic-ui-react'
// Компоненты
import { LikeButton, DeleteButton, CommentButton } from '../components'
// Индикатор загрузки и утилита для форматирования времени
import { Loader, formatDate } from '../utils'
// Запрос и мутация GraphQL
import { FETCH_POST_QUERY, CREATE_COMMENT_MUTATION } from '../graphql'
// Утилита для извлечения значений из контекста
import { useAuthContext } from '../context/auth'

export const SinglePost = () => {
  // Извлекаем пользователя из контекста
  const { user } = useAuthContext()
  // Состояние для комментариев
  const [comment, setComment] = useState('')
  // Ссылка на инпут с текстом комментария
  const commentInputRef = useRef(null)

  // Получаем id поста из строки запроса URL
  const { postId } = useParams()

  // Получаем пост от сервера
  const { data } = useQuery(FETCH_POST_QUERY, {
    // Передаем серверу id поста
    variables: {
      postId
    }
  })

  // Получаем функцию для создания комментария от сервера
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    // Передаем серверу id поста и текст комментария
    variables: {
      postId,
      body: comment
    },
    // При успешном выполнении мутации
    update() {
      // Очищаем поле для текста комментария
      setComment('')
      // Снимаем фокус с этого поля
      commentInputRef.current.blur()
    }
  })

  // Получаем объект истории
  const history = useHistory()
  // При удалении отображаемого поста выполняем перенаправление на главную страницу
  // В данном случае return <Redirect to="/" /> не работает
  const deletePost = () => {
    history.push('/')
  }

  if (!data) return <Loader />

  // Извлекаем значения из данных, полученных от сервера
  const {
    id,
    body,
    username,
    avatar,
    createdAt,
    comments,
    likes,
    likeCount,
    commentCount
  } = data.getPost

  // В качестве аватара устанавливаем либо аватар пользователя, либо дефолтное изображение
  const imgSrc =
    avatar || 'https://react.semantic-ui.com/images/avatar/large/matthew.png'

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image src={imgSrc} size='small' float='right' />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{formatDate(createdAt)}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            {/* Кнопки лайка и комментария доступны только зарегистрированным пользователям */}
            {user && (
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <CommentButton
                  commentCount={commentCount}
                  onClick={() => commentInputRef.current.focus()}
                />
                {/* Удалять посты может только добавивший их пользователь */}
                {user.username === username && (
                  <DeleteButton postId={id} cb={deletePost} />
                )}
              </Card.Content>
            )}
          </Card>
          {/* Добавлять комментарии могут только зарегистрированные пользователи */}
          {user && (
            <Card fluid>
              <Card.Content>
                <p>Оставить комментарий</p>
                <Form>
                  <div className='ui action input fluid'>
                    <input
                      type='text'
                      placeholder='Комментарий..'
                      name='comment'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      ref={commentInputRef}
                    />
                    <button
                      type='submit'
                      className='ui button teal'
                      disabled={comment.trim() === ''}
                      onClick={createComment}
                    >
                      Отправить
                    </button>
                  </div>
                </Form>
              </Card.Content>
            </Card>
          )}
          {/* Комментарии */}
          {comments.map((comment) => (
            <Card fluid key={comment.id}>
              <Card.Content>
                {/* Удалять комментарии может только добавивший их пользователь */}
                {user && user.username === comment.username && (
                  <DeleteButton postId={id} commentId={comment.id} />
                )}
                <Card.Header>{comment.username}</Card.Header>
                <Card.Meta>{formatDate(comment.createdAt)}</Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
