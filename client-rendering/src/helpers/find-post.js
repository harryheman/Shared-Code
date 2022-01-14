import { postTemplate } from '../templates/post.js'

export const findPost = async (id) => {
  const { posts } = await import('../data/db.js')

  const postToShow = posts.find((post) => post.id === id)

  return postTemplate(postToShow)
}
