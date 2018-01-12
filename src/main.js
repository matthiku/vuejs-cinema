import './style.scss'

import Vue from 'vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './util/routes'
const router = new VueRouter({ routes })

import moment from 'moment-timezone'
moment.tz.setDefault("UTZ")
// add moment to the Vue prototype, so that we can use it in all components!
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment }})

// import the event listeners
import { checkFilter, setDay } from './util/bus';
// add a global event bus to the VUE project
const bus = new Vue()
Object.defineProperty(Vue.prototype, '$bus', { get () { return this.$root.bus }})

new Vue({
  el: '#app',
  router,
  data: {
    genre: [],
    time: [],
    movies: [],
    bus,
    moment,
    day: moment()
  },
  created () {
    this.$http.get('/api')
      .then(resp => {
        this.movies = resp.data
      })
    // register global bus events
    this.$bus.$on('check-filter', checkFilter.bind(this))
    this.$bus.$on('set-day', setDay.bind(this))
  }
})
