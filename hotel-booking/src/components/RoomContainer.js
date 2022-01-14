import { useAppContext } from 'context'
import { RoomsList, RoomsFilter, Loader } from 'components'

export const RoomContainer = () => {
  const { loading } = useAppContext()

  if (loading) return <Loader />

  return (
    <>
      <RoomsFilter />
      <RoomsList />
    </>
  )
}
