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

// import the event listeners
import { checkFilter } from './util/bus';

// add a global event bus to the VUE project
const bus = new Vue()
Object.defineProperty(Vue.prototype, '$bus', { get () { return this.$root.bus }})

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: [],
    movies: [],
    bus,
    moment,
    day: moment()
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
    // register global bus events
    this.$bus.$on('check-filter', checkFilter.bind(this))
  }
})
