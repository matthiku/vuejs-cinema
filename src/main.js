import './style.scss'

import Vue from 'vue'

import genres from './util/genres'

import MovieList from './Components/MovieList.vue'
import MovieFilter from './Components/MovieFilter.vue'

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
    MovieList,
    MovieFilter
  }
})
