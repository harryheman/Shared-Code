<template>
  <div class="col-6">
    <h3>Todos</h3>
    <ul v-show="todos.length">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="list-group-item d-flex align-items-center"
      >
        <Regular :todo="todo" v-if="!todo.edit" />
        <Edit :todo="todo" v-else />
      </li>
    </ul>
  </div>
</template>

<script>
// Утилита для привязки геттеров к компоненту
import { mapGetters } from 'vuex'
// Компонент для обычной задачи
import Regular from './Regular'
// Компонент для редактируемой задачи
import Edit from './Edit'

export default {
  name: 'List',
  components: { Regular, Edit },
  computed: {
    // Привязываем геттер к компоненту
    ...mapGetters({ todos: 'filteredTodos' })
  }
}
</script>
