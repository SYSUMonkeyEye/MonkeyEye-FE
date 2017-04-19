<template lang="pug">
div#me
  md-whiteframe
    div.user
      md-ink-ripple
      img(:src="user.image")
      div.user-info
        div.name {{ user.name }}
        div.description {{ user.description }}
      md-icon keyboard_arrow_right
  md-whiteframe
    div.coupons-and-money
      md-ink-ripple
      div.coupons
        p {{ couponsAndMoney.coupons }}
        p 优惠券
      div.divide-line
      div.money
        p {{ couponsAndMoney.money }}
        p 账户余额
  md-whiteframe
    div.orders
      div.title
        span 我的订单
        span 全部订单
</template>

<script>
export default {
  name: 'me',
  data () {
    return {
      user: {
        image: '/data/images/head-img.jpg',
        name: '风不定，人初静',
        description: '风不定，人初静，明日落红应满径。'
      },
      couponsAndMoney: {
        coupons: 10,
        money: 32.80
      }
    }
  }
}
</script>

<style lang="sass">
#me
  .user, .coupons-and-money
    background: white
    display: flex
    align-items: center
    padding: .1rem
    margin: .08rem 0
  .user
    img
      width: .65rem
      height: .65rem
      border-radius: 50%
      border: .01rem solid #eee
    .user-info
      flex-grow: 1
      padding-left: .1rem
      .name
        font-size: .18rem
        font-weight: 400
      .description
        font-size: .1rem
    .md-icon
      color: #888
  .coupons-and-money
    justify-content: space-around
    .coupons, .money
      padding: .1rem
      p
        line-height: .2rem
        color: #717171
        text-align: center
        margin: 0
        &:last-child
          font-size: .16rem
    .divide-line
      width: .01rem
      height: .5rem
      background: #717171
  .orders
    background: white
    padding: .1rem
    margin: .08rem 0
    .title
      font-size: .16rem
      font-weight: 200
      span:last-child
        float: right
</style>