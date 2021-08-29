import { useState } from 'react'
import { useMovies } from 'hooks'
import { SearchResultItem } from './SearchResultItem'
import { Loader } from 'components'

export const Search = () => {
  const [query, setQuery] = useState('')
  const { refetch, isFetching, data, isSuccess, isIdle } = useMovies(query)

  return (
    <div className='mt-20 text-xl flex flex-col items-center'>
      <div className='flex'>
        <input
          className='border shadow px-8 py-2 rounded focus:outline-none'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className='bg-blue-500 py-2 px-4 shadow rounded text-white w-32'
          onClick={() => refetch()}
        >
          {isFetching ? (
            <span>
              <Loader height={30} width={30} />
            </span>
          ) : (
            `Search`
          )}
        </button>
      </div>
      <div className='mt-10'>
        {isSuccess && (
          <div className='grid place-items-center'>
            {data?.results
              .sort((a, b) => b.popularity - a.popularity)
              .map((movie, index) => (
                <SearchResultItem movie={movie} key={index} />
              ))}
          </div>
        )}
      </div>
      {isSuccess && !data?.results.length && (
        <div className='mt-10'>
          <p>No results found</p>
        </div>
      )}
      {isIdle && <div className='mt-10'>Search for a movie</div>}
    </div>
  )
}
