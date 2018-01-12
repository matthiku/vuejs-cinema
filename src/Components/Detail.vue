<template>
  <div id="details" v-if="movie">
    <movie-item
        :movie="movie.movie"
      >
      <p>
        {{ movie.movie.Plot }}
      </p>
    </movie-item>
  </div>
</template>

<script>
import MovieItem from './MovieItem.vue'

export default {
  props: ['movies', 'movieId'],
  components: {
    MovieItem
  },
  computed: {
    movie () {
      let movie = this.movies.find(movie => movie.id === this.movieId)
      return movie ? movie : null
    }
  }
}
</script>
