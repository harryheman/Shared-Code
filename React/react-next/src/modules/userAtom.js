/*
import { createContext, useState, useContext } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(1)

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
*/
import { atom } from 'recoil'

export const userAtom = atom({
  key: 'userAtom',
  default: 1
})
