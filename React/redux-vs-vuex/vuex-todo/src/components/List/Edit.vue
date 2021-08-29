<template>
  <input type="text" v-model="newText" class="form-control flex-grow-1" />
  <button @click="finishEdit" class="btn btn-outline-success">
    <i class="bi bi-check"></i>
  </button>
  <button @click="cancelEdit" class="btn btn-outline-warning">
    <i class="bi bi-x-square"></i>
  </button>
</template>

<script>
// Утилита для привязки операций к методам компонента
import { mapActions } from 'vuex'

export default {
  name: 'Edit',
  props: ['todo'],
  data() {
    // Локальное состояние для текста редактируемой задачи
    return {
      newText: this.todo.text
    }
  },
  // Регистрируем обработчик нажатия клавиш клавиатуры при монтировании компонента
  created() {
    window.addEventListener('keydown', this.onKeyDown)
  },
  // Удаляем обработчик нажатия клавиш клавиатуры при размонтировании компонента
  unmounted() {
    window.removeEventListener('keydown', this.onKeyDown)
  },
  methods: {
    // Привязываем операции к методам компонента
    ...mapActions(['updateTodo', 'removeTodo']),
    // Обработчик нажатия клавиш клавиатуры
    onKeyDown({ key }) {
      switch (key) {
        // Если нажата клавиша `Enter`, вызываем метод для завершения редактирования
        case 'Enter':
          this.finishEdit()
          break
        // Если нажата клавиша `Escape`, вызываем метод для отмены редактирования
        case 'Escape':
          this.cancelEdit()
          break
        default:
          break
      }
    },
    // Метод для завершения редактирования
    finishEdit() {
      const text = this.newText.replace(/\s{2,}/g, ' ').trim()
      if (!text) return this.removeTodo(this.todo)
      this.updateTodo({
        id: this.todo.id,
        changes: { text, edit: !this.todo.edit }
      })
    },
    // Метод для отмены редактирования
    cancelEdit() {
      this.updateTodo({ id: this.todo.id, changes: { edit: !this.todo.edit } })
    }
  }
}
</script>
