<template lang="pug">
div#user-info
  md-toolbar
    div.md-toolbar-container
      h2.md-title 用户信息界面
</template>

<script>
export default {
  name: 'user-info'
}
</script>

<style lang="sass">
#user-info
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
</style>