import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import App from '../client/components/App'

const app = express()
const port = 3000

app.get('/', (_, res) => {
  const jsx = ReactDOMServer.renderToString(<App />)

  const clientBundleScript = `<script src="http://localhost:8080/scripts/bundle.js"></script>`
  const clientBundleStyle = `<link rel="stylesheet" href="http://localhost:8080/styles/bundle.css">`

  res.send(/*html*/ `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My SSR App</title>
            ${clientBundleStyle}
          </head>
          <body>
            <div id='ssr-app'>${jsx}</div>
            ${clientBundleScript}
          </body>
        </html>
    `)
})

app.listen(port, () => {
  console.log(`Server ready. Port: ${port}`)
})
