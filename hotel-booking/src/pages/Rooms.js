import { Link } from 'react-router-dom'
import { Hero, Banner, RoomContainer } from 'components'

export const Rooms = () => (
  <>
    <Hero className='roomsHero'>
      <Banner title='our rooms'>
        <Link to='/' className='btn-primary'>
          return home
        </Link>
      </Banner>
    </Hero>
    <RoomContainer />
  </>
)
