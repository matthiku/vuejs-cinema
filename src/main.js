import './style.scss'

import Vue from 'vue'

import genres from './util/genres'

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: []
  },
  methods: {
    checkFilter (filter) {
      if (filter.state) {
        this[filter.type].push(filter.name)
      } else {
        this[filter.type].splice(this[filter.type].indexOf(filter.name), 1)
      }
    }
  },
  components: {
    'movie-list': {
      props: ['genre', 'time'],
      template: `
        <div id="movie-list">
          <div v-for="movie in filteredMovies" class="movie">{{ movie.title }}</div>
        </div>`,
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
    },
    'movie-filter' : {
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
      template: `
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
      `,
      components: {
        'check-filter': {
          props: ['genre'],
          data () {
            return {
              checked: false
            }
          },
          methods: {
            checkFilter () {
              this.checked = !this.checked
              this.$emit('check-filter', {type: 'genre', name: this.genre, state: this.checked})
            }
          },
          template: `
            <div class="check-filter" :class="{active: checked}" @click="checkFilter">
              <span class="checkbox"></span>
              <span class="check-filter-title">{{ genre }}</span>
            </div>
          `
        }
      }
    }
  }
})
