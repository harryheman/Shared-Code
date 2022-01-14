const faunadb = require('faunadb')
const q = faunadb.query

require('dotenv').config()

// setup faunaDB client
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

// export lambda function
exports.handler = async (event, context, callback) => {
  const {
    body,
    queryStringParameters: { action, id }
  } = event

  // parse body to object if body is not empty object
  let data
  if (Object.keys(body).length) {
    data = JSON.parse(body)
  }

  console.log(`Operation '${action}' invoked`)

  try {
    let response

    switch (action) {
      // get all todos; no body - data
      case 'get_all': {
        const { data } = await client.query(
          q.Paginate(q.Match(q.Ref('indexes/all_todos')))
        )
        const query = data.map((r) => q.Get(r))
        response = await client.query(query)
        break
      }
      // get single todo by id; data -> id
      // we won't use this action on the client
      case 'get_one':
        response = await client.query(q.Get(q.Ref(`classes/todos/${id}`)))
        break
      // create new todo; data -> new todo
      case 'create':
        response = await client.query(
          q.Create(q.Ref('classes/todos'), { data })
        )
        break
      // remove todo by id; data -> id
      case 'remove':
        response = await client.query(q.Delete(q.Ref(`classes/todos/${id}`)))
        break
      // update todo by id; data -> completed | text field
      case 'update':
        response = await client.query(
          q.Update(q.Ref(`classes/todos/${id}`), { data })
        )
        break
      // remove all completed todos; data -> completed todos ids
      case 'remove_completed': {
        const query = data.map((id) => q.Delete(q.Ref(`classes/todos/${id}`)))
        response = await client.query(query)
        break
      }
      // complete all todos; data -> active todos ids
      case 'complete_all': {
        const query = data.map((id) =>
          q.Update(q.Ref(`classes/todos/${id}`), { data: { completed: true } })
        )
        response = client.query(query)
        break
      }
      default:
        return
    }
    console.log(response)
    // return response to the client
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (err) {
    console.error(err)
    // return error
    return {
      statusCode: 400,
      body: JSON.stringify(err)
    }
  }
}

/*
// event
{
  path: '/todos',
  httpMethod: 'METHOD',
  queryStringParameters: [Object: null prototype] { action: 'ACTION' },
  headers: {
    'content-type': 'application/json',
    host: 'localhost:3000'
  },
  body: 'todo | id | id & updated field | ids'
}
*/
