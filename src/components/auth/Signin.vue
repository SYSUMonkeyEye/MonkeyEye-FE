<template lang="pug">
div#signin
  md-toolbar
    div.md-toolbar-container
      h2.md-title 账户登录
  form#form(novalidate, @submit.stop.prevent='submit')
    md-input-container
      md-icon phone
      label 手机号
      md-input(type='text' required)
      span.md-error Validation message
    md-input-container
      md-icon vpn_key
      label 输入密码
      md-input(type='password' required)
      span.md-error Validation message
  md-button.md-raised.md-primary#login(@click.native="signIn") 登录
  p.forget(@click="forget")   忘记密码
  p.sign-up(@click="signUp") 还没有账号？立即注册

</template>

<script>
export default {
  name: 'signin',
  methods: {
    signIn () {
      console.log('登录')
    },
    forget () {
      console.log('忘记密码')
    },
    signUp () {
      this.$router.push('/signUp')
    }
  }
}
</script>

<style lang="sass">
#signin
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
  #form
    width: 80%
    margin: 0 auto
  #login
    display: block
    width: 90%
    margin: 0.5rem auto 0 auto
  .forget
    text-align: end
    padding-right: 0.3rem
  .sign-up
    text-align: center
    text-decoration: underline
    color: #3f51b5
</style>
