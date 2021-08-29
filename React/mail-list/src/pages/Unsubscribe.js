import { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Container, Button } from 'semantic-ui-react'

import { Spinner, useDeferredRoute } from '../hooks'

function Unsubscribe() {
  const { loading } = useDeferredRoute(1000)
  const [error, setError] = useState(null)
  const { email } = useParams()
  const history = useHistory()

  useEffect(() => {
    if (!email) {
      return history.push('/')
    }

    async function unsubscribe() {
      try {
        const response = await fetch('/.netlify/functions/unsubscribe', {
          method: 'POST',
          body: JSON.stringify(email),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
          const json = await response.json()
          setError(json.error)
        }
      } catch (err) {
        console.error(err)
      }
    }
    unsubscribe()
    // eslint-disable-next-line
  }, [])

  if (loading) return <Spinner />

  return (
    <Container>
      {error ? (
        <h3>{error}</h3>
      ) : (
        <h3>Вы больше не будете получать уведомлений</h3>
      )}
      <Button color='teal' as={Link} to='/'>
        На главную
      </Button>
    </Container>
  )
}

export default Unsubscribe
