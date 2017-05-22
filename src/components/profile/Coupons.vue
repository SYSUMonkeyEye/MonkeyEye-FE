<template lang="pug">
div#coupons
  md-toolbar
    div.md-toolbar-container
      h2.md-title 优惠券
  div.phone-viewport
    md-list.custom-list.md-triple-line
      Coupons(v-for="list in lists", :item="list")
</template>

<script>
import Coupons from './Coupon.vue'
export default {
  name: 'coupons',
  components: {
    Coupons: Coupons
  },
  data () {
    return {
      lists: [
        {
          time: '2017-05-19', discount: 4, full: 32
        },
        {
          time: '2017-05-20', discount: 5, full: 34
        },
        {
          time: '2017-05-21', discount: 6, full: 36
        },
        {
          time: '2017-05-22', discount: 7, full: 40
        },
        {
          time: '2017-05-25', discount: 8, full: 42
        }
      ]
    }
  }
}
</script>

<style lang="sass">
#coupons
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
</style>
