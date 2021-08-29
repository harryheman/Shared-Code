// Хуки для получения диспетчера и селекторов
import { useDispatch, useSelector } from 'react-redux'
// Операции для завершения всех активных задач,
// удаления завершенных задач,
// сохранения задач в БД,
// очистки сообщения
// и селектор для выборки всех задач
import {
  completeAllTodos,
  clearCompletedTodos,
  saveTodos,
  giveMeSomeTime,
  selectAll
} from '../store'

// Кнопки управления
export default function Controls() {
  // Получаем диспетчера
  const dispatch = useDispatch()
  // Получаем все задачи
  const todos = useSelector(selectAll)

  /**
   * Логика рендеринга:
   * - если в массиве есть хотя бы одна задача,
   * рендерятся кнопки для завершения всех активных задач, удаления завершенных задач и сохранения задач в БД,
   * в противном случае, рендерится только кнопка для сохранения задач
   */
  return (
    <div className='col-3 d-flex flex-column'>
      <h3>Controls</h3>
      {todos.length ? (
        <>
          <button
            onClick={() => dispatch(completeAllTodos())}
            className='btn btn-info mb-2'
          >
            Complete
          </button>
          <button
            onClick={() => dispatch(clearCompletedTodos())}
            className='btn btn-danger mb-2'
          >
            Clear
          </button>
        </>
      ) : null}
      <button
        onClick={() =>
          // Отправляем операцию для сохранения задач
          // и следом за ней операцию для очистки сообщения с задержкой в 2 секунды
          dispatch(saveTodos(todos)).then(() => dispatch(giveMeSomeTime()))
        }
        className='btn btn-success'
      >
        Save
      </button>
    </div>
  )
}
