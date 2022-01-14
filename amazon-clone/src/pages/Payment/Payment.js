import './Payment.css'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import simpleFetch from 'very-simple-fetch'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import { CheckoutProduct } from 'components'
import { useStateContext, S, A } from 'context'
import { db } from 'fb'

simpleFetch.baseUrl = 'http://localhost:5000/payment/create'

export const Payment = () => {
  const history = useHistory()

  const [{ cart, user }, dispatch] = useStateContext()

  const stripe = useStripe()
  const elements = useElements()

  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)

  const [secret, setSecret] = useState('')

  useEffect(() => {
    if (user) {
      const getSecret = async () => {
        try {
          const { data } = await simpleFetch(
            `?total=${S.getTotalPrice(cart) * 100}`
          )
          setSecret(data.secret)
        } catch (err) {
          console.error(err)
        }
      }
      getSecret()
    } else {
      history.push('/login')
    }
  }, [cart, user, history])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)

    stripe
      .confirmCardPayment(secret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          return setError(error.message)
        }
        console.log(paymentIntent)

        db.collection('orders').doc(paymentIntent.id).set({
          userId: user.uid,
          cart,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        })

        setSuccess(true)
        setError(null)
        setLoading(false)

        dispatch(A.clearCart())

        history.push('/orders')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const change = (e) => {
    setDisabled(e.empty || e.error)
    setError(e.error ? e.error.message : null)
  }

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout (<Link to='/checkout'>{cart.length} items</Link>)
        </h1>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment__items'>
            {cart.length > 0 ? (
              cart.map((product) => (
                <CheckoutProduct
                  key={product.id}
                  product={product}
                  hideButton={true}
                />
              ))
            ) : (
              <p>No items</p>
            )}
          </div>
        </div>
        {cart.length > 0 && (
          <div className='payment__section'>
            <div className='payment__title'>
              <h3>Payment methods</h3>
            </div>
            <div className='payment__details'>
              <form onSubmit={submit}>
                <CardElement onChange={change} />
                <div className='payment__priceContainer'>
                  <CurrencyFormat
                    renderText={(value) => <h3>Order total: {value}</h3>}
                    value={S.getTotalPrice(cart)}
                    decimalScale={2}
                    displayType='text'
                    thousandSeparator={true}
                    prefix='$'
                  />
                  <button disabled={disabled || loading || success}>
                    <span>{loading ? <p>Loading...</p> : 'Buy now'}</span>
                  </button>
                </div>
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
