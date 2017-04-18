<template lang="pug">
div#main
  router-view
  md-bottom-bar(md-shift)
    md-bottom-bar-item(md-icon="ondemand_video" @click.native="goto('movies')") 电影
    md-bottom-bar-item(md-icon="photo" @click.native="goto('me')") 我的
</template>

<script>
export default {
  name: 'main',
  methods: {
    goto (where) {
      this.$router.replace('/main/' + where)
    }
  }
}
</script>

<style lang="sass">
#main
  height: 100%
  background: #eee
  .md-bottom-bar
    position: fixed
    bottom: 0
</style>