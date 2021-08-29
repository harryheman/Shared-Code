const faunadb = require('faunadb')
const q = faunadb.query

require('dotenv').config()

const createFaunaDB = async (key) => {
  console.log('Creating database...')

  const client = new faunadb.Client({
    secret: key
  })

  try {
    await client.query(q.Create(q.Ref('classes'), { name: 'todos' }))
    await client.query(
      q.Create(q.Ref('indexes'), {
        name: 'all_todos',
        source: q.Ref('classes/todos')
      })
    )
    console.log('Database has been created')
  } catch (err) {
    console.error(err.description || err)
  }
}

createFaunaDB(process.env.FAUNADB_SECRET)
