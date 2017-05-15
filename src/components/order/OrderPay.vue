<template lang="pug">
div#order-pay
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(@click.native="$router.back()")
        md-icon keyboard_arrow_left
      h2.md-title 订单支付
  div.group.timer-container
    md-icon.icon-payment watch_later
    div.info
      span 订单为你保留
      span.time 15:01
      span ，超时将自动取消
  div.order-info-container.group
    div.group-item
      span.order-detail 订单详情
      div.group-item-right
        md-icon keyboard_arrow_right
    div.group-item
      span 订单金额
      span.total-price.group-item-right ￥29
  div.footer
    md-button.md-primary.md-raised(@click.native="openPayDialog") 立即支付
  md-dialog#pay-dialog(ref="payDialog")
    md-dialog-title 请输入支付密码
    md-dialog-content
      div 您将支付
      div.money ￥55
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
</template>

<script>
import PasswordInput from './PasswordInput'

export default {
  name: 'order-pay',
  components: {
    PasswordInput
  },
  methods: {
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
      // 测试支付密码错误
      let self = this.$refs
      setTimeout(function () {
        self.payingDialog.close()
        self.passwordErrorDialog.open()
      }, 2000)
    },
    repay () {
      this.$refs.passwordErrorDialog.close()
      this.openPayDialog()
    }
  }
}
</script>

<style lang="sass">
$inline-border-color: #eeeeee
$outline-border-color: #cccccc

#order-pay
  min-height: 100%
  overflow: scroll
  background: #eee
  .group
    margin-top: .16rem
    background: #ffffff
    padding: .14rem
  .timer-container
    margin-top: 0
    display: flex
    align-items: center
    .icon-payment
      color: #aaaaaa
    .info
      flex: 1
      padding-left: .12rem
      font-size: .16rem
    .time
      color: #e53935
  .order-info-container
    padding-left: 0
    padding-right: 0
    .group-item
      display: flex
      font-size: .16rem
      padding: .14rem
      border-bottom: .01rem solid $inline-border-color
      &:first-child
        padding-top: 0
      &:last-child
        border: none
        padding-bottom: 0
      .group-item-right
        flex: 1
        text-align: right
      .total-price
        color: #e53935
      span
        height: .24rem
        line-height: .24rem
        color: #666666
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
      color: #e53935
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
