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
    ul.orders-list
      li.order-item
        .type-container
          md-icon.md-warn.md-size-2x event_available
          span.type 已放映
        .info-container
          span.name 一条狗的使命
          span.ticket-count 2张
          .time 2017-06-01 17:00
        .btn-container
          md-button.md-raised.md-primary 写影评
      li.order-item
        .type-container
          md-icon.md-primary.md-size-2x slideshow
          span.type 未放映
        .info-container
          span.name 一条狗的使命
          span.ticket-count 2张
          .time 2017-06-01 17:00
      li.order-item
        .type-container
          md-icon.md-accent.md-size-2x shopping_cart
          span.type 待付款
        .info-container
          span.name 一条狗的使命
          span.ticket-count 2张
          .time 2017-06-01 17:00
        .btn-container
          md-button.md-raised.md-primary 去支付

</template>

<script>
export default {
  name: 'my-orders'
}
</script>

<style lang="sass">
#my-orders
  height: 100%
  background: #eeeeee
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
  .orders-container
    .orders-list
      margin: 0
      padding: 0
      .order-item
        display: flex
        align-items: center
        margin-top: .12rem
        padding: .16rem
        background: #ffffff
        list-style: none
        .type-container
          flex: 0 0 .5rem
          text-align: center
          .type
            color: #888888
        .info-container
          flex: 1
          padding-left: .2rem
          span
            display: inline-block
            font-size: .18rem
          .name
            color: #f44336
            margin-right: .05rem
          .ticket-count
            color: #888888
          .time
            margin-top: .05rem
            color: #888888


</style>
