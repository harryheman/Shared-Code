// const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')

require('dotenv').config({ path: '../.env' })

const stripe = require('stripe')(process.env.SK_TEST)

const app = express()
app.use(cors())
app.use(express.json())

app.get('/payment/create', async (req, res) => {
  const { total } = req.query

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd'
  })

  res.status(201).json({
    secret: paymentIntent.client_secret
  })
})

// exports.api = functions.https.onRequest(app)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server ready 🚀')
})
