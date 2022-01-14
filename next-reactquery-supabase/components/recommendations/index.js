import Link from 'next/link'
import { useReccomendations } from 'hooks'
import { MovieCard } from './MovieCard'
import { Loader } from 'components'

export const Recommendations = () => {
  const { data, isSuccess, isLoading } = useReccomendations()
  console.log(data)

  if (isLoading) {
    return (
      <div className='h-screen grid place-items-center'>
        <Loader height={200} width={200} />
      </div>
    )
  }

  return (
    <div>
      <h2 className='text-3xl my-4'>Your recommendations</h2>
      <hr />
      {isSuccess && !data.length && (
        <div className='mt-20 text-xl grid place-items-center'>
          <p>You have no recommendations yet.</p>
          <p>
            <span className='cursor-pointer text-blue-500'>
              <Link href='/search'>Search</Link>
            </span>
            <span>{` `}for movies and add them to your recommendations.</span>
          </p>
        </div>
      )}
      {isSuccess && (
        <div className='grid grid-cols-3 gap-x-4 gap-y-4'>
          {data.map(({ movies: { movie_id, title, poster_path } }) => (
            <MovieCard key={movie_id} title={title} poster_path={poster_path} />
          ))}
        </div>
      )}
    </div>
  )
}
