// Домашняя/главная страница

// Хуки React
import { useState, useEffect } from 'react'
// Хук Apollo
import { useQuery } from '@apollo/client'
// Semantic
import { Grid, Transition } from 'semantic-ui-react'
// Компоненты
import { PostCard, PostForm } from '../components'
// Утилита для извлечения значений из контекста
import { useAuthContext } from '../context/auth'
// Индикатор загрузки
import { Loader } from '../utils'
// Запрос GraphQL
import { FETCH_POSTS_QUERY } from '../graphql'

export const Home = () => {
  // Состояние для постов
  const [posts, setPosts] = useState([])
  // Получаем посты от сервера
  const { data } = useQuery(FETCH_POSTS_QUERY)

  useEffect(() => {
    if (data) {
      setPosts(data.getPosts)
    }
  })

  // Получаем пользователя из контекста
  const { user } = useAuthContext()

  if (!data) return <Loader />

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Последние посты</h1>
      </Grid.Row>
      <Grid.Row>
        {/* Добавлять посты может только зарегистрированный пользователь */}
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        <Transition.Group>
          {posts &&
            posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  )
}
