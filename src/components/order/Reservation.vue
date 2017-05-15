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
      md-chip 7排3座
      md-chip 7排3座
      md-chip 7排3座
      md-chip 7排3座
  div.pay-info-container.group
    div.group-item
      span 手机
      span.user-phone 15521146027
    div.group-item
      span 票价总计
      span.total-price ￥39
    div.group-item
      span 可用优惠券
      div.group-item-right.available-coupon
        span.coupon-count 3张可用
        md-icon keyboard_arrow_right
  div.group.notice-container
    div.notice-title 购票需知
    div.notice-content
      ol
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
$inline-border-color: #eeeeee
$outline-border-color: #cccccc

#reservation
  min-height: 100%
  overflow: scroll
  background: #eee
  .group
    margin-top: .12rem
    background: #ffffff
  .movie-detail-container
    .movie-detail
      display: flex
      align-items: center
      flex-direction: column
      border-bottom: .01rem dashed $outline-border-color
      .name
        padding: .08rem 0 0
        color: #e53935
        font-size: .16rem
      .time
        padding: .06rem 0 0
      .place
        padding: .06rem 0 .10rem
    .seats-selected
      display: flex
      justify-content: center
      padding: .1rem 0
      .md-chip
        height: 26px
        padding: 5px 12px
        margin: 0 .05rem
        font-size: .12rem
        border-radius: .05rem
  .pay-info-container
    padding: 0
    .group-item
      display: flex
      padding: .12rem .16rem
      border-bottom: .01rem solid $inline-border-color
      &:last-child
        border: none
      .user-phone, .total-price, .group-item-right
        flex: 1
        text-align: right
      .user-phone
        color: #666666
      .total-price
        color: #e53935
      .available-coupon
        color: #666666
        i
          vertical-align: top
        .coupon-count
          display: inline-block
          line-height: .24rem
          height: .24rem
  .notice-container
    padding: .16rem
    margin-bottom: 1.2rem
    .notice-title
      font-size: .16rem
      padding-bottom: .1rem
      border-bottom: .01rem solid $inline-border-color
    ol
      margin: 0
      padding: .06rem 0 0 .16rem
      li
        padding: .04rem 0 0
      .service
        color: #e53935
  .footer
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    padding: .1rem
    text-align: center
    background: #ffffff
    border-top: .01rem solid $inline-border-color
    box-shadow: 0 -.01rem .01rem #eaeaea
    .actual-price
      line-height: .22rem
      margin: 0 0 .1rem
    .price
      font-size: .20rem
      color: #e53935
    button
      display: block
      width: 100%
      margin: 0
      padding: .02rem .16rem
      font-size: .16rem
</style>
