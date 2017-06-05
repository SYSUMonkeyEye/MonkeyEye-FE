<template lang="pug">
div#my-orders
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(@click.native="$router.back()")
        md-icon keyboard_arrow_left
      h2.md-title 订单列表
      md-button.md-icon-button(disabled)
        md-icon
  div.orders-container
    md-list.orders-list(v-if="orders && orders.length")
      md-list-item.order-item(v-for="order in orders", :key="order.id"
        @click.native="$router.push(`/order-detail/${order.id}`)")
        .type-container(v-if="order._status === 'played'")
          md-icon.md-warn.md-size-2x event_available
          span.type 已放映
        .type-container(v-else-if="order._status === 'unplay'")
          md-icon.md-primary.md-size-2x slideshow
          span.type 未放映
        .type-container(v-else-if="order._status === 'unpay'")
          md-icon.md-accent.md-size-2x shopping_cart
          span.type 待付款
        .info-container
          span.name {{ order.name }}
          span.ticket-count {{ order.seat.length }}张
          .time {{ order.screenTime | formatDate }} {{ order.screenTime | formatTime }}
        .btn-container(v-if="order._status === 'played'")
          md-button.md-raised.md-primary(@click.native.stop="$router.push(`/movie-comment/${order.movieId}?name=${order.name}`)") 写影评
        .btn-container(v-else-if="order._status === 'unpay'")
          md-button.md-raised.md-primary(@click.native.stop="$router.push(`/order-pay/${order.id}`)") 去支付
    div.no-order(v-else) 暂无任何
      span {{ typeMap[type]}}
      | 的订单

</template>

<script>
import { formatDate, getTime } from '../../common/utils/DateUtils'

export default {
  name: 'my-orders',
  data () {
    return {
      type: '',
      typeMap: {
        'unplay': '未放映',
        'played': '已放映',
        'unpay': '未支付'
      }
    }
  },
  created () {
    this.type = this.$route.params.type
    this.$store.dispatch('GET_ALL_ORDERS')
  },
  computed: {
    orders () {
      if (this.type === 'all') {
        return this.validOrders
      }

      return this.validOrders.filter((order) => {
        return order._status === this.type
      })
    },
    validOrders () {
      this.$store.commit('REMOVE_UNVALID_ORDERS')
      return this.$store.state.order.orders
    }
  },
  filters: {
    formatDate (timestamp) {
      return formatDate(timestamp)
    },
    formatTime (timestamp) {
      return getTime(timestamp)
    }
  }
}
</script>

<style lang="sass">
#my-orders
  position: relative
  min-height: 100%
  background: #eeeeee
  .md-toolbar
    position: fixed
    width: 100%
    top: 0
    .md-toolbar-container .md-title
      flex: 1
      text-align: center
  .orders-container
    padding-top: .64rem
    .orders-list
      margin: 0
      padding: 0
      background: transparent
      .order-item
        margin-top: .1rem
        padding-top: .12rem
        padding-bottom: .12rem
        background: #ffffff
      .md-list-item-container
        justify-content: flex-start
      .type-container
        display: flex
        flex-direction: column
        .type
          height: .14rem
          line-height: .14rem
          text-align: center
          font-size: .14rem
          color: #888888
      .info-container
        flex: 1
        padding-left: .2rem
        span
          display: inline-block
          font-size: .18rem
          height: .18rem
          line-height: .18rem
        .name
          color: #f44336
          margin-right: .1rem
        .ticket-count
          color: #888888
        .time
          height: .18rem
          line-height: .18rem
          color: #888888

    .no-order
      padding: .12rem .16rem
      margin-top: .1rem
      text-align: center
      background: #ffffff

      span
        color: #e53935


</style>
