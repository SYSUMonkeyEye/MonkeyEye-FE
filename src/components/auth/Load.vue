<template lang="pug">
  #loading
    md-spinner#loading(md-indeterminate, v-show="loading && !done")
    md-button.md-fab.md-primary#done(v-show="loading && done")
      md-icon done
</template>
<script>
export default {
  name: 'loading',
  props: ['loading', 'done']
}
</script>
<style scoped lang="sass">
  #loading
    width: 50px
    height: 50px
    position: fixed
    left: 50%
    transform: translateX(-50%) !important;
    top: 50%
    #done
      position: absolute
      top: 0.15rem
      left: -0.1rem
</style>
