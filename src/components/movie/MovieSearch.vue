<template lang="pug">
div#movie-search
  md-toolbar
    div.md-toolbar-container
      h2.md-title 电影搜索界面
</template>

<script>
export default {
  name: 'movie-search'
}
</script>

<style lang="sass">
#movie-search
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
</style>