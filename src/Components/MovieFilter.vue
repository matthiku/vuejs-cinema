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
  components: {
    CheckFilter
  }
}
</script>
