import useSWR from 'swr'

const REST_USER_URL = 'https://jsonplaceholder.typicode.com/users'

const restFetcher = async (url) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error('В процессе получения данных возникла ошибка')
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

export const useRestUser = (id = '') => {
  const { data, error } = useSWR(`${REST_USER_URL}/${id}`, restFetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}
