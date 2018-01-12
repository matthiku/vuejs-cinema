<template>
  <div id="day-select">
    <ul class="days">
      <li
          :class="{ day: true, active: isActive(day)}"
          v-for="(day, index) in days" :key="index"
          @click="selectDay(day)"
        >
        {{ formatDay(day) }}
      </li>
      <li class="day-selector">
        <span :class="{dec: selectedIndex > 0}" @click="changeDay(-1)"></span>
        <span :class="{inc: selectedIndex < 6}" @click="changeDay(1)"></span>
      </li>
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

  computed: {
    selectedIndex () {
      let found = this.days.find(day => this.selected.isSame(day, 'd'))
      return this.days.indexOf(found)
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
    },
    changeDay (change) {
      let newDay = this.selected.clone().add(change, 'days')
      // make sure we remain within the list of predefined days
      if (this.days.find(day => newDay.isSame(day, 'd'))) {
        this.selectDay(newDay)
      }
    }
  }
}
</script>
