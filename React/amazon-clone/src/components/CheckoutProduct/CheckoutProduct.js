import './CheckoutProduct.css'
import { useStateContext, A } from 'context'

export const CheckoutProduct = ({ product, hideButton }) => {
  const [_, dispatch] = useStateContext()

  const { id, title, price, rating, image } = product

  return (
    <div className='checkoutProduct'>
      <img src={image} alt='' className='checkoutProduct__image' />
      <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>{title}</p>
        <p className='checkoutProduct__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='checkoutProduct__rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={() => dispatch(A.removeFromCart(id))}>
            Remove from cart
          </button>
        )}
      </div>
    </div>
  )
}
