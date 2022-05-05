import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect, useCallback } from 'react'
import { AdviceCard } from '../components/AdviceCard'

const API_URL = 'https://api.adviceslip.com/advice'

const Home: NextPage = () => {
  const [advice, setAdvice] = useState({
    adviceId: 1,
    adviceText: `Never regret.
  If it's good, it's wonderful. If it's bad, it's experience.`,
  })

  const getAdvice = useCallback(async () => {
    try {
      const promise = await fetch(API_URL)
      const data = await promise.json()
      setAdvice({
        adviceId: data.slip.id,
        adviceText: data.slip.advice,
      })
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#1e1f29]">
      <Head>
        <title>Advice Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="mt-4 rounded-xl px-4 py-2 font-manrope text-2xl font-bold text-emerald-200 transition duration-300 ease-in hover:rounded-xl hover:bg-emerald-500 hover:text-emerald-100 hover:shadow-lg hover:shadow-emerald-600 md:text-4xl ">
        Advice Generator
      </h1>
      <AdviceCard {...advice} getAdvice={getAdvice} />
    </div>
  )
}

export default Home
