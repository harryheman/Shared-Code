import { useAppContext } from 'context'
import { Title } from 'components'

const getUnique = (items, value) =>
  [...new Set(items.map((item) => item[value]))].map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ))

export const RoomsFilter = () => {
  const {
    rooms,
    changeFilter,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets
  } = useAppContext()

  const types = getUnique([{ type: 'all' }, ...rooms], 'type')

  const guests = getUnique(rooms, 'capacity')

  return (
    <div className='filter-container'>
      <Title title='search rooms' />
      <form className='filter-form'>
        {/* type */}
        <div className='form-group'>
          <label htmlFor='type'>type</label>
          <select
            name='type'
            id='type'
            className='form-control'
            value={type}
            onChange={changeFilter}
          >
            {types}
          </select>
        </div>
        {/* guests */}
        <div className='form-group'>
          <label htmlFor='capacity'>guests</label>
          <select
            name='capacity'
            id='capacity'
            className='form-control'
            value={capacity}
            onChange={changeFilter}
          >
            {guests}
          </select>
        </div>
        {/* price */}
        <div className='form-group'>
          <label htmlFor='price'>price</label>
          <input
            type='range'
            name='price'
            id='price'
            className='form-control'
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={changeFilter}
          />
          <span className='price-tooltip'>{price}</span>
        </div>
        {/* size */}
        <div className='form-group'>
          <label htmlFor='price'>size</label>
          <div className='size-inputs'>
            <input
              type='number'
              name='minSize'
              id='size'
              className='size-input'
              value={minSize}
              onChange={changeFilter}
            />
            <input
              type='number'
              name='maxSize'
              className='size-input'
              value={maxSize}
              onChange={changeFilter}
            />
          </div>
        </div>
        {/* extras */}
        <div className='form-group'>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='breakfast'
              id='breakfast'
              checked={breakfast}
              onChange={changeFilter}
            />
            <label htmlFor='breakfast'>breakfast</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='pets'
              id='pets'
              checked={pets}
              onChange={changeFilter}
            />
            <label htmlFor='pets'>pets</label>
          </div>
        </div>
      </form>
    </div>
  )
}
