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
    div.no-data(v-else)
      md-icon sentiment_neutral
      p 暂无优惠券
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
  .no-data
    text-align: center
    margin-top: 1.5rem
    color: #888
    .md-icon
      font-size: 1rem
      height: auto
      width: auto
    p
      font-size: .2rem
</style>
