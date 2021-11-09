import { useHistory } from 'react-router-dom'
import { useRestUser } from 'hooks'

export const Users = () => {
  const history = useHistory()
  const { data: users, isLoading, isError } = useRestUser()

  if (isError) return <div>Error</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <ul>
      {users.slice(0, 9).map((user) => (
        <li key={user.id} onClick={() => history.push(`/${user.id}`)}>
          <p>
            <span>Username:</span> {user.username}
          </p>
          <p>
            <span>Email:</span> {user.email}
          </p>
        </li>
      ))}
    </ul>
  )
}
