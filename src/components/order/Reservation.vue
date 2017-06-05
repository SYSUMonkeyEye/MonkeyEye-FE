<template lang="pug">
div#reservation
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(@click.native="$router.back()")
        md-icon keyboard_arrow_left
      h2.md-title 确认订单
      md-button.md-icon-button(disabled)
        md-icon
  div.group.movie-detail-container
    div.movie-detail
      div.name {{ movie.name }} {{ screen.playingType }}
      div.time {{ screen.playingTime }} {{ screen.playingDate }}
      div.place 广州金逸珠江国际影城 {{ screen.hallNum }}号厅
    div.seats-selected
      md-chip(v-for="(seat, i) in seatsSelected", :key="i") {{ (convert2D(seat)).row }}排{{ (convert2D(seat)).column}}座
  div.pay-info-container.group
    div.group-item
      span 手机
      span.user-phone.group-item-right {{ user.id }}
    div.group-item
      span 票价总计
      span.total-price.group-item-right ￥{{ totalPrice }}
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
    md-button.md-primary.md-raised(@click.native="createOrder") 立即下单
  md-dialog#order-error-dialog(ref="orderErrorDialog")
    md-dialog-title 下单失败
    md-dialog-content {{ errorMessage }}
    md-dialog-actions
      md-button.md-primary(@click.native="closeDialog('orderErrorDialog')") 确定

</template>

<script>
export default {
  name: 'reservation',
  computed: {
    movie () {
      return this.$store.state.screen.screen.movie
    },
    screen () {
      return this.$store.state.screen.screen
    },
    seatsSelected () {
      return this.$store.state.screen.seatsSelected
    },
    totalPrice () {
      return this.seatsSelected.length * this.screen.price
    },
    user () {
      return this.$store.state.auth.user
    }
  },
  data () {
    return {
      rows: 10,
      columns: 12,
      errorMessage: ''
    }
  },
  methods: {
    convert2D (num) {
      let row = Math.floor((num - 1) / this.columns) + 1
      let column = (num - 1) % this.columns + 1
      return {
        row,
        column
      }
    },
    createOrder () {
      this.$store.dispatch('CREATE_ORDER', {
        screenId: this.$route.params.screenId,
        seat: this.seatsSelected.join(',')
      }).then((res) => {
        if (res.status === 200) {
          this.$store.commit('RESET_COUPON_SELECTED')
          this.$store.dispatch('GET_ADD_ORDER', res.data.id)

          this.$router.push(`/order-pay/${res.data.id}`)
        } else {
          this.errorMessage = res.data.message
          this.$refs.orderErrorDialog.open()
        }
      })
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    }
  }
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

    .group-item
      @include group-item
      .group-item-right
        flex: 1
        text-align: right
      .user-phone
        color: #666666
      .total-price
        color: #e53935

  .notice-container
    padding: .16rem
    margin-bottom: .7rem
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
    button
      @include footer-btn

#order-error-dialog
  .md-dialog-content
    padding-bottom: 0
</style>
