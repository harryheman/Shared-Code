import { selectorFamily, useRecoilValue } from 'recoil'
import axios from 'axios'
import { Container, Image, List } from 'semantic-ui-react'

import { userAtom } from '../userAtom'

import { SERVER } from '../constant'
import { sleep } from '../util'

const postsQuery = selectorFamily({
  key: 'postsQuery',
  get: (userId) => async () => {
    await sleep(1000)
    try {
      const { data } = await axios.get(`${SERVER}/${userId}/posts?_limit=2`)
      return data
    } catch (error) {
      throw error
    }
  }
})

export const Posts = () => {
  const userId = useRecoilValue(userAtom)
  const posts = useRecoilValue(postsQuery(userId))

  return (
    <Container style={{ margin: '.6rem' }}>
      <h3>Posts</h3>
      <List divided relaxed style={{ maxWidth: '320px' }}>
        {posts.map((post) => (
          <List.Item key={post.id} style={{ display: 'flex' }}>
            <Image
              avatar
              src='https://react.semantic-ui.com/images/avatar/small/matthew.png'
            />
            <List.Content>
              <List.Header>{post.title}</List.Header>
              {post.body}
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Container>
  )
}
