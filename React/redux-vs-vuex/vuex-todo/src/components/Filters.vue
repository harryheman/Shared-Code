<template>
  <div class="col-3">
    <h3>Filters</h3>
    <div
      v-for="filter in ['all', 'active', 'completed']"
      :key="filter"
      class="form-check text-left"
    >
      <input
        :id="filter"
        type="radio"
        :checked="filter === currentFilter"
        @click="setFilter(filter)"
        class="form-check-input"
      />
      <label :for="filter" class="form-check-label">
        {{ filter.toUpperCase() }}
      </label>
    </div>
  </div>
</template>

<script>
// Утилита для привязки операций к методам компонента
import { mapActions } from 'vuex'

export default {
  name: 'Filters',
  computed: {
    // Получаем текущее значение фильтра
    currentFilter() {
      return this.$store.state.filter
    }
  },
  methods: {
    // Привязываем операцию к методу компонента
    ...mapActions(['setFilter'])
  }
}
</script>

<style scoped>
.text-left {
  text-align: left !important;
}
</style>
