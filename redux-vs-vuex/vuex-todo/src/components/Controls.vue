<template>
  <div class="col-3 d-flex flex-column">
    <h3>Controls</h3>
    <template v-if="length">
      <button @click="completeTodos" class="btn btn-info mb-2">Complete</button>
      <button @click="clearCompleted" class="btn btn-danger mb-2">Clear</button>
    </template>
    <button @click="saveTodos" class="btn btn-success">Save</button>
  </div>
</template>

<script>
// Утилита для привязки операций к методам компонента
import { mapActions } from 'vuex'

export default {
  name: 'Controls',
  computed: {
    // Вычисляем длину массива с задачами
    length() {
      return this.$store.state.todos.length
    }
  },
  methods: {
    // Привязываем операции к методам компонента
    ...mapActions(['completeTodos', 'clearCompleted', 'saveTodos'])
  }
}
</script>
