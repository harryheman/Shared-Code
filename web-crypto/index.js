const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

const router = express.Router()

app.use(cors())
app.use(express.static(__dirname))
app.use(
  express.json({
    type: ['application/json', 'text/plain']
  })
)

app.get('/', (_, res) => {
  res.status(200).sendFile('index.html')
})

app.use(router)

let data = ''

router.post('/secure-api', (req, res) => {
  data = req.body

  console.log(data)

  res.end()
})

router.get('/secure-api', (_, res) => {
  res.json(data)
})

app.listen(PORT, () => console.log(`Server ready. Port: ${PORT}`))
