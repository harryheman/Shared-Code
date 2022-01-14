import { storage } from './reducer'

export const getCartFromStorage = () => storage.get()

export const getTotalPrice = (cart) =>
  cart.reduce((amount, item) => (amount += item.price), 0)
