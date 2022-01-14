import { Link } from 'react-router-dom'
import { Container, Button } from 'semantic-ui-react'

import { Spinner, useDeferredRoute } from '../hooks'

function Home() {
  const { loading } = useDeferredRoute(1500)

  if (loading) return <Spinner />

  return (
    <Container>
      <h2>Доброго времени суток!</h2>
      <h3>
        Подпишитесь на обновления, <br /> чтобы оставаться в курсе событий!
      </h3>
      <Button color='teal' as={Link} to='/subscribe'>
        Подписаться
      </Button>
    </Container>
  )
}

export default Home
