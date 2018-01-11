import './style.scss'

import Vue from 'vue'

import MovieList from './Components/MovieList.vue'
import MovieFilter from './Components/MovieFilter.vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)

import moment from 'moment-timezone'
moment.tz.setDefault("UTZ")
// add moment to the Vue prototype, so that we can use it in all components!
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment }})

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: [],
    movies: [],
    moment,
    day: moment()
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
  },
  created () {
    this.$http.get('/api')
      .then(resp => {
        this.movies = resp.data
      })
  }
})
