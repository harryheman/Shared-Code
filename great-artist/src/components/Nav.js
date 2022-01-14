import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { MenuContext } from 'context'

import { links } from 'data'

import { MenuBtn } from './buttons'

export function Nav() {
  const [isOpen, setIsOpen] = useContext(MenuContext)

  function handleKeyDown({ key }) {
    if (key !== 'Escape') return
    if (isOpen) handleClick()
  }

  function handleClick() {
    setIsOpen(!isOpen)
    document.body.classList.toggle('show')
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <>
      <MenuBtn handleClick={handleClick} />
      <nav className={isOpen ? 'nav show' : 'nav'}>
        {links.map(({ to, name }) => (
          <Link key={name} to={to} onClick={handleClick}>
            {name}
          </Link>
        ))}
      </nav>
      <div
        className={isOpen ? 'overlay show' : 'overlay'}
        onClick={handleClick}
      ></div>
    </>
  )
}
