// Карточка поста

// Хук Router
import { useHistory } from 'react-router-dom'
// Semantic
import { Card, Image } from 'semantic-ui-react'
// Утилита для извлечения значений из контекста
import { useAuthContext } from '../context/auth'
// Компоненты
import { LikeButton } from './LikeButton'
import { DeleteButton } from './DeleteButton'
import { CommentButton } from './CommentButton'
// Утилита для форматирования даты
import { formatDate } from '../utils'

// Функция принимает пост
export const PostCard = ({ post }) => {
  // Извлекаем значения из поста
  const {
    id,
    body,
    username,
    avatar,
    createdAt,
    likeCount,
    likes,
    commentCount
  } = post

  // Получаем пользователя из контекста
  const { user } = useAuthContext()

  // Получаем объект истории
  const history = useHistory()
  // При нажатии на дату поста или на кнопку для комментария
  // выполняем перенаправление на страницу поста
  const showPost = () => {
    history.push(`/posts/${id}`)
  }

  // В качестве аватара устанавливаем либо аватар пользователя, либо дефолтное изображение
  const imgSrc =
    avatar || 'https://react.semantic-ui.com/images/avatar/large/matthew.png'

  return (
    <Card fluid>
      <Card.Content>
        <div className='avatar-box'>
          <Image floated='right' size='mini' src={imgSrc} />
        </div>
        <Card.Header>{username}</Card.Header>
        <Card.Meta onClick={showPost} style={{ cursor: 'pointer' }}>
          {formatDate(createdAt)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      {/* Кнопки для лайка и комментария доступны только зарегистрированным пользователям */}
      {user && (
        <Card.Content extra>
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <CommentButton commentCount={commentCount} onClick={showPost} />
          {/* Удалять посты может только добавивший их пользователь */}
          {user.username === username && <DeleteButton postId={id} />}
        </Card.Content>
      )}
    </Card>
  )
}
