import { useAppContext } from 'context'
import { Room } from 'components'

export const RoomsList = ({ rooms }) => {
  const { sortedRooms } = useAppContext()

  if (!sortedRooms.length) {
    return (
      <div className='empty-search'>
        <h3>unfortunately no rooms matched your search parameters</h3>
      </div>
    )
  }

  return (
    <section className='roomlist'>
      <div className='roomlist-center'>
        {sortedRooms.map((r) => (
          <Room key={r.id} room={r} />
        ))}
      </div>
    </section>
  )
}
