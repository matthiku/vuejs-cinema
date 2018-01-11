<template>
  <div id="movie-list">

    <movie-item
        v-for="movie in filteredMovies"
        :key="movie.id"
        :movie="movie.movie"
        :sessions="movie.sessions"
        :day="day"
        :time="time"
        >
    </movie-item>

    <div class="no-results" v-if="!movies.length">Loading ...</div>
    <div class="no-results" v-else-if="!filteredMovies.length">No results for {{ filterList }}.</div>

  </div>
</template>

<script>
import MovieItem from './MovieItem.vue'
import times from '../util/times'

export default {
  props: ['genre', 'time', 'movies', 'day'],
  components: {
    MovieItem
  },
  methods: {
    moviePassesGenreFilter (movie) {
      // show all if the filter is empty
      if (!this.genre.length) { return true }
      // check if one of the genres in the movie genre list is in the list of genre filters
      let movieGenres = movie.movie.Genre
      let matched = true
      this.genre.forEach(genre => {
        if (movieGenres.indexOf(genre) < 0) {
          matched = false
        }
      })
      return matched
    },
    sessionPassesTimeFilter (session) {
      // check if session time is on the given day
      let sessionTime = this.$moment(session.time)
      if (!this.day.isSame(sessionTime, 'day')) { return false }
      // show all if the filter is empty or if both are checked
      if (this.time.length === 0 || this.time.length === 2) { return true }
      // check if session time is before or after the given filter time
      if (this.time[0] === times.AFTER_6PM) {
        return sessionTime.hour() >= 18
      }
      return sessionTime.hour() < 18
    }
  },
  computed: {
    filteredMovies () {
      return this.movies
        .filter(this.moviePassesGenreFilter)
        .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter))
    },
    filterList  () {
      let list = this.time.concat(this.genre).join(', ')
      return list
    }
  }
}
</script>
