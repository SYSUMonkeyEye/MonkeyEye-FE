<template lang="pug">
div#select-coupon
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(@click.native="$router.back()")
        md-icon keyboard_arrow_left
      h2.md-title 选择优惠券
      md-button.md-icon-button(disabled)
        md-icon
  div.coupons-container
    md-list.md-triple-line
      Coupon(v-for="coupon in coupons", :coupon="coupon",
        :key="coupon.id"
        :isSelect="true", @couponSelected="selectCoupon")
</template>

<script>
import Coupon from '../profile/Coupon'

export default {
  name: 'select-coupon',
  components: {
    Coupon
  },
  computed: {
    coupons () {
      return this.$store.getters.qualifiedCoupons
    }
  },
  methods: {
    selectCoupon (coupon) {
      this.$store.commit('SET_COUPON_SELECTED', coupon)
    }
  }
}
</script>

<style lang="sass">
</style>
