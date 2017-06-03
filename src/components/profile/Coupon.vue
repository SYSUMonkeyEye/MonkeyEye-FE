<template lang="pug">
md-list-item.coupon-container(@click.native="selectCoupon")
  img(src="../../assets/images/coupon.png", width="48")
  .md-list-text-container
    span 有效期至：{{coupon.expiredTime | formatDate}}
    span 在线支付专享
  div.discount-container
    div.discount ¥
      span {{coupon.discount}}
    div.condition 满{{coupon.condition}}可用
  md-divider
</template>

<script>
import { formatDate } from '../../common/utils/DateUtils'

export default {
  name: 'coupon',
  props: {
    coupon: {
      type: Object,
      required: true
    },
    isSelect: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectCoupon () {
      if (this.isSelect) {
        this.$emit('couponSelected', this.coupon)
        this.$router.back()
      }
    }
  },
  filters: {
    formatDate (timestamp) {
      return formatDate(timestamp)
    }
  }
}
</script>

<style lang="sass">
.coupon-container
  .md-list-text-container
    margin-left: .15rem
  .discount-container
    display: flex
    flex-direction: column
    justify-content: center
  .discount
    height: .4rem
    line-height: .4rem
    text-align: center
    color: #f44336
    span
      font-size: .4rem
  .condition
    height: .24rem
    line-height: .24rem
    color: #f44336
</style>
