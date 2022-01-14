import { useContext } from 'react'
import { useRouteMatch } from 'react-router-dom'

import { ArtistsContext } from 'context'

import { List, TopBtn } from 'components'

export function Favourite() {
  const [artists] = useContext(ArtistsContext)
  const favouriteArtists = artists.filter((a) => a.like)
  const match = useRouteMatch()

  return (
    <>
      <h2 className='title'>Избранное</h2>
      {favouriteArtists.length > 0 ? (
        <List artists={favouriteArtists} match={match} />
      ) : (
        <h3 className='title'>Здесь пока пусто</h3>
      )}
      {favouriteArtists.length > 6 ? <TopBtn /> : ''}
    </>
  )
}
