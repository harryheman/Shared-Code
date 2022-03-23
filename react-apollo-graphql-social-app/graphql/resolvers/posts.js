// Операции с постом

// Кастомная ошибка аутентификации
const { AuthenticationError } = require('apollo-server')

// Модели поста и пользователя
const Post = require('../../models/Post')
// Требуется для получения аватара
const User = require('../../models/User')
// Утилита для проверки аутентификации
const checkAuth = require('../../utils/check-auth')

module.exports = {
  // Запросы
  Query: {
    // Получение всех постов из БД
    async getPosts() {
      try {
        // Получаем посты, сортируем их от последнего к первому
        const posts = await Post.find().sort({ createdAt: -1 })

        // и возвращаем
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },
    // Получение поста по id
    async getPost(_, { postId }) {
      try {
        // Получаем пост
        const post = await Post.findById(postId)

        if (post) {
          // и возвращаем его
          return post
        } else {
          throw new Error('Пост не найден')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  // Мутации - операции по изменению "состояния" постов
  Mutation: {
    // Создание поста
    async createPost(_, { body }, context) {
      // Получаем пользователя
      const user = checkAuth(context)
      // Получаем аватар
      // Мы не можем включить в токен аватар,
      // поскольку строка получится слишком длинной из-за преобразования изображения в строку в формате base64
      const { avatar } = await User.findById(user.id)

      if (body.trim() === '') {
        throw new Error('Пост не может быть пустым')
      }

      // Создаем пост
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        avatar,
        createdAt: new Date().toISOString()
      })

      // Сохраняем пост
      const post = await newPost.save()

      // Уведомляем подписчиков о новом посте
      context.pubSub.publish('NEW_POST', {
        newPost: post
      })

      // Возвращаем пост
      return post
    },
    // Удаление поста
    async deletePost(_, { postId }, context) {
      // Получаем пользователя
      const user = checkAuth(context)

      try {
        // Получаем пост по id
        const post = await Post.findById(postId)

        // Удалять посты может только добавивший их пользователь
        if (user.username === post.username) {
          await post.delete()

          return 'Пост удален'
        } else {
          throw new AuthenticationError('Операция не разрешена')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  // Подписка
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubSub }) => pubSub.asyncIterator('NEW_POST')
    }
  }
}
