<template>
  <div id="movie-filter">

    <h2>Filter Results</h2>

    <h3>By Time of Day</h3>
    <div class="filter-group">
      <check-filter
          v-for="(time, index) in times"
          :key="index"
          :filter="time"
          type="time"
          v-on:check-filter="checkFilter"
        >
      </check-filter>
    </div>

    <h3>By Genre</h3>
    <div class="filter-group">
      <check-filter
          v-for="(genre, index) in genres"
          :key="index"
          :filter="genre"
          type="genre"
          v-on:check-filter="checkFilter"
        >
      </check-filter>
    </div>

  </div>
</template>

<script>
import genres from '../util/genres'
import times from '../util/times'
import CheckFilter from './CheckFilter.vue'

export default {
  data () {
    return {
      times,
      genres,
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
