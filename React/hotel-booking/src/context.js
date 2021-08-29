import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState
} from 'react'
import items from 'data.json'

const AppContext = createContext()

const initialState = {
  rooms: [],
  sortedRooms: [],
  featuredRooms: [],
  loading: true,
  //
  type: 'all',
  capacity: 1,
  price: 0,
  minPrice: 0,
  maxPrice: 0,
  minSize: 0,
  maxSize: 0,
  breakfast: false,
  pets: false
}

const formatData = (items) =>
  items.map((item) => {
    const { id } = item.sys
    const images = item.fields.images.map((img) => img.fields.file.url)

    return { ...item.fields, id, images }
  })

const filterRooms = (items) => {
  let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } =
    items

  let sortedRooms = [...rooms]

  capacity = parseInt(capacity)
  price = parseInt(price)
  // filter by type
  if (type !== 'all') {
    sortedRooms = sortedRooms.filter((r) => r.type === type)
  }

  // by capacity
  if (capacity !== 1) {
    sortedRooms = sortedRooms.filter((r) => r.capacity >= capacity)
  }
  // by price
  sortedRooms = sortedRooms.filter((r) => r.price <= price)
  // by size
  sortedRooms = sortedRooms.filter(
    (r) => r.size >= minSize && r.size <= maxSize
  )
  // by breakfast
  if (breakfast) {
    sortedRooms = sortedRooms.filter(({ breakfast }) => breakfast)
  }
  // by pets
  if (pets) {
    sortedRooms = sortedRooms.filter(({ pets }) => pets)
  }
  //
  return sortedRooms
}

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const rooms = formatData(items)

    const featuredRooms = rooms.filter(({ featured }) => featured === true)
    //
    const maxPrice = Math.max(...rooms.map(({ price }) => price))
    const maxSize = Math.max(...rooms.map(({ size }) => size))
    //
    setState({
      ...state,
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      //
      price: maxPrice,
      maxPrice,
      maxSize
    })
    // eslint-disable-next-line
  }, [])

  const getRoom = useCallback(
    (slug) => state.rooms.find((r) => r.slug === slug),
    [state.rooms]
  )

  const changeFilter = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value

    const newState = {
      ...state,
      [target.name]: value
    }

    setState({
      ...newState,
      sortedRooms: filterRooms(newState)
    })
  }

  return (
    <AppContext.Provider value={{ ...state, getRoom, changeFilter }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
