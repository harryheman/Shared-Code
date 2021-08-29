import { useEffect, useRef } from 'react'

export const useTimeout = (cb, ms) => {
  const cbRef = useRef()

  useEffect(() => {
    cbRef.current = cb
  }, [cb])

  useEffect(() => {
    function tick() {
      cbRef.current()
    }
    if (ms > 1) {
      const id = setTimeout(tick, ms)
      return () => {
        clearTimeout(id)
      }
    }
  }, [ms])
}
