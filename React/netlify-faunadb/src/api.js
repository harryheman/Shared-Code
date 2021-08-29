import axios from 'axios'

export default async function _axios(method, payload) {
  const { action, body = {}, id = '' } = payload

  const options = {
    method,
    data: JSON.stringify(body),
    // application/x-www-form-urlencoded by default
    headers: {
      'Content-Type': 'application/json'
    },
    // type of action & id
    params: {
      action,
      id
    }
  }

  try {
    const { data } = await axios('/.netlify/functions/todos', options)
    return data
  } catch (err) {
    console.error(err.message || err)
  }
}

// get all todos
_axios.getAll = () => _axios('GET', { action: 'get_all' })
// we won't use this function
_axios.getOne = (id) => _axios('GET', { action: 'get_one', id })
// create new todo
_axios.create = (todo) => _axios('POST', { action: 'create', body: todo })
// remove todo by id
_axios.remove = (id) => _axios('DELETE', { action: 'remove', id })
// update todo by id; body -> completed | text field
_axios.update = (id, body) => _axios('PUT', { action: 'update', id, body })
// remove all completed todos
_axios.removeCompleted = (ids) =>
  _axios('DELETE', { action: 'remove_completed', body: ids })
// complete all todos
_axios.completeAll = (ids) =>
  _axios('PUT', { action: 'complete_all', body: ids })
