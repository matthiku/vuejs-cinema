<template>
  <div class="check-filter" :class="{active: checked}" @click="checkFilter">
    <span class="checkbox"></span>
    <span class="check-filter-title">{{ filter }}</span>
  </div>
</template>

<script>
export default {
  props: ['filter', 'type'],
  data () {
    return {
      checked: false
    }
  },
  methods: {
    checkFilter () {
      this.checked = !this.checked
      this.$emit('check-filter', {
        type: this.type,
        name: this.filter,
        state: this.checked
      })
    }
  }
}
</script>
