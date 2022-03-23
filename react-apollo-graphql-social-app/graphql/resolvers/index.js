// Агрегация операций

const usersResolvers = require('./users')
const postsResolvers = require('./posts')
const commentsResolvers = require('./comments')

module.exports = {
  // Это возможно благодаря подписке
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length
  },
  // Запрос
  Query: {
    ...postsResolvers.Query
  },
  // Мутации
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation
  },
  // Подписка
  Subscription: {
    ...postsResolvers.Subscription
  }
}
