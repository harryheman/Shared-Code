import './App.scss'
import { useState, useEffect } from 'react'
import {
  Routes,
  Route,
  Link,
  NavLink,
  // useRoutes,
  useParams,
  // useLocation,
  useNavigate,
  Navigate
} from 'react-router-dom'

const fetchUsers = async (id) => {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/users?_limit=10'
  )
  const users = await res.json()
  if (id) {
    return users.find((user) => user.id === id)
  }
  return users
}
fetchUsers()

const HomePage = () => <h1>Welcome to Home Page</h1>
const AboutPage = () => <h1>This is About Page</h1>
const Error404Page = () => <h1>Page not found</h1>

const Navbar = () => (
  <nav>
    <ul>
      <li>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'active' : null)}
          style={({ isActive }) => (isActive ? { color: 'red' } : null)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <Link to='/users'>Users</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </ul>
  </nav>
)

const UserProfile = () => {
  const params = useParams()
  // console.log(params)
  // const location = useLocation()
  // console.log(location)
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    fetchUsers(Number(params.id)).then((user) => setUser(user))
  }, [params.id])

  if (!user) return <div>Loading...</div>

  if (redirect) return <Navigate to='/' />

  return (
    <div className='user-profile'>
      <img src='https://via.placeholder.com/150' alt={`${user.name} avatar`} />
      <div>
        <p>Name: {user.name}</p>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>City: {user.address.city}</p>
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={() => setRedirect(true)}>Redirect</button>
      </div>
    </div>
  )
}

const UserList = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    fetchUsers().then((users) => setUsers(users))
  }, [])

  if (!users) return <div>Loading...</div>

  return (
    <ul className='user-list'>
      {users.map((user) => (
        <li key={user.id}>
          <img
            src='https://via.placeholder.com/150'
            alt=''
            role='presentation'
          />
          <div>
            <Link to={String(user.id)}>{user.username}</Link>
            <p>{user.email}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

// const routes = [
//   {
//     path: '/',
//     element: <HomePage />
//   },
//   {
//     path: '/users',
//     element: <UserList />,
//     children: [
//       {
//         path: ':id',
//         element: <UserProfile />
//       }
//     ]
//   },
//   {
//     path: '/about',
//     element: <AboutPage />
//   }
// ]

function App() {
  // const routesFromArray = useRoutes(routes)

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path='/'>
            <Route index element={<HomePage />} />
            <Route path='users'>
              <Route index element={<UserList />} />
              <Route path=':id' element={<UserProfile />} />
            </Route>
            <Route path='about' element={<AboutPage />} />
            <Route path='test' />
          </Route>
          <Route path='*' element={<Error404Page />} />
        </Routes>
      </main>
    </>
  )
}

export default App
