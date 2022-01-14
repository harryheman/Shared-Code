import { Link, useHistory } from 'react-router-dom'
import { Container, Button } from 'semantic-ui-react'

import { Spinner, useDeferredRoute, useTimeout } from '../hooks'

function NotFound() {
  const { loading } = useDeferredRoute(500)
  const history = useHistory()

  const redirectToHomePage = () => {
    history.push('/')
  }

  useTimeout(redirectToHomePage, 2000)

  if (loading) return <Spinner />

  return (
    <Container>
      <h2>Страница отсутствует</h2>
      <h3>Сейчас вы будете перенаправлены на главную страницу</h3>
      <Button color='teal' as={Link} to='/'>
        На главную
      </Button>
    </Container>
  )
}

export default NotFound
