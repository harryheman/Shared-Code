import * as C from './contants'

export const setCart = (cart) => ({
  type: C.SET_CART,
  payload: cart
})

export const addToCart = (product) => ({
  type: C.ADD_TO_CART,
  payload: product
})

export const removeFromCart = (id) => ({
  type: C.REMOVE_FROM_CART,
  payload: id
})

export const clearCart = () => ({
  type: C.CLEAR_CART
})

export const setUser = (user) => ({
  type: C.SET_USER,
  payload: user
})

export const setDrawer = (toggle) => ({
  type: C.SET_DRAWER,
  payload: toggle
})
