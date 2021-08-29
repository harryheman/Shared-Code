import { selectorFamily, useRecoilValue } from 'recoil'
import axios from 'axios'
import { Container, List } from 'semantic-ui-react'

import { userAtom } from '../userAtom'

import { SERVER } from '../constant'
import { sleep } from '../util'

const todosQuery = selectorFamily({
  key: 'todosQuery',
  get: (userId) => async () => {
    await sleep(1500)
    try {
      const { data } = await axios.get(`${SERVER}/${userId}/todos?_limit=3`)
      return data
    } catch (error) {
      throw error
    }
  }
})

export const Todos = () => {
  const userId = useRecoilValue(userAtom)
  const todos = useRecoilValue(todosQuery(userId))

  return (
    <Container style={{ margin: '.6rem' }}>
      <h3>Todos</h3>
      <List divided style={{ width: '300px' }}>
        {todos.map((todo) => (
          <List.Item key={todo.id}>
            <List.Content>{todo.title}</List.Content>
          </List.Item>
        ))}
      </List>
    </Container>
  )
}
