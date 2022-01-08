import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import createTemplate from '../createTemplate'
import compile from './devBundle'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
compile(app)
app.use('/dist', express.static(join(__dirname, '../dist')))
app.get('/', (req, res) => {
  res.status(200).send(createTemplate())
})

const port = process.env.PORT || 3000
app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log(`Server started on port ${port}`)
})
