import { useAppContext } from 'context'
import { Room, Title, Loader } from 'components'

export const FeaturedRooms = () => {
  const { featuredRooms: rooms, loading } = useAppContext()

  return (
    <section className='featured-rooms'>
      <Title title='featured rooms' />
      <div className='featured-rooms-center'>
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => <Room key={room.id} room={room} />)
        )}
      </div>
    </section>
  )
}
