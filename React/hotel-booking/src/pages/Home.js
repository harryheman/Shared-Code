import { Link } from 'react-router-dom'
import { Hero, Banner, Services, FeaturedRooms } from 'components'

export const Home = () => (
  <>
    <Hero>
      <Banner title='luxurious rooms' subtitle='deluxe rooms starting at $299'>
        <Link to='/rooms' className='btn-primary'>
          our rooms
        </Link>
      </Banner>
    </Hero>
    <Services />
    <FeaturedRooms />
  </>
)
