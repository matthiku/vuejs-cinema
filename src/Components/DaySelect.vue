<template>
  <div id="day-select">
    <ul class="days">
      <li
          :class="{ day: true, active: isActive(day)}"
          v-for="(day, index) in days" :key="index"
          @click="selectDay(day)"
        >
        {{ formatDay(day) }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['selected'],

  data () {
    return {
      days: [0, 1, 2, 3, 4, 5, 6].map(
        num => this.$moment().add(num, 'd')
      )
    }
  },

  methods: {
    isActive (day) {
      return day.isSame(this.selected, 'd')
    },
    formatDay (raw) {
      if (raw.isSame(this.$moment(), 'day')) return 'Today'
      return raw.format('ddd DD/MM')
    },
    selectDay (day) {
      this.$bus.$emit('set-day', day)
    }
  }
}
</script>
