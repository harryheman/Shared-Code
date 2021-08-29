import { useEffect } from 'react'
import { useAppContext } from './context'
import New from './components/New'
import Filters from './components/Filters'
import List from './components/List'
import Controls from './components/Controls'
import Stats from './components/Stats'
import Loader from './components/Loader'

import { nanoid } from 'nanoid'

export default function App() {
  const { state, dispatch, actions } = useAppContext()
  const { todos, status, message } = state

  // useEffect(() => {
  //   dispatch(actions.fetchTodos())
  // }, [])

  // Тестирование
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
        dispatch(actions.addTodo(todo))
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
      dispatch(actions.updateTodo({ id: todos[i].id, changes: { done: true } }))
    }
    const diff = Date.now() - start
    console.log(diff)
  }

  return (
    <div
      className='container d-flex flex-column text-center mt-2 mb-2'
      style={{ maxWidth: '600px' }}
    >
      <h1 className='mb-4'>Modern React Todo App</h1>
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
      ) : todos.length ? (
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
