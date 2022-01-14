import { lazy, Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Header, Footer } from 'components'

import { UrlProvider, ArtistsProvider } from 'context'

const Main = lazy(() => import('components/Main'))

function App() {
  return (
    <>
      <UrlProvider>
        <ArtistsProvider>
          <Router>
            <Header />
            <Suspense fallback={<h2 className='title'>Загрузка...</h2>}>
              <Main />
            </Suspense>
          </Router>
        </ArtistsProvider>
      </UrlProvider>
      <Footer />
    </>
  )
}

export default App
