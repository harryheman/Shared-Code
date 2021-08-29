import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { MenuProvider } from 'context'

import { Nav } from './Nav'
import { ToggleBtn, FontBtn } from './buttons'

export function Header() {
  function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [pathname])

    return null
  }

  return (
    <>
      <ScrollToTop />
      <header className='header'>
        <MenuProvider>
          <Nav />
        </MenuProvider>
        <h1 className='title'>Великие художники</h1>
        <ToggleBtn />
        <FontBtn />
      </header>
    </>
  )
}
