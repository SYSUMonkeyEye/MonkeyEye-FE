<template lang="pug">
div#me
  md-toolbar
    div.md-toolbar-container
      h2.md-title 个人中心
</template>

<script>
export default {
  name: 'me'
}
</script>

<style lang="sass">
#me
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
</style>