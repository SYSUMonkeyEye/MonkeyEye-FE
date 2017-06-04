<template lang="pug">
div#order-pay
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(@click.native="$router.replace('/main/me')")
        md-icon keyboard_arrow_left
      h2.md-title 订单支付
      md-button.md-icon-button(disabled)
        md-icon
  div.group.timer-container
    md-icon.icon-payment(v-show="isValid && !isPay") watch_later
    md-icon.md-warn(v-show="!isValid") error_outline
    md-icon.icon-ok(v-show="isPay") check_circle
    div.info(v-show="isValid && !isPay")
      span 订单为你保留
      span.time {{ remainingTime }}
      span ，超时将自动取消
    div.info(v-show="!isValid")
      span 该订单已失效，请重新下单，
      span.time {{ countDown }}s
      span 后跳转至首页
    div.info(v-show="isPay")
      span 该订单已支付，请勿重复支付，
      span.time {{ countDown }}s
      span 后跳转至订单详情页面
  div.order-info-container.group(v-show="isValid && !isPay")
    div.group-item
      span.order-detail 订单详情
      div.group-item-right(@click="$router.push(`/order-detail/${$route.params.orderId}`)")
        md-icon keyboard_arrow_right
    div.group-item.available-coupon-container
      span 可用优惠券
      div.group-item-right.available-coupon(v-if="coupons.length > 0", @click="$router.push('/select-coupon')")
        span.coupon-count(v-if="!couponSelected.id") {{ coupons.length }}张可用
        span.coupon-count(v-else) 已选 满{{couponSelected.condition}}减{{couponSelected.discount}} 优惠券
        md-icon keyboard_arrow_right
      div.group-item-right.avaliable-coupon(v-else)
        span.coupon-count 无可用优惠券
    div.group-item
      span 订单金额
      span.total-price.group-item-right ￥{{ totalPrice }}
  div.footer(v-show="isValid && !isPay")
    div.actual-price 实际支付：
      span.price ￥{{ actualPrice }}
    md-button.md-primary.md-raised(@click.native="openPayDialog") 立即支付
  md-dialog#pay-dialog(ref="payDialog")
    md-dialog-title 请输入支付密码
    md-dialog-content
      div 您将支付
      div.money ￥{{ actualPrice }}
      password-input(ref="passwordInput", @complete="pay")
  md-dialog#paying-dialog(ref="payingDialog", :md-click-outside-to-close="false")
    md-dialog-content
      span.info 正在支付，请稍后...
      md-spinner.md-accent(:md-size="20", md-indeterminate)
  md-dialog#password-error-dialog(ref="passwordErrorDialog")
    md-dialog-content
      span.info 支付密码错误，请重试
    md-dialog-actions
      md-button.md-primary(@click.native="repay") 重试
  md-dialog#pay-error-dialog(ref="payErrorDialog")
    md-dialog-title  支付失败
    md-dialog-content {{ errorMessage }}
    md-dialog-actions
      md-button.md-primary(@click.native="$refs.payErrorDialog.close") 确定
</template>

<script>
import md5 from 'MD5'
import PasswordInput from './PasswordInput'
import { addZero } from '../../common/utils/DateUtils'

