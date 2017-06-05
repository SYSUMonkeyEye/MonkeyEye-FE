<template lang="pug">
div#user-info
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(@click.native="$router.back()")
        md-icon keyboard_arrow_left
      h2.md-title 用户信息
      md-button.md-icon-button(disabled)
        md-icon
  md-whiteframe
    div.collection
      div.user-info.head(@click="change('head', '头像')")
        span 用户头像
        img(:src="user.avatar")
      div.user-info(@click="change('nickname', '昵称')")
        span 昵称
        span.info {{user.nickname}}
      div.user-info(@click="change('description', '个性签名')")
        span 个性签名
        span.info {{user.description}}
      div.user-info
        span 手机号
        span.info {{user.id}}
      div.user-info(@click="change('login', '登录密码')")
        span 登录密码
        span.info ••••••
      div.user-info(@click="change('pay', '支付密码')")
        span 支付密码
        span.info ••••••
  md-button.md-raised.md-primary#logout(@click.native="logout") 退出登录
  md-dialog-confirm(md-title='确定退出当前用户？', md-content-html=" " md-ok-text='确定', md-cancel-text='取消', @close='confirm', ref='dialog')
</template>

<script>
export default {
  name: 'user-info',
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    change (type, name) {
      this.$router.push({
        path: '/change-info',
        query: {
          type: type,
          name: name
        }
      })
    },
    confirm (type) {
      if (type === 'ok') {
        this.$store.dispatch('LOGOUT').then(() => {
          this.$router.push('/main/me')
          this.$store.commit('INIT_FAV_STATE')
          this.$store.commit('INIT_COUPON_STATE')
          this.$store.commit('INIT_ORDER_STATE')
        })
      }
    },
    logout () {
      this.$refs.dialog.open()
    }
  }
}
</script>

<style lang="sass">
#user-info
  height: 100%
  background: #eee
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
  .collection
    margin-top: 0.15rem
  .user-info
    background: white
    display: flex
    align-items: center
    padding: .15rem
    border-bottom: .01rem solid #e1e1e1
    position: relative
    img
      width: .65rem
      height: .65rem
      border-radius: 50%
      border: .01rem solid #eee
    &:last-child
      border-bottom: none
      margin-bottom: 0
    span
      flex-grow: 1
      font-size: .2rem
      font-weight: 300
    .info
      display: flex
      justify-content: flex-end
  #logout
    display: block
    margin: 0.5rem auto 0
    width: 98%
</style>
