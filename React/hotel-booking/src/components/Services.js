import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa'
import { Title } from 'components'

const services = [
  {
    icon: <FaCocktail />,
    title: 'Free Cocktails',
    info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?'
  },
  {
    icon: <FaHiking />,
    title: 'Endless Hiking',
    info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?'
  },
  {
    icon: <FaShuttleVan />,
    title: 'Free Shuttle',
    info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?'
  },
  {
    icon: <FaBeer />,
    title: 'Strongest Beer',
    info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?'
  }
]

export const Services = () => (
  <section className='services'>
    <Title title='services' />
    <div className='services-center'>
      {services.map(({ icon, title, info }) => (
        <article key={title} className='service'>
          <span>{icon}</span>
          <h6>{title}</h6>
          <p>{info}</p>
        </article>
      ))}
    </div>
  </section>
)
