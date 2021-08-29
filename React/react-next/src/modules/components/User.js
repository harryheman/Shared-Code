import { selectorFamily, useRecoilValue } from 'recoil'
import axios from 'axios'
import { Container, Card, Image } from 'semantic-ui-react'

import { userAtom } from '../userAtom'

import { SERVER } from '../constant'
import { sleep } from '../util'

const userQuery = selectorFamily({
  key: 'userQuery',
  get: (userId) => async () => {
    await sleep(500)
    try {
      const { data } = await axios.get(`${SERVER}/${userId}`)
      return data
    } catch (error) {
      throw error
    }
  }
})

export const User = () => {
  const userId = useRecoilValue(userAtom)
  const user = useRecoilValue(userQuery(userId))

  return (
    <Container style={{ margin: '.6rem' }}>
      <h3>Card</h3>
      <Card>
        <Card.Content>
          <Image
            src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
            floated='right'
            size='mini'
          />
          <Card.Header>{user.name}</Card.Header>
          <Card.Meta>
            <span className='date'>{user.username}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <a href='#'>{user.email}</a>
        </Card.Content>
      </Card>
    </Container>
  )
}
