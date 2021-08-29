import { useAppContext } from '../context'

export default function Filters() {
  const { state, dispatch, actions } = useAppContext()
  const { filter } = state

  return (
    <div className='col-3'>
      <h3>Filters</h3>
      {['all', 'active', 'completed'].map((_filter) => (
        <div key={_filter} className='form-check' style={{ textAlign: 'left' }}>
          <input
            id={_filter}
            type='radio'
            checked={_filter === filter}
            onChange={() => dispatch(actions.setFilter(_filter))}
            className='form-check-input'
          />
          <label htmlFor={_filter} className='form-check-label'>
            {_filter.toUpperCase()}
          </label>
        </div>
      ))}
    </div>
  )
}
