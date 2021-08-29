import { useState, useEffect } from 'react'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export const useDeferredRoute = (ms) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const wait = async () => {
      await sleep(ms)
      setLoading(false)
    }
    wait()
  }, [ms])

  return { loading }
}
