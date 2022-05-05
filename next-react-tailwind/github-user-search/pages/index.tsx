import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import { Navbar, SearchBar, User, Loading } from '../components'
const API_URL = 'https://api.github.com/users'

const Home = () => {
  const [userName, setUserName] = useState('harryheman')
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>()

  const onClick = () => {
    if (inputRef.current) {
      setUserName(inputRef.current.value)
    }
  }

  const fetchUser = async () => {
    if (!userName.trim()) return
    setLoading(true)
    try {
      const promise = await fetch(`${API_URL}/${userName}`)
      const data = await promise.json()
      console.dir(data)
      setData({
        imageUrl: data.avatar_url,
        bio: data.bio,
        blog: data.blog,
        company: data.company,
        createdAt: data.created_at,
        followers: data.followers,
        following: data.following,
        location: data.location,
        username: data.login,
        name: data.name,
        repos: data.public_repos,
      })
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [userName])

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#1e1f29]">
      <Head>
        <title>Github User Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {loading ? (
        <Loading />
      ) : (
        <>
          <SearchBar onClick={onClick} inputRef={inputRef} />
          <User data={data} />
        </>
      )}
    </div>
  )
}

export default Home
