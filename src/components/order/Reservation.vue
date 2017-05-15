<template lang="pug">
div#reservation
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(@click.native="$router.back()")
        md-icon keyboard_arrow_left
      h2.md-title 确认订单
  div.group.movie-detail-container
    div.movie-detail
      div.name 拆弹专家 粤语2D
      div.time 今天 5月8日 18:20
      div.place 广州金逸珠江国际影城 7号厅
    div.seats-selected
      md-chip 17排3座
      md-chip 17排3座
      md-chip 7排3座
      md-chip 7排3座
  div.pay-info-container.group
    div.group-item
      span 手机
      span.user-phone.group-item-right 15521146027
    div.group-item
      span 票价总计
      span.total-price.group-item-right ￥39
    div.group-item.available-coupon-container
      span 可用优惠券
      div.group-item-right.available-coupon
        span.coupon-count 3张可用
        md-icon keyboard_arrow_right
  div.group.notice-container
    div.notice-title 购票需知
    div.notice-content
      ol.notice-list
        li 请确认场次和时间无误，购买成功后将不予退换。
        li 由于影院系统不稳定等因素，存在出票失败的情况，会进行退票退款。
        li 下单即代表你同意
          span.service 《猿眼电影服务协议》
          |。
  div.footer
    div.actual-price 实际支付：
      span.price ￥29
    md-button.md-primary.md-raised(@click.native="$router.push(`/order-pay/1`)") 立即下单
</template>

<script>
export default {
  name: 'reservation'
}
</script>

<style lang="sass">
@import "../../common/sass/chip"
@import "../../common/sass/footer"
@import "../../common/sass/group"

$inline-border-color: #eeeeee

#reservation
  min-height: 100%
  overflow: scroll
  background: #eee

  .group
    @include group()

  .movie-detail-container
    .movie-detail
      display: flex
      align-items: center
      flex-direction: column
      border-bottom: .01rem dashed #cccccc
      .name
        padding-top: .08rem
        font-size: .16rem
        color: #e53935
      .time
        padding-top: .06rem
      .place
        padding: .06rem 0 .10rem

    .seats-selected
      display: flex
      justify-content: center
      padding: .1rem 0
      .md-chip
        @include chip

  .pay-info-container
    .available-coupon-container
      span
        height: .24rem
        line-height: .24rem

    .group-item
      @include group-item
      .group-item-right
        flex: 1
        text-align: right
      .user-phone, .available-coupon
        color: #666666
      .total-price
        color: #e53935
      .coupon-count
        display: inline-block
        vertical-align: top

  .notice-container
    padding: .16rem
    margin-bottom: 1.2rem
    .notice-title
      font-size: .16rem
      padding-bottom: .1rem
      border-bottom: .01rem solid $inline-border-color
    .notice-list
      margin: 0
      padding: .06rem 0 0 .16rem
      li
        padding: .04rem 0 0
      .service
        color: #e53935

  .footer
    @include footer
    background: #ffffff
    .actual-price
      line-height: .22rem
      margin: 0 0 .1rem
    .price
      font-size: .20rem
      color: #e53935
    button
      @include footer-btn
</style>
