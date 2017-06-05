<template lang="pug">
div#coupons
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(@click.native="$router.back()")
        md-icon keyboard_arrow_left
      h2.md-title 优惠券
      md-button.md-icon-button(disabled)
        md-icon
  div.coupons-tainer
    md-list.md-triple-line(v-if="coupons.length != 0")
      Coupons(v-for="coupon in coupons", :coupon="coupon", :key="coupon.id")
    div#noData(v-else) 暂无优惠券
</template>

<script>
import Coupons from './Coupon.vue'
export default {
  name: 'coupons',
  components: {
    Coupons: Coupons
  },
  computed: {
    coupons () {
      return this.$store.state.coupon.coupons
    }
  },
  created () {
    this.$store.dispatch('GET_COUPONS')
  }
}
</script>

<style lang="sass">
#coupons
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
  #noData
    color: #f44336
    text-align: center
    font-size: 0.4rem
    margin-top: 0.5rem
</style>
