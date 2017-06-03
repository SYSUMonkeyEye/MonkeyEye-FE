<template lang="pug">
div#app
  router-view
</template>

<script>
export default {
  name: 'app',
  created () {
    this.$store.dispatch('GET_USER')
  }
}
</script>

<style lang="sass">
html, body, #app
  height: 100%
  margin: 0
  padding: 0
  overflow-x: hidden
html
  font-size: 100px
</style>
