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
    md-list.md-triple-line
      Coupons(v-for="coupon in coupons", :coupon="coupon")
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
</style>
