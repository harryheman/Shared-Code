export const postTemplate = ({ id, title, text, date }) => ({
  content: `
  <article data-url="post#${id}">
    <h2>${title}</h2>
    <p>${text}</p>
    <time>${date}</time>
  </article>
  `,
  url: `post#${id}`
})
