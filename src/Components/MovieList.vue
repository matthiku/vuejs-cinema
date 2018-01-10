<template>
  <div id="movie-list">
    <div
        v-for="(movie, index) in filteredMovies"
        :key="index"
        class="movie">
      {{ movie.title }}
    </div>
  </div>
</template>

<script>
import genres from '../util/genres'

export default {
  props: ['genre', 'time'],
  data: () => {
    return {
      movies: [
        { title: 'Pulp Fiction', genre: genres.CRIME },
        { title: 'Home Alone', genre: genres.COMEDY },
        { title: 'Austin Powers', genre: genres.COMEDY }
      ]
    }
  },
  methods: {
    moviePassesGenreFilter (movie) {
      // show all if the filter is empty
      if (!this.genre.length) { return true }
      // check if the genre of the movie is in the list of filters
      return this.genre.find(genre => movie.genre === genre)
    }
  },
  computed: {
    filteredMovies () {
      return this.movies.filter(this.moviePassesGenreFilter)
    }
  }
}
</script>
