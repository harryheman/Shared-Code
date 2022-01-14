import { createContext, useContext, useReducer } from 'react'
import { reducer } from './reducer'

const StateContext = createContext()

const initialState = {
  cart: [],
  user: null,
  drawer: false
}

export const StateProvider = ({ children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)

export * as A from './actions'
export * as S from './selectors'
