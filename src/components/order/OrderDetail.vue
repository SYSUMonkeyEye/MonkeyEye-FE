<template lang="pug">
div#order-detail
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(@click.native="back()")
        md-icon keyboard_arrow_left
      h2.md-title 订单详情
      md-button.md-icon-button(disabled)
        md-icon
  div.group.timer-container(v-show="!isValid")
    md-icon.md-warn error_outline
    div.info
      span 该订单已失效或不存在，
      span.time {{ countDown }}s
      span 后跳转至个人订单页面
  div.group.movie-detail-container(v-show="isValid")
    div.movie-detail
      div.name {{ movie.name }} {{ screen.playingType }}
      div.time {{ screen.playingTime }} {{ screen.playingDate }}
      div.place 广州金逸珠江国际影城 {{ screen.hallNum }}号厅
    div.seats-selected
      md-chip(v-for="(seat, i) in order.seat", :key="i") {{ (convert2D(seat)).row }}排{{ (convert2D(seat)).column}}座
  div.order-detail-container.group(v-show="isValid")
    div.order-status.group-item
      span 当前状态
      span.status(v-if="order.status") 支付成功
      span.status(v-else) 待支付
    div.order-create-time.group-item
      span 下单时间
      span.create-time {{ order.createTime | formatDate }} {{ order.createTime | formatTime }}
    div.order-actual-pay.group-item(v-if="order.status")
      span 实际付款
      span.actual-price ￥{{ order.payPrice }}
  div.footer(v-show="isValid")
    md-button.md-primary.md-raised(v-if="!order.status", @click.native="$router.push(`/order-pay/${order.id}`)") 去支付

</template>

<script>
import { formatDate, getTime } from '../../common/utils/DateUtils'

export default {
  name: 'order-detail',
  data () {
    return {
      rows: 10,
      columns: 12,
      isValid: true,
      countDown: 5,
      timer: null
    }
  },
  computed: {
    movie () {
      return this.$store.state.screen.screen.movie
    },
    order () {
      return this.$store.state.order.order
    },
    screen () {
      return this.$store.state.screen.screen
    }
  },
  created () {
    let orderId = this.$route.params.orderId
    this.$store.dispatch('GET_ORDER_INFO', orderId).then(() => {
      if (this.order.id) {
        this.$store.dispatch('GET_ONE_SCREEN', this.order.screenId)
      } else {
        // 订单不存在，则跳转至首页
        this.isValid = false
      }
    })
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    routeToAfterSec (url) {
      this.countDown = 5
      this.timer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--
        } else {
          clearInterval(this.timer)
          this.$router.push(url)
        }
      }, 1000)
    },
    convert2D (num) {
      let row = Math.floor((num - 1) / this.columns) + 1
      let column = (num - 1) % this.columns + 1
      return {
        row,
        column
      }
    },
    back () {
      if (this.order.status) {
        this.$router.push('/main/me')
      } else {
        this.$router.back()
      }
    }
  },
  watch: {
    isValid (isValid) {
      if (!isValid) {
        this.routeToAfterSec('/my-orders/all')
      }
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
@import "../../common/sass/chip"
@import "../../common/sass/group"
@import "../../common/sass/footer"

$inline-border-color: #eeeeee
$primary-color: #e53935

#order-detail
  height: 100%
  background: #eee

  .group
    @include group()
    .group-item
      @include group-item

  .timer-container
    margin-top: 0
    padding: .16rem
    display: flex
    align-items: center
    .info
      flex: 1
      padding-left: .12rem
    .time
      color: $primary-color

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

  .order-detail-container
    .status, .create-time, .actual-price
      flex: 1
      text-align: right
    .status, .actual-price
      color: #e53935
    .create-time
      color: #666666

  .footer
    @include footer
    button
      @include footer-btn

</style>
