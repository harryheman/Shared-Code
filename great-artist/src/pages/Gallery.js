import { useState, useContext } from 'react'
import { useRouteMatch } from 'react-router-dom'
import SearchInput, { createFilter } from 'react-search-input'

import { ArtistsContext } from 'context'

import { List, TopBtn } from 'components'

export function Gallery() {
  const [artists] = useContext(ArtistsContext)
  const match = useRouteMatch()

  const [searchTerm, setSearchTerm] = useState('')

  function handleChange(term) {
    setSearchTerm(term)
  }

  const filteredArtists = artists.filter(createFilter(searchTerm, 'name'))

  return (
    <>
      <h2 className='title'>Галерея</h2>
      <SearchInput
        onChange={handleChange}
        value={searchTerm}
        className='search_input'
        placeholder='Поиск...'
      />
      {filteredArtists.length > 0 ? (
        <List artists={filteredArtists} match={match} />
      ) : (
        <h3 className='title'>Художника не найдено</h3>
      )}
      {filteredArtists.length > 6 ? <TopBtn /> : ''}
    </>
  )
}
