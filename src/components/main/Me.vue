<template lang="pug">
div#me
  md-whiteframe(v-if="!$store.state.auth.user")
    div.no-user(@click="$router.push('/signin')")
      div 点击此处进行登录
      md-icon keyboard_arrow_right
  md-whiteframe(v-if="!!$store.state.auth.user")
    div.user(@click="$router.push('/user-info')")
      img(:src="$store.state.auth.user.avatar")
      div.user-info
        div.name {{ $store.state.auth.user.nickname }}
        div.description {{ $store.state.auth.user.description }}
      md-icon keyboard_arrow_right
  md-whiteframe
    div.coupons-and-money
      div.coupons(@click="couponsList")
        p {{ $store.state.coupon.coupons.length || 0 }} 张
        p 优惠券
      div.divide-line
      div.money
        p ￥{{ $store.state.auth.user.money || 0 }}
        p 账户余额
  md-whiteframe
    div.orders
      div.title
        span 我的订单
      div.order-type
        div.type(@click="orderList('all')")
          md-button.md-icon-button.md-warn
            md-icon local_movies
          p 全部
        div.type(@click="orderList('unpay')")
          md-button.md-icon-button.md-accent
            md-icon shopping_cart
          p 待付款
        div.type(@click="orderList('unplay')")
          md-button.md-icon-button.md-primary
            md-icon slideshow
          p 未放映
        div.type(@click="orderList('played')")
          md-button.md-icon-button
            md-icon event_available
          p 已放映
  md-whiteframe
    div.collection
      div.collection-type(@click="movieCollection('favorites')")
        span 我的收藏
        md-icon keyboard_arrow_right
      div.collection-type(@click="movieCollection('wanna')")
        span 期待上映
        md-icon keyboard_arrow_right
      div.collection-type(@click="movieCollection('watched')")
        span 观影历史
        md-icon keyboard_arrow_right
  md-dialog-alert(md-title="Tips:", md-content="您还未进行登录！", md-ok-text="确认", ref="errDialog")
</template>

<script>
export default {
  name: 'me',
  created () {
    if (this.$store.state.auth.user && !this.$store.state.favorite.favoritesGot) {
      this.$store.dispatch('GET_FAVORITES')
    }
    if (this.$store.state.auth.user && !this.$store.state.favorite.historyGot) {
      this.$store.dispatch('GET_HISTORY_MOVIES')
    }
    this.$store.dispatch('GET_COUPONS')
  },
  methods: {
    // 查看优惠券列表
    couponsList () {
      if (this.$store.state.auth.user) {
        this.$router.push('/coupons')
      } else {
        this.$refs['errDialog'].open()
      }
    },

    // 查看订单列表
    orderList (type) {
      if (this.$store.state.auth.user) {
        this.$router.push('/my-orders/' + type)
      } else {
        this.$refs['errDialog'].open()
      }
    },

    // 收藏/想看/历史 电影列表
    movieCollection (type) {
      if (this.$store.state.auth.user) {
        this.$router.push('/movie-collection/' + type)
      } else {
        this.$refs['errDialog'].open()
      }
    }
  }
}
</script>

<style lang="sass">
#me
  .user, .coupons-and-money, .no-user
    background: white
    display: flex
    align-items: center
    padding: .1rem
    margin: .1rem 0
  .no-user
    div:first-child
      flex-grow: 1
      font-size: .18rem
      font-weight: 400
      height: .4rem
      line-height: .4rem
    .md-icon
      color: #888
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
  .orders, .collection
    background: white
    padding: .1rem
    margin: .1rem 0
  .orders
    .title
      font-size: .16rem
      font-weight: 200
      border-bottom: .01rem solid #e1e1e1
      padding: .08rem
    .order-type
      display: flex
      justify-content: space-around
      .type
        text-align: center
        p
          margin: 0
          font-size: .15rem
          font-weight: 200
  .collection
    padding: 0
    .collection-type
      display: flex
      align-items: center
      padding: .15rem
      border-bottom: .01rem solid #e1e1e1
      position: relative
      &:last-child
        border-bottom: none
        margin-bottom: 0
      span
        flex-grow: 1
        font-size: .2rem
        font-weight: 300
      .md-icon
        color: #888
</style>
