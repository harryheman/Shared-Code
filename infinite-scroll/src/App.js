import './App.css'
import { useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroller'
import { PostCard } from './components'

const fetchPosts = async ({ pageParam = 1 }) => {
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${pageParam}&limit=10}`
  )
  const result = await response.json()
  return { result, nextPage: pageParam + 1, totalPages: 100 }
}

function App() {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery('posts', fetchPosts, {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage
        return undefined
      }
    })
  return (
    <div className='App'>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error</p>
      ) : (
        <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
          {data.pages.map((page) =>
            page.result.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </InfiniteScroll>
      )}
    </div>
  )
}

export default App
