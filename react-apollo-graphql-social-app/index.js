// Основной файл сервера

// Сервер и средство для подписки на изменения
const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')

// Определения типов GraphQL
const typeDefs = require('./graphql/typeDefs')
// "Разрешители" - операции, выполняемые по запросам и мутациям GraphQL
const resolvers = require('./graphql/resolvers')
// URL базы данных
const { MONGODB } = require('./config')

// Инициализируем подписку
const pubSub = new PubSub()

// Инициализируем сервер,
// передавая ему типы, операции и контекст,
// который делает запрос и подписку доступными для операций
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubSub })
})

// Подключаемся к БД
mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to database')
    // Запускаем сервер
    return server.listen({ port: 5000 })
  })
  .then((res) => {
    console.log(`Server ready: ${res.url}`)
  })
