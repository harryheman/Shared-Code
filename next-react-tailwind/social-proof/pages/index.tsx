import type { NextPage } from 'next'
import Head from 'next/head'
import { Header, StarRating, Testimonials } from '../components'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#fff] pb-6">
      <Head>
        <title>Social Proof</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-a flex flex-col items-center justify-between px-4 py-2 md:flex-row md:px-24 ">
        <Header />
        <div className="flex flex-col items-center justify-center">
          <StarRating ratingText="Rated 5 Stars in Reviews" />
          <StarRating ratingText="Rated 5 Stars in Report Guru" />
          <StarRating ratingText="Rated 5 Stars in Best Tech" />
        </div>
      </div>
      <Testimonials />
    </div>
  )
}

export default Home
