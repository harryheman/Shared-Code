import './Checkout.css'
import { Link } from 'react-router-dom'
import { useStateContext, A } from 'context'
import { CheckoutProduct, Subtotal } from 'components'

export const Checkout = () => {
  const [{ cart, user }, dispatch] = useStateContext()

  return (
    <>
      <Link to='/'>
        <div className='checkout__center'>
          <img
            src='https://miro.medium.com/max/396/0*bVnfVVG7Y7qXQcO1'
            alt=''
            style={{ height: 70, marginTop: 20 }}
            onClick={() => {
              dispatch(A.setDrawer(false))
            }}
          />
        </div>
      </Link>
      <div className='checkout'>
        <div className='checkout__left'>
          <img
            src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
            alt=''
            className='checkout__ad'
          />

          <div>
            <h2>Hello, {user.email}</h2>
            <h3>Your shopping cart</h3>

            {cart.map((product) => (
              <CheckoutProduct key={product.id} product={product} />
            ))}
          </div>
        </div>

        {cart.length && (
          <div className='checkout__right'>
            <Subtotal />
          </div>
        )}
      </div>
    </>
  )
}
