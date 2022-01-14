import './Home.css'
import { Product } from 'components'
import { products } from './products'

export const Home = () => {
  return (
    <div className='home'>
      <div className='home__container'>
        <img
          src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
          alt=''
          className='home__image'
        />

        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
