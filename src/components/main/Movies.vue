<template lang="pug">
div#movies
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button
        md-icon menu
      h2.md-title 电影资讯
      md-button.md-icon-button(@click.native="$router.replace('/movie-search')")
        md-icon search
</template>

<script>
export default {
  name: 'movies'
}
</script>

<style lang="sass">
#movies
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
</style>