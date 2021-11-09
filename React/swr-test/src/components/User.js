import { useParams, Link } from 'react-router-dom'
import { useRestUser, useGraphqlUser } from 'hooks'

export const User = () => {
  const { id } = useParams()
  // const { data: user, isLoading, isError } = useRestUser(id)
  const { data: user, isLoading, isError } = useGraphqlUser(id)

  if (isError) return <div>Error</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div className='user'>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Name: {user.name}</p>
      <p>City: {user.address.city}</p>
      <Link to='/' className='link'>
        Back
      </Link>
    </div>
  )
}
