<template lang="pug">
div#movie-detail
  md-toolbar
    div.md-toolbar-container
      h2.md-title 电影详情界面
</template>

<script>
export default {
  name: 'movie-detail'
}
</script>

<style lang="sass">
#movie-detail
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
</style>