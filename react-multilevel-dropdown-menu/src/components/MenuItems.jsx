import { useState, useEffect, useRef, useCallback } from 'react'
import { Dropdown } from './Dropdown'

export const MenuItems = ({ items, depth }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  const close = ({ target }) => {
    if (open && ref.current && !ref.current.contains(target)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', close)

    return () => {
      window.removeEventListener('click', close)
    }
  }, [])

  const onMouseEnter = () => {
    window.innerWidth > 960 && setOpen(true)
  }

  const onMouseLeave = () => {
    window.innerWidth > 960 && setOpen(false)
  }

  return (
    <li
      className='menu-items'
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.submenu ? (
        <>
          <button
            aria-haspopup='menu'
            aria-expanded={open ? 'true' : 'false'}
            onClick={() => setOpen(!open)}
          >
            {items.title}
            {depth > 0 ? <span>&raquo;</span> : <span className='arrow'></span>}
          </button>
          <Dropdown submenus={items.submenu} open={open} depth={depth} />
        </>
      ) : (
        <a href='#'>{items.title}</a>
      )}
    </li>
  )
}
