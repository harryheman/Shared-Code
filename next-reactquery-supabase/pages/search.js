import { Navbar, Search, Protected } from 'components'

export default function Home() {
  return (
    <Protected>
      <div className='min-h-screen'>
        <Navbar />
        <div className='container mx-auto'>
          <Search />
        </div>
      </div>
    </Protected>
  )
}
