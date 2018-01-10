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
      template: `
        <div id="movie-list">
          <div v-for="movie in movies" class="movie">{{ movie.title }}</div>
        </div>`,
      data: () => {
        return {
          movies: [
            { title: 'Pulp Fiction' },
            { title: 'Home Alone' },
            { title: 'Austin Powers' }
          ]
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
