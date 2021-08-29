require('dotenv').config()

const { GoogleSpreadsheet } = require('google-spreadsheet')

exports.handler = async (event) => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID)

  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })

    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[0]

    const data = JSON.parse(event.body)

    const rows = await sheet.getRows()

    const index = rows.findIndex((row) => row.email === data)

    if (index === -1) {
      const response = {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Пользователь с указанным email не найден'
        }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true'
        }
      }
      return response
    }

    await rows[index].delete()

    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: 'Пользователь удален' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      }
    }
    return response
  } catch (err) {
    console.error(err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Что-то пошло не так. Попробуйте позже' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      }
    }
    return response
  }
}
