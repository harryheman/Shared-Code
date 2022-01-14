import { useState, useEffect } from 'react'

export function useWindowSize() {
  const [size, setSize] = useState({})

  function onResize() {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return size
}
