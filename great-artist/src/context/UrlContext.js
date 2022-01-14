import { createContext } from 'react'

export const UrlContext = createContext()

export function UrlProvider({ children }) {
  const url = process.env.PUBLIC_URL
  const imgUrl = `${url}/img`
  const audioUrl = `${url}/audio`
  return (
    <UrlContext.Provider value={{ imgUrl, audioUrl }}>
      {children}
    </UrlContext.Provider>
  )
}
