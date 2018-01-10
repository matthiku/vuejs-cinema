<template>
  <div class="check-filter" :class="{active: checked}" @click="checkFilter">
    <span class="checkbox"></span>
    <span class="check-filter-title">{{ genre }}</span>
  </div>
</template>

<script>
export default {
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
  }
}
</script>
