import { MenuItems } from './MenuItems'

export const Dropdown = ({ submenus, open, depth }) => {
  depth += 1
  const dropDownClass = depth > 1 ? 'dropdown-submenu' : ''
  return (
    <ul className={`dropdown ${dropDownClass} ${open ? 'show' : ''}`}>
      {submenus.map((i, j) => (
        <MenuItems key={j} items={i} depth={depth} />
      ))}
    </ul>
  )
}
