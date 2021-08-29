import { useAppContext } from '../../context'

import Regular from './Regular'
import Edit from './Edit'

export default function List() {
  const { selectors } = useAppContext()
  const filteredTodos = selectors.selectFilteredTodos()

  return (
    <div className=' col-6'>
      <h3>Todos</h3>
      <ul className='list-group'>
        {filteredTodos.map((todo) =>
          todo.edit ? (
            <Edit key={todo.id} todo={todo} />
          ) : (
            <Regular key={todo.id} todo={todo} />
          )
        )}
      </ul>
    </div>
  )
}
