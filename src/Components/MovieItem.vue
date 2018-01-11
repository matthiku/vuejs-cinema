<template>
  <div class="movie">

    <div class="movie-col-left">
      <img :src="movie.Poster" alt="poster">
    </div>

    <div class="movie-col-right">

      <div class="movie-title">
        <h2>{{ movie.Title }}</h2>
        <span class="movie-rating">{{ movie.Rated }}</span>
      </div>

      <div class="movie-sessions">
        <div class="session-time-wrapper" v-for="(session, index) in filteredSessions" :key="index">
          <div class="session-time">{{ formatSessionTime(session.time) }}</div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import times from '../util/times'

export default {
  props: ['movie', 'sessions', 'day', 'time'],

  methods: {
    formatSessionTime (raw) {
      return this.$moment(raw).format('H:mm')
    },
    sessionPassesTimeFilter (session) {
      // check if session time is on the given day
      let sessionTime = this.$moment(session.time)
      if (!sessionTime.isSame(this.day, 'day')) { return false }
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
    filteredSessions () {
      return this.sessions.filter(session => this.sessionPassesTimeFilter(session))
    }
  }
}
</script>
