import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Form, Button } from 'semantic-ui-react'
import ReCAPTCHA from 'react-google-recaptcha'

import { Spinner, useDeferredRoute } from '../hooks'

const isEmpty = (fields) => fields.some((f) => f.trim() === '')
const isEmail = (v) => /\w+@\w+\.\w+/i.test(v)

function Subscribe() {
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  })
  const [error, setError] = useState(null)
  const [recaptcha, setRecaptcha] = useState(false)

  const { loading } = useDeferredRoute(1000)
  const history = useHistory()

  const onChange = ({ target: { name, value } }) => {
    setError(null)
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const email = isEmail(formData.email)

    if (!email) {
      return setError('Введен неправильный email')
    }

    try {
      const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        const json = await response.json()
        return setError(json.error)
      }
      history.push('/success')
    } catch (err) {
      console.error(err)
    }
  }

  const disabled = isEmpty(Object.values(formData)) || !recaptcha

  const { username, email } = formData

  if (loading) return <Spinner />

  return (
    <Container>
      <h2>Подписаться на уведомления</h2>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>Ваше имя</label>
          <input
            placeholder='Имя'
            type='text'
            name='username'
            value={username}
            onChange={onChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Ваш email</label>
          <input
            placeholder='Email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </Form.Field>
        <p className='email-error'>{error}</p>
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
          onChange={() => setRecaptcha(true)}
        />
        <Button color='teal' type='submit' disabled={disabled}>
          Подписаться
        </Button>
      </Form>
    </Container>
  )
}

export default Subscribe
