<template lang="pug">
div#movie-collection
  md-toolbar
    div.md-toolbar-container
      h2.md-title 收藏/想看/等等
</template>

<script>
export default {
  name: 'movie-collection'
}
</script>

<style lang="sass">
#movie-collection
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
</style>