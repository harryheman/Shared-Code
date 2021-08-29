<template>
  <div class="row">
    <h3>Statistics</h3>
    <table class="table text-center">
      <thead>
        <tr>
          <th scope="col" v-for="(_, name, index) in todoStats" :key="index">
            {{ `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}` }}
          </th>
        </tr>
        <tr>
          <td v-for="(val, _, index) in todoStats" :key="index">{{ val }}</td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
// Утилита для привязки геттеров к компоненту
import { mapGetters } from 'vuex'

export default {
  name: 'Stats',
  computed: {
    // Привязываем геттер к компоненту
    ...mapGetters(['todoStats'])
  }
}
</script>
