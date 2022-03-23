// Операции с комментариями

// Кастомные ошибки
const { UserInputError, AuthenticationError } = require('apollo-server')

// Модель поста
const Post = require('../../models/Post')
// Утилита для проверки аутентификации
const checkAuth = require('../../utils/check-auth')

module.exports = {
  // Мутации - операции по изменению "состояния" комментариев
  Mutation: {
    // Создание комментария
    // Первый параметр - parent, нам он в данном случае не нужен
    async createComment(_, { postId, body }, context) {
      // Получаем имя пользователя из контекста
      const { username } = checkAuth(context)

      if (body.trim() === '') {
        throw new UserInputError('Пустой комментарий', {
          errors: {
            body: 'Комментарий не может быть пустым'
          }
        })
      }

      // Получаем пост из БД
      const post = await Post.findById(postId)

      if (post) {
        // Добавляем новый комментарий в начало массива
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        })

        // Сохраняем пост в БД
        await post.save()

        // и возвращаем его
        return post
      } else throw UserInputError('Пост не найден')
    },
    // Удаление комментария
    async deleteComment(_, { postId, commentId }, context) {
      // Получаем имя пользователя
      const { username } = checkAuth(context)

      // Получаем пост из БД
      const post = await Post.findById(postId)

      if (post) {
        // Определяем индекс комментария
        const commentIndex = post.comments.findIndex((c) => c.id === commentId)

        // Комментарии может удалять только добавивший их пользователь
        if (post.comments[commentIndex].username === username) {
          // Удаляем комментарий
          post.comments.splice(commentIndex, 1)

          // Сохраняем пост
          await post.save()

          // и возвращаем его
          return post
        } else {
          throw new AuthenticationError('Операция не разрешена')
        }
      } else {
        throw new UserInputError('Пост не найден')
      }
    },
    // "Лайк" поста
    async likePost(_, { postId }, context) {
      // Получаем имя пользователя
      const { username } = checkAuth(context)

      // Получаем пост
      const post = await Post.findById(postId)

      if (post) {
        // 2 в 1
        if (post.likes.find((l) => l.username === username)) {
          // Пост "лайкнут"
          post.likes = post.likes.filter((l) => l.username !== username)
        } else {
          // Пост не "лайкнут"
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          })
        }

        // Сохраняем пост
        await post.save()

        // и возвращаем его
        return post
      } else {
        throw new UserInputError('Пост не найден')
      }
    }
  }
}
