<template lang="pug">
div#signin
  md-toolbar
    div.md-toolbar-container
      h2.md-title 账户登录
  form#form(novalidate, @submit.stop.prevent='submit')
    md-input-container
      md-icon phone
      label 手机号
      md-input(type='text', required, v-model="formData.phone")
      span.md-error {{err.phone}}
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
      formData: {
        phone: '',
        password: ''
      },
      err: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      this.err.phone = this.err.password = ''
      if (!this.formData.phone) {
        this.err.phone = '电话不能为空'
      } else if (this.formData.phone.length !== 11) {
        this.err.phone = '电话格式不正确'
      } else if (!this.formData.password) {
        this.err.password = '密码不能为空'
      } else {
        // 登录请求
        let err = {
          phone: '用户名不存在',
          password: '密码错误，请重试'
        }
        if (!err) {
          this.err.phone = err.phone
          this.err.password = err.password
        } else {
          // 登录成功
          this.$router.push('/main')
        }
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
