<template>
  <form @submit.prevent="addTodoMethod" class="d-flex mb-4">
    <input
      type="text"
      placeholder="What needs to be done?"
      class="form-control flex-grow-1"
      v-model="text"
    />
    <button class="btn btn-outline-success">
      <i class="bi bi-plus-square"></i>
    </button>
  </form>
</template>

<script>
// Утилита для привязки операций к методам компонента
import { mapActions } from 'vuex'
// Утилита для генерации уникальных идентификаторов
import { nanoid } from 'nanoid'

export default {
  name: 'New',
  data() {
    // Локальное состояние для текста новой задачи
    return {
      text: ''
    }
  },
  methods: {
    // Привязываем операцию к методу компонента
    ...mapActions(['addTodo']),
    // Метод для добавления новой задачи
    addTodoMethod() {
      const trimmed = this.text.replace(/\s{2,}/g, ' ').trim()
      if (!trimmed) return
      const todo = {
        id: nanoid(5),
        text: trimmed,
        done: false,
        edit: false
      }
      this.addTodo(todo)
      this.text = ''
    }
  }
}
</script>