export default {
  name: 'order-pay',
  components: {
    PasswordInput
  },
  data () {
    return {
      remainingTime: '',
      isValid: true,
      isPay: false,
      countDown: 5,
      totalPrice: 0,
      errorMessage: '',
      timer: null,
      routeTimer: null
    }
  },
  computed: {
    order () {
      return this.$store.state.order.order
    },
    screen () {
      return this.$store.state.screen.screen
    },
    coupons () {
      return this.$store.getters.qualifiedCoupons
    },
    couponSelected () {
      return this.$store.state.coupon.couponSelected
    },
    actualPrice () {
      if (this.couponSelected.id) {
        return this.totalPrice - this.couponSelected.discount
      }
      return this.totalPrice
    }
  },
  created () {
    let orderId = this.$route.params.orderId
    this.$store.dispatch('GET_ORDER_INFO', orderId).then(() => {
      if (this.order.id) {
        // 订单已支付，则跳转至订单详情页面
        if (this.order.status) {
          this.isPay = true
          return
        }

        // 订单没有支付，获取场次信息，并开启支付倒计时
        this.$store.dispatch('GET_ONE_SCREEN', this.order.screenId).then(() => {
          this.calculateTotalPrice()
          this.$store.commit('SET_CONDITION', this.totalPrice)
        })

        this.$store.dispatch('GET_COUPONS')

        this.initTimer()
      } else {
        // 订单不存在，则跳转至首页
        this.isValid = false
      }
    })
  },
  methods: {
    initTimer () {
      let endTime = new Date(this.order.createTime)
      endTime.setMinutes(endTime.getMinutes() + 10)

      let nowTime = new Date()
      let delta = Math.floor((endTime.getTime() - nowTime.getTime()) / 1000)

      this.timer = setInterval(() => {
        if (delta > 0) {
          let min = Math.floor((delta / 60) % 60)
          let sec = Math.floor(delta % 60)

          this.remainingTime = addZero(min) + ':' + addZero(sec)

          delta -= 1
        } else {
          this.isValid = false
          clearInterval(this.timer)
        }
      }, 1000)
    },
    calculateTotalPrice () {
      this.totalPrice = this.order.seat.length * this.screen.price
    },
    openPayDialog () {
      this.$refs.passwordInput.clear()
      this.$refs.payDialog.open()

      setTimeout(function () {
        document.querySelector('.real-input').focus()
      }, 0)
    },
    pay (password) {
      this.$refs.payDialog.close()
      this.$refs.payingDialog.open()

      let orderId = this.$route.params.orderId

      let pay = {
        orderId: orderId,
        payPassword: md5(password)
      }

      if (this.couponSelected.id) {
        pay.couponSelected = this.couponSelected.id
      }

      this.$store.dispatch('PAY_ORDER', pay).then((res) => {
        this.$refs.payingDialog.close()
        if (res.status === 200) {
          if (res.data.coupon) {
            this.$store.commit('ADD_COUPON', res.data.coupon)
          }

          this.$store.commit('PAY', this.actualPrice)
          this.$store.dispatch('GET_ADD_ORDER', orderId)

          this.$router.push(`/order-detail/${orderId}`)
        } else if (res.data.message === '支付密码错误') {
          this.$refs.passwordErrorDialog.open()
        } else {
          this.errorMessage = res.data.message
          this.$refs.payErrorDialog.open()
        }
      })
    },
    repay () {
      this.$refs.passwordErrorDialog.close()
      this.openPayDialog()
    },
    routeToAfterSec (url) {
      this.countDown = 5
      this.routeTimer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--
        } else {
          clearInterval(this.routeTimer)
          this.$router.push(url)
        }
      }, 1000)
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.routeTimer) {
      clearInterval(this.routeTimer)
    }
  },
  watch: {
    isValid (isValid) {
      if (!isValid) {
        this.routeToAfterSec('/main/movies')
      }
    },
    isPay (isPay) {
      if (isPay) {
        let orderId = this.$route.params.orderId
        this.routeToAfterSec(`/order-detail/${orderId}`)
      }
    }
  }
}
</script>

<style lang="sass">
@import "../../common/sass/footer"
@import "../../common/sass/group"

$inline-border-color: #eeeeee
$primary-color: #e53935

#order-pay
  min-height: 100%
  overflow: scroll
  background: #eee

  .group
    @include group()

  .timer-container
    margin-top: 0
    padding: .16rem
    display: flex
    align-items: center
    .icon-payment
      color: #aaaaaa
    .icon-ok
      color: #1aad19
    .info
      flex: 1
      padding-left: .12rem
    .time
      color: $primary-color

  .order-info-container
    .group-item
      @include group-item
      span
        height: .24rem
        line-height: .24rem
      .md-icon
        color: #666666
      .group-item-right
        flex: 1
        text-align: right
      .total-price
        color: $primary-color
      .coupon-count
        display: inline-block
        vertical-align: top

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

#pay-dialog
  .md-dialog-title
    padding: .1rem .16rem
    margin-bottom: .06rem
    border-bottom: .01rem solid $inline-border-color
    font-size: .16rem
  .md-dialog-content
    text-align: center
    .money
      margin-top: .06rem
      font-size: .2rem
      color: $primary-color
      margin-bottom: .1rem

#paying-dialog
  .info
    display: inline-block
    margin-right: .1rem
    line-height: .2rem
    font-size: .16rem
    transform: translate3d(0, 0, 0)
  .md-spinner
    vertical-align: middle

#password-error-dialog
  .md-dialog-content
    padding-bottom: .12rem
    font-size: .16rem
</style>
