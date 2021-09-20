import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateContext, S, A } from 'context'
import { useHistory } from 'react-router-dom'

export const Subtotal = () => {
  const history = useHistory()

  const [{ cart }, dispatch] = useStateContext()

  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({cart.length} items): <strong>{value}</strong>
            </p>
          </>
        )}
        value={S.getTotalPrice(cart)}
        decimalScale={2}
        displayType='text'
        thousandSeparator={true}
        prefix='$'
      />

      <button
        onClick={() => {
          dispatch(A.setDrawer(false))
          history.push('/payment')
        }}
      >
        Proceed to checkout
      </button>
    </div>
  )
}
