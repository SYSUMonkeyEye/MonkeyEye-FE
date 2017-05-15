<template lang="pug">
div#order-detail
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(@click.native="$router.back()")
        md-icon keyboard_arrow_left
      h2.md-title 订单详情
  div.movie-info-container.group
    div.movie-poster
      img(:src="movie.poster")
    div.movie-detail
      div.name 拆弹专家 粤语2D
      div.time 2017年5月8日 18:20
      div.place 广州金逸珠江国际影城 7号厅
      div.seats-selected
        md-chip 17排3座
        md-chip 17排3座
        md-chip 17排3座
        md-chip 17排3座
  div.order-detail-container.group
    div.order-status.group-item
      span 当前状态
      span.status 支付成功
    div.order-create-time.group-item
      span 下单时间
      span.create-time 2017-06-08 11:00
    div.order-actual-pay.group-item
      span 实际付款
      span.actual-price ￥29
  div.footer
    md-button.md-primary.md-raised(@click.native="") 去支付

</template>

<script>
export default {
  name: 'order-detail',
  computed: {
    movie () {
      return this.$store.state.screen.screen.movie
    }
  }
}
</script>

<style lang="sass">
@import "../../common/sass/chip"
@import "../../common/sass/group"
@import "../../common/sass/footer"

$inline-border-color: #eeeeee

#order-detail
  height: 100%
  background: #eee

  .group
    @include group()
    .group-item
      @include group-item

  .movie-info-container
    display: flex
    padding: .14rem .08rem
    .movie-poster
      img
        width: .8rem
    .movie-detail
      flex: 1
      padding-left: .1rem
      .name
        margin-bottom: .08rem
        font-size: .16rem
        color: #e53935
      .time
        margin-bottom: .08rem
      .seats-selected
        padding: .08rem 0 0
        .md-chip
          @include chip
          margin: 0 .06rem 0 0
          padding: .05rem .08rem
          &:last-child
            margin: 0

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
