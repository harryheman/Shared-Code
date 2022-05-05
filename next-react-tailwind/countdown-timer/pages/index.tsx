import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Header, Footer, TimerContainer, TimerInput } from '../components'

const Home: NextPage = () => {
  const [newTime, setNewTime] = useState(0)
  const [time, setTime] = useState(0)
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [message, setMessage] = useState('')

  const timeToDays = time * 60 * 60 * 24 * 1000

  let countDownDate = new Date().getTime() + timeToDays

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime()

      const difference = countDownDate - now

      const newDays = Math.floor(difference / (1000 * 60 * 60 * 24))
      const newHours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const newMinutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      )
      const newSeconds = Math.floor((difference % (1000 * 60)) / 1000)

      setDays(newDays)
      setHours(newHours)
      setMinutes(newMinutes)
      setSeconds(newSeconds)

      if (difference <= 0) {
        setMessage('')
        clearInterval(intervalId)
        setDays(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
      }
    })

    return () => {
      clearInterval(intervalId)
    }
  }, [time])

  const onClick = () => {
    setMessage('The launch has started')
    setTime(newTime)
    setNewTime(0)
  }

  const onChange = (e: any) => {
    setNewTime(e.target.value)
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#1e1f29] pb-6">
      <Head>
        <title>Countdown Timer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header message={message} />

      <TimerContainer
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />

      <TimerInput value={newTime} onChange={onChange} onClick={onClick} />

      <Footer />
    </div>
  )
}

export default Home
