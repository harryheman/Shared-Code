<template>
  <input
    type="checkbox"
    :checked="todo.done"
    @change="completeTodo"
    class="form-check-input"
  />
  <p class="flex-grow-1 m-0" :class="todoClass">
    {{ todo.text }}
  </p>
  <button @click="editTodo" class="btn btn-outline-info" :disabled="todo.done">
    <i class="bi bi-pencil"></i>
  </button>
  <button @click="removeTodo(todo)" class="btn btn-outline-danger">
    <i class="bi bi-trash"></i>
  </button>
</template>

<script>
// Утилита для привязки операций к методам компонента
import { mapActions } from 'vuex'

export default {
  name: 'Regular',
  props: ['todo'],
  computed: {
    // Вычисляем дополнительный CSS-класс для задачи
    todoClass() {
      return this.todo.done ? 'text-muted text-decoration-line-through' : ''
    }
  },
  methods: {
    // Привязываем операции к методам компонента
    ...mapActions(['updateTodo', 'removeTodo']),
    // Метод для изменения индикатора завершенности задачи
    completeTodo() {
      this.updateTodo({ id: this.todo.id, changes: { done: !this.todo.done } })
    },
    // Метод для изменения индикатора редактирования задачи
    editTodo() {
      this.updateTodo({ id: this.todo.id, changes: { edit: !this.todo.edit } })
    }
  }
}
</script>
