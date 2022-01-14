import { createApp } from 'vue'
// Основной компонент приложения
import App from './App.vue'
// Хранилище
import store from './store'
// Получаем задачи от сервера
// store.dispatch('fetchTodos')

createApp(App).use(store).mount('#app')
