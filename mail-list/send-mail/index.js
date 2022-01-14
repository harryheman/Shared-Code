require('dotenv').config()
const nodemailer = require('nodemailer')
const { GoogleSpreadsheet } = require('google-spreadsheet')

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID)

/*
const testTransporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})
*/
const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})

const createMessage = (username, email) => `
  <p>
    <strong>Уважаемый ${username} </strong>, <em>спасибо за подписку</em>!
  </p>
  <p>
    Для того, чтобы отписаться от обновлений, перейдите по <a href="https://mail-list.netlify.app/unsubscribe/${email}" target="_blank">этой ссылке</a>
  </p>
`

const sendMail = async () => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })

    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[0]

    const rows = await sheet.getRows()

    rows.forEach(async (row) => {
      await gmailTransporter.sendMail({
        from: 'Mail list <mail-list.netlify.app>',
        to: row.email,
        subject: 'Благодарность за подписку',
        text: 'Спасибо за подписку',
        html: createMessage(row.username, row.email)
      })
    })
    console.log('Сообщения отправлены')
  } catch (err) {
    console.error(err)
  }
}

sendMail()
