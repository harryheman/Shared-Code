import './Login.css'
import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from 'fb'
import { useStateContext } from 'context'

const inputs = [
  {
    label: 'Email',
    name: 'email',
    type: 'email'
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password'
  }
]

const Input = ({ label, ...rest }) => (
  <>
    <h5>{label}</h5>
    <input {...rest} />
  </>
)

export const Login = () => {
  const history = useHistory()

  const [{ user }] = useStateContext()

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (user) {
      history.push('/')
    }
  }, [user, history])

  const change = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value.trim() })
  }

  const login = (e) => {
    e.preventDefault()

    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        history.push('/')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const register = () => {
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        history.push('/')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div className='login'>
      <Link to='/'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
          alt=''
          className='login__logo'
        />
      </Link>

      <div className='login__container'>
        <h1>Login</h1>

        <form onSubmit={login}>
          {inputs.map((input, i) => (
            <Input
              key={i}
              {...input}
              value={data[input.name]}
              onChange={change}
            />
          ))}
          <button className='login__signInButton'>Login</button>
        </form>

        <button className='login__registerButton' onClick={register}>
          Create Account
        </button>
      </div>
    </div>
  )
}
