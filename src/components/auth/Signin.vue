<template lang="pug">
div#signin
  md-toolbar
    div.md-toolbar-container
      h2.md-title 账户登录
  form#form(novalidate, @submit.stop.prevent='submit')
    md-input-container
      md-icon phone
      label 手机号
      md-input(type='text', required, v-model="formData.id")
      span.md-error {{err.id}}
    md-input-container
      md-icon vpn_key
      label 输入密码
      md-input(type='password', required, v-model="formData.password")
      span.md-error {{err.password}}
  md-button.md-raised.md-primary#login(@click.native="signIn") 登录
  p.forget(@click="forget")   忘记密码
  p.sign-up(@click="signUp") 还没有账号？立即注册

</template>

<script>
export default {
  name: 'signin',
  data () {
    return {
      test: '123',
      err: this.$store.state.auth.signInErr,
      formData: this.$store.state.auth.signInData
    }
  },
  methods: {
    signIn () {
      if (!this.formData.id) {
        this.err.id = '电话不能为空'
      } else if (this.formData.id.length !== 11) {
        this.err.id = '电话格式不正确'
      } else if (!this.formData.password) {
        this.err.password = '密码不能为空'
      } else {
        // 登录请求
        this.$store.dispatch('SIGN_IN', this.formData).then(() => {
          if (!this.err.password && !this.err.id) {
            this.$router.push('/main/me')
          }
        })
      }
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

<style lang="sass" scoped>
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
.md-error
  padding-top: 0.1rem
  color: red
  opacity: 1 !important
</style>
