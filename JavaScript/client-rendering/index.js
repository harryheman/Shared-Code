const express = require('express')
const app = express()
const port = process.env.PORT || 1234

app.use(express.static('src'))

app.get('*', (_, res) => {
  res.sendFile(`${__dirname}/index.html`, null, (err) => {
    if (err) console.error(err)
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
