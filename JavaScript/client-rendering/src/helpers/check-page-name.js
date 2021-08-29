import { findPost } from './find-post.js'

export const checkPageName = async (pageName) => {
  let pageToRender = ''

  if (pageName.includes('post')) {
    const id = pageName.replace('post#', '')

    pageToRender = await findPost(id)
  } else {
    const pageModule = await import(`../pages/${pageName}.js`)

    pageToRender = pageModule.default
  }

  return pageToRender
}
