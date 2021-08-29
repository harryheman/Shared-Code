import { useEffect, createContext } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'

export const ArtistsContext = createContext()

export function ArtistsProvider({ children }) {
  const [artists, setArtists] = useLocalStorage('greatArtists', [])

  useEffect(() => {
    async function getArtists() {
      try {
        const response = await fetch(
          `${process.env.PUBLIC_URL}/initialArtists.json`
        )
        if (response.ok) {
          const result = await response.json()
          setArtists(result)
        }
      } catch (err) {
        console.error(err)
      }
    }
    getArtists()
  }, [])

  return (
    <ArtistsContext.Provider value={[artists, setArtists]}>
      {children}
    </ArtistsContext.Provider>
  )
}
