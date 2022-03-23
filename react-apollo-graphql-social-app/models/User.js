// Модель пользователя

const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  username: String,
  avatar: String,
  email: String,
  password: String,
  createdAt: Date
})

module.exports = model('User', userSchema)
