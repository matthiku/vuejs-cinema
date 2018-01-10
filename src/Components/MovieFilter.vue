<template>
  <div id="movie-filter">
    <h2>Filter Results</h2>
    <div class="filter-group">
      <check-filter
          v-for="(genre, index) in genres"
          :key="index"
          :genre="genre"
          v-on:check-filter="checkFilter"
        >
      </check-filter>
    </div>
  </div>
</template>

<script>
import genres from '../util/genres'
import CheckFilter from './CheckFilter.vue'

export default {
  data () {
    return {
      genres
    }
  },
  methods: {
    checkFilter (payload) {
      this.$emit('check-filter', payload)
    }
  },
  components: {
    CheckFilter
  }
}
</script>
