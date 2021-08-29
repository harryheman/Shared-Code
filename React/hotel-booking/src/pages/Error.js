import { Link } from 'react-router-dom'
import { Hero, Banner } from 'components'

export const Error = () => (
  <Hero>
    <Banner title='404' subtitle='page not found'>
      <Link path='/' className='btn-primary'>
        return home
      </Link>
    </Banner>
  </Hero>
)
