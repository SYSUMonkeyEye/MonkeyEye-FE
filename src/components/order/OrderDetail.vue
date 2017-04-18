<template lang="pug">
div#order-detail
  md-toolbar
    div.md-toolbar-container
      h2.md-title 订单详情界面
</template>

<script>
export default {
  name: 'order-detail'
}
</script>

<style lang="sass">
#order-detail
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
</style>