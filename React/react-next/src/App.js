import { Suspense, SuspenseList } from 'react'
import { useSetRecoilState } from 'recoil'
import { ErrorBoundary } from 'react-error-boundary'

import { Container } from 'semantic-ui-react'

import { userAtom } from './modules/userAtom'

import {
  User,
  Posts,
  Todos,
  Buttons,
  ErrorFallback
} from './modules/components'
import { Spinner } from './modules/Spinner'

const containerStyles = {
  margin: '.6rem 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

export default function App() {
  const setUserId = useSetRecoilState(userAtom)

  const resetError = () => {
    setUserId(1)
  }

  return (
    <Container style={containerStyles}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={resetError}>
        <Buttons />
        {/* <SuspenseList revealOrder='forwards'> */}
        <Suspense fallback={<Spinner />}>
          <User />
          <Suspense fallback={<Spinner />}>
            <Todos />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <Posts />
          </Suspense>
        </Suspense>
        {/* </SuspenseList> */}
      </ErrorBoundary>
    </Container>
  )
}
