<template lang="pug">
div#movie-comment
  md-toolbar
    div.md-toolbar-container
      h2.md-title 评价界面
</template>

<script>
export default {
  name: 'movie-comment'
}
</script>

<style lang="sass">
#movie-comment
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
</style>