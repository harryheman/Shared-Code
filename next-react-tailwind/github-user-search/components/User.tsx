import { UserProfile } from './UserProfile'
import { UserBio } from './UserBio'
import { UserStats } from './UserStats'
import { UserData } from './UserData'

type Props = {
  imageUrl: string
  bio: string
  blog: string
  company: string | null
  createdAt: string
  followers: number
  following: number
  location: string
  username: string
  name: string
  repos: number
}

export const User = (props: any) => {
  const {
    imageUrl,
    bio,
    blog,
    company,
    createdAt,
    followers,
    following,
    location,
    username,
    name,
    repos,
  } = props.data
  const date = new Date(createdAt).toDateString()

  return (
    <div className="mx-auto mt-6 flex min-h-[470px] max-w-md flex-col items-end justify-between  space-y-4 rounded-lg bg-gray-200 py-6 transition duration-300 ease-in dark:bg-[#2b365e] md:min-h-fit md:max-w-2xl">
      <UserProfile
        name={name}
        date={date}
        username={username}
        imageUrl={imageUrl}
      />

      <div className=" flex w-full flex-col space-y-6 px-6 py-3 md:max-w-lg">
        <UserBio bio={bio} />
        <UserStats repos={repos} followers={followers} following={following} />

        <UserData location={location} blog={blog} company={company} />
      </div>
    </div>
  )
}
