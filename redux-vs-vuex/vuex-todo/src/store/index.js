import { createStore } from 'vuex'
// Утилита для выполнения HTTP-запросов
import axios from 'axios'

// Адрес сервера
const SERVER_URL = 'http://localhost:5000/todos'

// Асинхронная операция - получение задач от сервера
const getTodos = async () => {
  try {
    const { data: todos } = await axios(SERVER_URL)
    // возвращаем задачи и сообщение об успехе
    return {
      todos,
      message: { type: 'success', text: 'Todos has been loaded' }
    }
  } catch (err) {
    console.error(err.toJSON())
    // возвращаем сообщение об ошибке
    return {
      message: {
        type: 'error',
        text: 'Something went wrong. Try again later'
      }
    }
  }
}

// Асинхронная операция - сохранение задач в БД
const postTodos = async (newTodos) => {
  try {
    // Получаем данные - существующие задачи
    const { data: existingTodos } = await axios(SERVER_URL)

    // перебираем существующие задачи
    for (const todo of existingTodos) {
      // формируем `URL` текущей задачи
      const todoUrl = `${SERVER_URL}/${todo.id}`

      // пытаемся найти общую задачу
      const commonTodo = newTodos.find((_todo) => _todo.id === todo.id)

      // если получилось
      if (commonTodo) {
        // определяем наличие изменений
        if (
          !Object.entries(commonTodo).every(
            ([key, value]) => value === todo[key]
          )
        ) {
          // если изменения есть, обновляем задачу на сервере,
          // в противном случае, ничего не делаем
          await axios.put(todoUrl, commonTodo)
        }
      } else {
        // если общая задача отсутствует, удаляем задачу на сервере
        await axios.delete(todoUrl)
      }
    }

    // Перебираем новые задачи и сравниваем их с существующими
    for (const todo of newTodos) {
      // если новой задачи нет среди существующих
      if (!existingTodos.find((_todo) => _todo.id === todo.id)) {
        // сохраняем ее в БД
        await axios.post(SERVER_URL, todo)
      }
    }
    // сообщение об успехе операции
    return {
      type: 'success',
      text: 'Todos has been saved'
    }
  } catch (err) {
    console.error(err.toJSON())
    // сообщение о провале операции
    return {
      type: 'error',
      text: 'Something went wrong. Try again later'
    }
  }
}

// Создаем и экспортируем хранилище
export default createStore({
  // Начальное состояние
  state: {
    // для задач
    todos: [],
    // для статуса приложения
    status: 'idle',
    // для сообщения
    message: {},
    // для фильтра
    filter: 'all'
  },
  // Мутации
  mutations: {
    // Добавление задач
    ['SET_TODOS'](state, { todos, message }) {
      if (todos) {
        state.todos = todos
      }
      state.message = message
      state.status = 'idle'
    },
    // Установка статуса
    ['SET_STATUS'](state, status) {
      state.status = status
    },
    // Добавление новой задачи
    ['ADD_TODO'](state, todo) {
      state.todos.push(todo)
    },
    // Удаление задачи
    ['REMOVE_TODO'](state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1)
    },
    // Обновление задачи
    ['UPDATE_TODO'](state, { id, changes }) {
      const index = state.todos.findIndex((todo) => todo.id === id)
      state.todos.splice(index, 1, { ...state.todos[index], ...changes })
    },
    // Завершение всех активных задач
    ['COMPLETE_TODOS'](state) {
      state.todos = state.todos.map((todo) =>
        todo.done ? todo : { ...todo, done: !todo.done }
      )
    },
    // Удаление завершенных задач
    ['CLEAR_COMPLETED'](state) {
      state.todos = state.todos.filter((todo) => !todo.done)
    },
    // Сохранение задач в БД
    ['SAVE_TODOS'](state, message) {
      state.message = message
      state.status = 'idle'
    },
    // Установка фильтра
    ['SET_FILTER'](state, filter) {
      state.filter = filter
    },
    // Очистка сообщения
    ['CLEAR_MESSAGE'](state) {
      state.message = {}
    }
  },
  // Операции
  actions: {
    // Получение задач от сервера
    fetchTodos({ commit, dispatch, state }) {
      state.status = 'loading'
      getTodos()
        .then((todos) => {
          commit('SET_TODOS', todos)
        })
        .then(() => {
          dispatch('giveMeSomeTime')
        })
    },
    // Установка статуса
    setStatus({ commit }, status) {
      commit('SET_STATUS', status)
    },
    // Добавление новой задачи
    addTodo({ commit }, todo) {
      commit('ADD_TODO', todo)
    },
    // Обновление задачи
    updateTodo({ commit }, payload) {
      commit('UPDATE_TODO', payload)
    },
    // Удаление задачи
    removeTodo({ commit }, id) {
      commit('REMOVE_TODO', id)
    },
    // Завершение всех активных задач
    completeTodos({ commit }) {
      commit('COMPLETE_TODOS')
    },
    // Удаление завершенных задач
    clearCompleted({ commit }) {
      commit('CLEAR_COMPLETED')
    },
    // Сохранение задач в БД
    saveTodos({ commit, state, dispatch }) {
      state.status = 'loading'
      postTodos(state.todos)
        .then((message) => {
          commit('SAVE_TODOS', message)
        })
        .then(() => {
          dispatch('giveMeSomeTime')
        })
    },
    // Установка фильтра
    setFilter({ commit }, filter) {
      commit('SET_FILTER', filter)
    },
    // Выполнение задержки перед очисткой сообщения
    giveMeSomeTime({ commit }) {
      const timerId = setTimeout(() => {
        commit('CLEAR_MESSAGE')
        clearTimeout(timerId)
      }, 1500)
    }
  },
  // Геттеры
  getters: {
    // получение отфильтрованных задач
    filteredTodos: ({ todos, filter }) => {
      if (filter === 'all') return todos
      return filter === 'active'
        ? todos.filter((todo) => !todo.done)
        : todos.filter((todo) => todo.done)
    },
    // получение статистики
    todoStats: ({ todos }) => {
      const total = todos.length
      const completed = todos.filter((todo) => todo.done).length
      const active = total - completed
      const percent = total === 0 ? 0 : Math.round((active / total) * 100)

      return {
        total,
        completed,
        active,
        percent
      }
    }
  }
})
