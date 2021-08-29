// Хук для получения селекторов
import { useSelector } from 'react-redux'
// Компоненты приложения
import New from './components/New'
import Filters from './components/Filters'
import List from './components/List'
import Controls from './components/Controls'
import Stats from './components/Stats'
import Loader from './components/Loader'
// Селектор для выборки всех задач
import { selectTotal } from './store'

// Тестирование
import { useDispatch } from 'react-redux'
import { addTodo, updateTodo, selectAll } from './store'
import { nanoid } from '@reduxjs/toolkit'

// Основной компонент приложения
export default function App() {
  const dispatch = useDispatch()
  // Получаем общее количество задач
  const total = useSelector(selectTotal)
  // Получаем индикатор загрузки
  const status = useSelector(({ todos }) => todos.status)
  // Получаем сообщение
  const message = useSelector(({ todos }) => todos.message)

  // Тестирование
  const todos = useSelector(selectAll)
  const createManyTodos = () => {
    const times = []
    for (let i = 0; i < 25; i++) {
      const start = Date.now()
      for (let i = 0; i < 100; i++) {
        const id = nanoid()
        const todo = {
          id,
          text: `Todo ${id}`,
          done: false,
          edit: false
        }
        dispatch(addTodo(todo))
      }
      const diff = Date.now() - start
      times.push(diff)
    }
    const time = times.reduce((a, c) => (a += c), 0) / 25
    console.log(time)
  }

  const updateAllTodos = () => {
    const start = Date.now()
    for (let i = 0; i < todos.length; i++) {
      dispatch(updateTodo({ id: todos[i].id, changes: { done: true } }))
    }
    const diff = Date.now() - start
    console.log(diff)
  }

  /**
   * Логика рендеринга:
   * - компонент для добавления новой задачи (New) рендерится всегда
   * - если есть сообщение, оно рендерится
   * - если приложение находится в состоянии загрузки (status === 'loading'), рендерится только индикатор
   * - если в массиве есть хотя бы одна задача (total > 0),
   * рендерятся все остальные компоненты, в противном случае,
   * рендерится только кнопка для сохранения задач из компонента `Controls`
   */
  return (
    <div
      className='container d-flex flex-column text-center mt-2 mb-2'
      style={{ maxWidth: '600px' }}
    >
      <h1 className='mb-4'>Modern Redux Todo App</h1>
      <div className='d-flex gap-2 mb-2 align-items-center'>
        <button className='btn btn-primary' onClick={createManyTodos}>
          Create
        </button>
        <p className='mb-0'>many todos</p>
      </div>
      <div className='d-flex gap-2 mb-2 align-items-center'>
        <button className='btn btn-primary' onClick={updateAllTodos}>
          Update
        </button>
        <p className='mb-0'>all todos</p>
      </div>
      <New />
      {message.text ? (
        <div
          className={`alert ${
            message.type === 'success' ? 'alert-success' : 'alert-danger'
          } position-fixed top-50 start-50 translate-middle`}
          role='alert'
          style={{ zIndex: 1 }}
        >
          {message.text}
        </div>
      ) : null}
      {status === 'loading' ? (
        <Loader />
      ) : total ? (
        <>
          <Stats />
          <div className='row'>
            <Filters />
            <List />
            <Controls />
          </div>
        </>
      ) : (
        <div className='d-flex justify-content-end'>
          <Controls />
        </div>
      )}
    </div>
  )
}
