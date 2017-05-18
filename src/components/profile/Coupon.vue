<template lang="pug">
  md-list-item
    md-icon.md-size-3x.md-primary subscriptions
    .md-list-text-container
      span 有效期至：{{item.time}}
      span 在线支付专享
    .div#info
      div#discount ¥
        span {{item.discount}}
      div#full 满{{item.full}}可用
    md-divider.md-inset
</template>
<script>
  export default {
    name: 'coupon',
    props: ['item'],
    data () {
      return {
        a: 1
      }
    }
  }
</script>
<style lang="sass" scoped>
#discount
  color: #f44336
  span
    font-size: 0.4rem
#full
  color: #f44336
</style>
