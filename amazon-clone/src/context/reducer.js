import * as C from './contants'

const STORAGE_KEY = 'amazon_clone_cart'

export const storage = {
  set: (value) =>
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value)),
  get: () => JSON.parse(window.localStorage.getItem(STORAGE_KEY)),
  remove: () => window.localStorage.removeItem(STORAGE_KEY)
}

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case C.SET_CART:
      return {
        ...state,
        cart: payload
      }
    case C.ADD_TO_CART: {
      const newCart = [...state.cart, payload]
      storage.set(newCart)
      return {
        ...state,
        cart: newCart
      }
    }
    case C.REMOVE_FROM_CART: {
      const newCart = state.cart.filter((product) => product.id !== payload)
      storage.set(newCart)
      return {
        ...state,
        cart: newCart
      }
    }
    case C.CLEAR_CART:
      storage.remove()
      return {
        ...state,
        cart: []
      }
    case C.SET_USER:
      return {
        ...state,
        user: payload
      }
    case C.SET_DRAWER:
      return {
        ...state,
        drawer: payload
      }
    default:
      return state
  }
}
