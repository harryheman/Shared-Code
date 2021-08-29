import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { UrlContext } from 'context'

export function List({ artists, match }) {
  const { imgUrl } = useContext(UrlContext)

  return (
    <ul className='list'>
      {artists.map(({ id, name, date, img }) => (
        <li key={id} className='item'>
          <Link to={`${match.url}/${id}`}>
            <div className='img_box'>
              <img src={`${imgUrl}/${img}`} alt={name} className='img' />
            </div>
            <div className='into_box'>
              <p className='name'>{name}</p>
              <p className='date'>({date})</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
