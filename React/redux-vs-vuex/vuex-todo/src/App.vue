<template>
  <div class="container d-flex flex-column text-center mt-2 mb-2">
    <h1 class="mb-4">Modern Vuex Todo App</h1>
    <div class="d-flex gap-2 mb-2 align-items-center">
      <button class="btn btn-primary" @click="createManyTodos">Create</button>
      <p class="mb-0">many todos</p>
    </div>
    <div class="d-flex gap-2 mb-2 align-items-center">
      <button class="btn btn-primary" @click="updateAllTodos">Update</button>
      <p class="mb-0">all todos</p>
    </div>
    <New />
    <div
      v-if="message.text"
      class="alert position-fixed top-50 start-50 translate-middle"
      :class="messageClass"
      role="alert"
    >
      {{ message.text }}
    </div>
    <Loader v-if="status === 'loading'" />
    <template v-else-if="length">
      <Stats />
      <div class="row">
        <Filters />
        <List />
        <Controls />
      </div>
    </template>
    <div class="d-flex justify-content-end" v-else>
      <Controls />
    </div>
  </div>
</template>

<script>
// Компоненты приложения
import New from './components/New'
import Stats from './components/Stats'
import Filters from './components/Filters'
import List from './components/List'
import Controls from './components/Controls'
import Loader from './components/Loader'

// Тестирование
import { mapActions } from 'vuex'
import { nanoid } from 'nanoid'

export default {
  name: 'App',
  components: { New, Stats, Filters, List, Controls, Loader },
  computed: {
    // Вычисляем сообщение
    message() {
      return this.$store.state.message
    },
    // Вычисляем CSS-класс для сообщения
    messageClass() {
      return this.message.type === 'success' ? 'alert-success' : 'alert-danger'
    },
    // Получаем статус приложения
    status() {
      return this.$store.state.status
    },
    // Получаем длину массива с задачами
    length() {
      return this.$store.state.todos.length
    }
  },
  methods: {
    ...mapActions(['addTodo', 'updateTodo']),

    // Тестирование
    createManyTodos() {
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
          this.addTodo(todo)
        }
        const diff = Date.now() - start
        times.push(diff)
      }
      const time = times.reduce((a, c) => (a += c), 0) / 25
      console.log(time)
    },
    updateAllTodos() {
      const { todos } = this.$store.state
      const start = Date.now()
      for (let i = 0; i < 2500; i++) {
        this.updateTodo({ id: todos[i].id, changes: { done: true } })
      }
      const diff = Date.now() - start
      console.log(diff)
    }
  }
}
</script>

<style>
.container {
  max-width: 600px;
}
.alert {
  z-index: 1;
}
</style>
