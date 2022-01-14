import { unstable_useTransition, unstable_useDeferredValue } from 'react'
import { useRecoilState } from 'recoil'
import { Container, Button } from 'semantic-ui-react'

import { userAtom } from '../userAtom'

export const Buttons = () => {
  const [userId, setUserId] = useRecoilState(userAtom)

  const [startTransition, isPending] = unstable_useTransition({
    timeoutMs: 2000
  })

  const fetchPreviousUser = () => {
    setUserId(userId - 1)
  }

  const fetchNextUser = () => {
    startTransition(async () => {
      setUserId(userId + 1)
    })
  }

  const generateError = () => {
    setUserId(0)
  }

  const deferredUserId = unstable_useDeferredValue(userId, { timeoutMs: 2000 })

  const errorStyles = {
    position: 'absolute',
    top: '1rem',
    left: '1rem'
  }

  return (
    <Container style={{ margin: '.6rem' }}>
      <h3>Current User ID: {deferredUserId}</h3>
      <Button
        primary
        disabled={userId === 1 || isPending}
        onClick={fetchPreviousUser}
      >
        Previous
      </Button>
      <Button primary disabled={userId === 4} onClick={fetchNextUser}>
        Next
      </Button>
      {isPending ? 'Fetching new user...' : ''}
      <Button negative onClick={generateError} style={errorStyles}>
        Error
      </Button>
    </Container>
  )
}
