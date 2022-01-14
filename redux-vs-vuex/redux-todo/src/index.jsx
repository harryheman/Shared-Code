import React, { StrictMode } from 'react'
import { render } from 'react-dom'
// Провайдер для передачи состояния в дочерние компоненты
import { Provider } from 'react-redux'
// Хранилище и операции для получения задач от сервера и выполнения задержки перед очисткой хранилища
import { store, fetchTodos, giveMeSomeTime } from './store'

// Основной компонент приложения
import App from './App'

// Отправляем в редуктор операцию для получения задач от сервера
// и следом за ней операцию для очистки сообщения с задержкой в 2 секунды
// store.dispatch(fetchTodos()).then(() => store.dispatch(giveMeSomeTime()))

render(
  <StrictMode>
    {/* Передаем хранилище в качестве пропа `store` */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
