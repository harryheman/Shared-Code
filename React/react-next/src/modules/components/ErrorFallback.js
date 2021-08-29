import { Container, Button } from 'semantic-ui-react'

export const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <Container style={{ margin: '.6rem' }}>
    <h3>Something went wrong:</h3>
    <pre>{error.message}</pre>
    <Button color='teal' onClick={resetErrorBoundary}>
      Try again
    </Button>
  </Container>
)
