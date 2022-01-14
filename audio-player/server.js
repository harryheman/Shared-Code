const app = require('express')()

app.use((req, res) => {
  res.setHeader('Accept-Encoding', 'gzip, compress, br')
  res.sendFile(__dirname + decodeURIComponent(req.url))
})

app.listen(process.env.PORT || 3000)
