import { menuItems } from '../menuItems'
import { MenuItems } from './MenuItems'

export const Navbar = () => (
  <nav>
    <ul className='menus'>
      {menuItems.map((i, j) => {
        let depth = 0
        return <MenuItems key={j} items={i} depth={depth} />
      })}
    </ul>
  </nav>
)
