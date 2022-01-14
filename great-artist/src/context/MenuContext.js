import { useState, createContext } from 'react'

export const MenuContext = createContext()

export function MenuProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MenuContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </MenuContext.Provider>
  )
}
