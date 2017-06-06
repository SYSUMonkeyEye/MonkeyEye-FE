<template lang="pug">
div#main
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(v-if="$route.path === '/main/movies'")
        md-icon
      h2.md-title {{ $route.path === '/main/movies' ? '电影资讯' : '个人中心' }}
      md-button.md-icon-button(v-if="$route.path === '/main/movies'", @click.native="$router.push('/movie-search')")
        md-icon search
  transition(name="slide")
    router-view.body
  md-bottom-bar(md-shift)
    md-bottom-bar-item(md-icon="ondemand_video", @click.native="$router.replace('/main/movies')", :md-active="$route.path === '/main/movies'") 电影
    md-bottom-bar-item(md-icon="person", @click.native="$router.replace('/main/me')", :md-active="$route.path === '/main/me'") 我的
</template>

<script>
export default {
  name: 'main'
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
    transition: all .2s ease-out
  .slide-enter#me, .slide-leave-active#me
    transform: translateX(100%)
    opacity: 0
  .slide-leave-active#movies, .slide-enter#movies
    transform: translateX(-100%)
    opacity: 0
</style>
