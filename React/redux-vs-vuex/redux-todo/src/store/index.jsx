import {
  configureStore,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice
} from '@reduxjs/toolkit'
// Утилита для выполнения HTTP-запросов
import axios from 'axios'

// Адрес сервера
const SERVER_URL = 'http://localhost:5000/todos'

// Создаем адаптер сущностей для задач
const todoAdapter = createEntityAdapter()

// Начальное состояние задач
const initialTodoState = todoAdapter.getInitialState({
  // индикатор загрузки
  status: 'idle',
  // сообщение
  message: {}
})

// Асинхронная операция - получение задач от сервера
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    // получаем данные
    const { data: todos } = await axios(SERVER_URL)
    // возвращаем задачи и сообщение об успехе операции
    return {
      todos,
      message: { type: 'success', text: 'Todos has been loaded' }
    }
  } catch (err) {
    console.error(err.toJSON())
    // возвращаем сообщение об ошибке
    return {
      message: { type: 'error', text: 'Something went wrong. Try again later' }
    }
  }
})

// Асинхронная операция - сохранение задач в БД
export const saveTodos = createAsyncThunk(
  'todos/saveTodos',
  async (newTodos) => {
    try {
      // получаем данные - существующие задачи
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

      // перебираем новые задачи и сравниваем их с существующими
      for (const todo of newTodos) {
        // если новой задачи нет среди существующих
        if (!existingTodos.find((_todo) => _todo.id === todo.id)) {
          // сохраняем ее в БД
          await axios.post(SERVER_URL, todo)
        }
      }
      // возвращаем сообщение об успехе операции
      return { type: 'success', text: 'Todos has been saved' }
    } catch (err) {
      console.error(err.toJSON())
      // возвращаем сообщение о провале операции
      return {
        type: 'error',
        text: 'Something went wrong. Try again later'
      }
    }
  }
)

// Асинхронная операция - задержка в 2 секунды
export const giveMeSomeTime = createAsyncThunk(
  'todos/giveMeSomeTime',
  async () =>
    await new Promise((resolve) => {
      const timerId = setTimeout(() => {
        resolve()
        clearTimeout(timerId)
      }, 2000)
    })
)

// Часть состояния для задач
const todoSlice = createSlice({
  // название
  name: 'todos',
  // начальное состояние в виде нормализованной структуры
  initialState: initialTodoState,
  // Обычные редукторы
  reducers: {
    // для добавления задачи
    addTodo: todoAdapter.addOne,
    // для обновления задачи
    updateTodo: todoAdapter.updateOne,
    // для удаления задачи
    removeTodo: todoAdapter.removeOne,
    // для завершения всех активных задач
    completeAllTodos(state) {
      Object.values(state.entities).forEach((todo) => {
        todo.done = true
      })
    },
    // для удаления завершенных задач
    clearCompletedTodos(state) {
      const completedTodoIds = Object.values(state.entities)
        .filter((todo) => todo.done)
        .map((todo) => todo.id)
      todoAdapter.removeMany(state, completedTodoIds)
    }
  },
  // Дополнительные редукторы для обработки результатов асинхронных операций
  extraReducers: (builder) => {
    builder
      // запрос на получение задач от сервера находится в процессе выполнения
      .addCase(fetchTodos.pending, (state) => {
        // обновляем индикатор загрузки
        state.status = 'loading'
      })
      // запрос выполнен
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        if (payload.todos) {
          // обновляем состояние задач
          todoAdapter.setAll(state, payload.todos)
        }
        // записываем сообщение
        state.message = payload.message
        // обновляем индикатор загрузки
        state.status = 'idle'
      })
      // запрос на сохранение задач в БД находится в процессе выполнения
      .addCase(saveTodos.pending, (state) => {
        // обновляем индикатор загрузки
        state.status = 'loading'
      })
      // запрос выполнен
      .addCase(saveTodos.fulfilled, (state, { payload }) => {
        // записываем сообщение
        state.message = payload
        // обновляем индикатор загрузки
        state.status = 'idle'
      })
      // запрос на задержку выполнен
      .addCase(giveMeSomeTime.fulfilled, (state) => {
        // очищаем сообщение
        state.message = {}
      })
  }
})

// Операции для работы с задачами
export const {
  addTodo,
  updateTodo,
  removeTodo,
  completeAllTodos,
  clearCompletedTodos
} = todoSlice.actions

// Начальное состояние фильтра
const initialFilterState = {
  status: 'all'
}

// Часть состояния для фильтра
const filterSlice = createSlice({
  // название
  name: 'filter',
  // начальное состояние
  initialState: initialFilterState,
  // обычные редукторы
  reducers: {
    // для установки фильтра
    setFilter(state, action) {
      state.status = action.payload
    }
  }
})

// Операция для установки фильтра
export const { setFilter } = filterSlice.actions

// Селекторы для выборки всех задач и общего количества задач
export const { selectAll, selectTotal } = todoAdapter.getSelectors(
  (state) => state.todos
)

// Селектор для выборки задач на основе текущего состояния фильтра
export const selectFilteredTodos = createSelector(
  selectAll,
  (state) => state.filter,
  (todos, filter) => {
    const { status } = filter
    if (status === 'all') return todos
    return status === 'active'
      ? todos.filter((todo) => !todo.done)
      : todos.filter((todo) => todo.done)
  }
)

// Селектор для выборки статистики
export const selectTodoStats = createSelector(
  selectAll,
  selectTotal,
  (todos, total) => {
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
)

// Хранилище
export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    filter: filterSlice.reducer
  }
})
