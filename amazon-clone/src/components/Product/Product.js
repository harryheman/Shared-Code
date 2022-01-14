import './Product.css'
import { useStateContext, A } from 'context'

export const Product = ({ product }) => {
  const [_, dispatch] = useStateContext()

  const { title, image, price, rating } = product

  return (
    <div className='product'>
      <div className='product__info'>
        <p>{title}</p>
        <p className='product__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='product__rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt='' />

      <button onClick={() => dispatch(A.addToCart(product))}>
        Add to cart
      </button>
    </div>
  )
}
