import { createContext, useContext, useReducer, useMemo } from 'react'
import axios from 'axios'

const SERVER_URL = 'http://localhost:5000/todos'

// константы
const SET_TODOS = 'SET_TODOS'
const SET_STATUS = 'SET_STATUS'
const ADD_TODO = 'ADD_TODO'
const UPDATE_TODO = 'UPDATE_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const COMPLETE_TODOS = 'COMPLETE_TODOS'
const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
const SET_FILTER = 'SET_FILTER'
const SET_MESSAGE = 'SET_MESSAGE'

// редуктор
const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_TODOS:
      return {
        ...state,
        todos: payload
      }
    case SET_STATUS:
      return {
        ...state,
        status: payload
      }
    case ADD_TODO:
      return { ...state, todos: state.todos.concat(payload) }
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload.id ? { ...todo, ...payload.changes } : todo
        )
      }
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload)
      }
    case COMPLETE_TODOS:
      return { ...state, todos: state.todos.map((todo) => todo.done === true) }
    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.done === true)
      }
    case SET_FILTER:
      return {
        ...state,
        filter: payload
      }
    case SET_MESSAGE:
      return {
        ...state,
        message: payload
      }
    default:
      return state
  }
}

// задержка
const giveMeSomeTime = async () =>
  await new Promise((resolve) => {
    const timerId = setTimeout(() => {
      resolve()
      clearTimeout(timerId)
    }, 2000)
  })

// создатель операций
const createActions = (dispatch) => ({
  setTodos: (todos) => ({
    type: SET_TODOS,
    payload: todos
  }),
  setStatus: (status) => ({
    type: SET_STATUS,
    payload: status
  }),
  addTodo: (todo) => ({
    type: ADD_TODO,
    payload: todo
  }),
  updateTodo: (payload) => ({
    type: UPDATE_TODO,
    payload
  }),
  removeTodo: (todoId) => ({
    type: REMOVE_TODO,
    payload: todoId
  }),
  completeTodos: () => ({
    type: COMPLETE_TODOS
  }),
  clearCompleted: () => ({
    type: COMPLETE_TODOS
  }),
  setFilter: (filter) => ({
    type: SET_FILTER,
    payload: filter
  }),
  setMessage: (message) => ({
    type: SET_MESSAGE,
    payload: message
  }),
  async fetchTodos() {
    dispatch(this.setStatus('loading'))

    try {
      const { data: todos } = await axios(SERVER_URL)

      dispatch(this.setTodos(todos))

      dispatch(
        this.setMessage({ type: 'success', text: 'Todos has been loaded' })
      )
    } catch (err) {
      console.error(err.toJSON())

      dispatch(
        this.setMessage({
          type: 'error',
          text: 'Something went wrong. Try again later'
        })
      )
    } finally {
      dispatch(this.setStatus('idle'))

      await giveMeSomeTime()

      dispatch(this.setMessage({}))
    }
  },
  async saveTodos(newTodos) {
    dispatch(this.setStatus('loading'))

    try {
      const { data: existingTodos } = await axios(SERVER_URL)

      for (const todo of existingTodos) {
        const todoUrl = `${SERVER_URL}/${todo.id}`

        const commonTodo = newTodos.find((_todo) => _todo.id === todo.id)

        if (commonTodo) {
          if (
            !Object.entries(commonTodo).every(
              ([key, value]) => value === todo[key]
            )
          ) {
            await axios.put(todoUrl, commonTodo)
          }
        } else {
          await axios.delete(todoUrl)
        }
      }

      for (const todo of newTodos) {
        if (!existingTodos.find((_todo) => _todo.id === todo.id)) {
          await axios.post(SERVER_URL, todo)
        }
      }

      dispatch(
        this.setMessage({ type: 'success', text: 'Todos has been saved' })
      )
    } catch (err) {
      console.error(err.toJSON())

      dispatch(
        this.setMessage({
          type: 'error',
          text: 'Something went wrong. Try again later'
        })
      )
    } finally {
      dispatch(this.setStatus('idle'))

      await giveMeSomeTime()

      dispatch(this.setMessage({}))
    }
  }
})

// создатель селекторов
const createSelectors = (state) => ({
  selectFilteredTodos() {
    const { todos, filter } = state
    if (filter === 'all') return todos
    return filter === 'active'
      ? todos.filter((todo) => !todo.done)
      : todos.filter((todo) => todo.done)
  },
  selectTodoStats() {
    const { todos } = state
    const { length } = todos

    const completed = todos.filter((todo) => todo.done).length
    const active = length - completed
    const percent = length === 0 ? 0 : Math.round((active / length) * 100)

    return {
      total: length,
      completed,
      active,
      percent
    }
  }
})

// начальное состояние
const initialState = {
  todos: [],
  status: 'idle',
  filter: 'all',
  message: {}
}

// контекcт
const Context = createContext()

// провайдер
export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const actions = useMemo(() => createActions(dispatch), [])
  const selectors = createSelectors(state)

  return (
    <Context.Provider value={{ state, dispatch, actions, selectors }}>
      {children}
    </Context.Provider>
  )
}

// хук для использования контекста
export const useAppContext = () => useContext(Context)
