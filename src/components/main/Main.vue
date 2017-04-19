<template lang="pug">
div#main
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(v-if="isMoviesPage")
        md-icon
      h2.md-title {{ isMoviesPage ? '电影资讯' : '个人中心' }}
      md-button.md-icon-button(v-if="isMoviesPage" @click.native="$router.push('/movie-search')")
        md-icon search
  transition(name="slide")
    router-view.body
  md-bottom-bar(md-shift)
    md-bottom-bar-item(md-icon="ondemand_video" @click.native="goto('movies')" md-active) 电影
    md-bottom-bar-item(md-icon="person" @click.native="goto('me')") 我的
</template>

<script>
export default {
  name: 'main',
  data () {
    return {
      isMoviesPage: true
    }
  },
  methods: {
    goto (where) {
      this.$router.push('/main/' + where)
      this.isMoviesPage = (where === 'movies')
    }
  }
}
</script>

<style lang="sass">
#main
  position: relative
  height: 100%
  background: #eee
  overflow: hidden
  .md-toolbar
    position: absolute
    width: 100%
    top: 0
    height: .64rem
    .md-toolbar-container .md-title
      flex: 1
      text-align: center
  .md-bottom-bar
    position: absolute
    bottom: 0
    height: .54rem
  .body
    position: absolute
    top: .64rem
    bottom: .54rem
    width: 100%
    overflow: scroll
  .slide-enter-active, .slide-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  .slide-enter, .slide-leave-active
    transform: translateX(-100%)
    opacity: 0
</style>