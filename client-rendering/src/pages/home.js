import { postTemplate } from '../templates/post.js'

export default {
  content: async () => {
    const { posts } = await import('../data/db.js')

    return /*html*/ `
    <h1>Welcome to the Home Page</h1>
    <div>
      ${posts.reduce((html, post) => (html += postTemplate(post).content), '')}
    </div>
    `
  },
  url: 'home'
}
