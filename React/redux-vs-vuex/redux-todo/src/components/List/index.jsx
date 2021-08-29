// Хук для получения селекторов
import { useSelector } from 'react-redux'
// Селектор для выборки отфильтрованных задач
import { selectFilteredTodos } from '../../store'
// Обычный элемент списка
import Regular from './Regular'
// Элемент списка для редактирования задачи
import Edit from './Edit'

// Список задач
export default function List() {
  // Получаем отфильтрованные задачи
  const filteredTodos = useSelector(selectFilteredTodos)

  /**
   * Логика рендеринга:
   * - рендерим только отфильтрованные задачи
   * - и в зависимости от индикатора редактирования задачи,
   * рендерим тот или иной элемент списка
   */
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
