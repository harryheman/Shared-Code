import useSWR from 'swr'
import { request, gql } from 'graphql-request'

const GRAPHQL_USER_URL = 'https://graphqlzero.almansi.me/api'

const userQuery = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
      name
      address {
        city
      }
    }
  }
`

const graphqlFetcher = (...args) => request(...args)

export const useGraphqlUser = (id = '') => {
  const { data, error } = useSWR([GRAPHQL_USER_URL, id], (url) =>
    graphqlFetcher(url, userQuery, { id })
  )

  return {
    data: data?.user,
    isLoading: !error && !data,
    isError: error
  }
}
