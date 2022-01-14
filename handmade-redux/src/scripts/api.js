import { nanoid } from 'nanoid'

const getNotes = () =>
  ['Eat', 'Sleep', 'Code', 'Repeat'].reduce((obj, content) => {
    const id = nanoid(5)
    obj[id] = { id, content }
    return obj
  }, {})

const createFakeApi = () => {
  const fetchNotes = () =>
    new Promise((resolve) => {
      const timerId = setTimeout(() => {
        resolve(getNotes())
        clearTimeout(timerId)
      }, 1500)
    })

  return {
    fetchNotes
  }
}

export const api = createFakeApi()
