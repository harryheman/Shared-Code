import './Orders.css'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { db } from 'fb'
import { useStateContext } from 'context'
import { Product } from 'components'

export const Orders = () => {
  const history = useHistory()

  const [{ user }] = useStateContext()

  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (user) {
      db.collection('orders')
        .where('userId', '==', user.uid)
        .orderBy('created', 'desc')
        .onSnapshot((snap) => {
          const orders = snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          }))
          setOrders(orders)
        })
    } else {
      history.push('/login')
    }
  }, [user, history])

  console.log(orders)

  return (
    <div className='orders'>
      <h1>Your orders</h1>
      {orders.map((order) => (
        <div key={order.id}>
          <h3>Order: {order.id}</h3>
          <p>Amount: {order.data.amount}</p>
          <div className='orders__container'>
            {order.data.cart.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
