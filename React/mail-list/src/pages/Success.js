import { Link, useHistory } from 'react-router-dom'
import { Container, Button } from 'semantic-ui-react'

import { Spinner, useDeferredRoute, useTimeout } from '../hooks'

function Success() {
  const { loading } = useDeferredRoute(500)
  const history = useHistory()

  const redirectToHomePage = () => {
    history.push('/')
  }

  useTimeout(redirectToHomePage, 3000)

  if (loading) return <Spinner />

  return (
    <Container>
      <h2>Спасибо за подписку!</h2>
      <h3>Сейчас вы будете перенаправлены на главную страницу</h3>
      <Button color='teal' as={Link} to='/'>
        На главную
      </Button>
    </Container>
  )
}

export default Success
