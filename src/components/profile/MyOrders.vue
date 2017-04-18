<template lang="pug">
div#my-orders
  md-toolbar
    div.md-toolbar-container
      h2.md-title 下单历史
</template>

<script>
export default {
  name: 'my-orders'
}
</script>

<style lang="sass">
#my-orders
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
</style>