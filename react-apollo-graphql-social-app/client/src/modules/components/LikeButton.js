// Кнопка для лайка

// Хуки React
import { useEffect, useState } from 'react'
// Хук Apollo
import { useMutation } from '@apollo/client'
// Semantic
import { Button, Label, Icon } from 'semantic-ui-react'
// Всплывающая подсказка
import { MyPopup } from '../utils'
// Мутация GraphQL
import { LIKE_POST_MUTATION } from '../graphql'

// Функция принимает пользователя и пост
export const LikeButton = ({ user, post }) => {
  // Извлекаем значения из поста
  const { id, likeCount, likes } = post
  // Состояние лайка
  const [liked, setLiked] = useState(false)

  // Инициализируем состояние лайка на основе информации о пользователе
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true)
    } else setLiked(false)
  }, [user, likes])

  // Получаем функцию для лайка поста от сервера
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    // Передаем серверу id поста
    variables: { postId: id }
  })

  // Стилизуем кнопку на основе состояния
  const likeButton = liked ? (
    <Button color='teal'>
      <Icon name='heart' />
    </Button>
  ) : (
    <Button color='teal' basic>
      <Icon name='heart' />
    </Button>
  )

  return (
    <Button as='div' labelPosition='right' onClick={likePost}>
      <MyPopup content={liked ? 'Не нравится' : 'Нравится'}>
        {likeButton}
      </MyPopup>
      <Label basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
  )
}
