<template lang="pug">
div#signin
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(@click.native="$router.back()")
        md-icon keyboard_arrow_left
      h2.md-title 账户登录
      md-button.md-icon-button(disabled)
        md-icon
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
  p.sign-up(@click="signUp") 还没有账号？立即注册
  load(:loading="loading", :done="done")
</template>

<script>
import axios from 'axios'
import Form from '../../common/utils/Form'
import load from './Load.vue'
import md5 from 'MD5'
export default {
  name: 'signin',
  components: {
    load: load
  },
  data () {
    return {
      loading: false,
      done: false,
      test: '123',
      err: {
        password: '',
        id: ''
      },
      formData: {
        id: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      this.err.id = this.err.password = ''
      if (!this.formData.id) {
        this.err.id = '电话不能为空'
      } else if (this.formData.id.length !== 11) {
        this.err.id = '电话格式不正确'
      } else if (!this.formData.password) {
        this.err.password = '密码不能为空'
      } else {
        // 登录请求
        this.loading = true
        let d1 = new Date().getTime()
        let data = {
          id: this.formData.id,
          password: md5(this.formData.password)
        }
        axios(Form.postData('/api/session/', data)).then(res => {
          let d2 = new Date().getTime()
          setTimeout(() => {
            switch (res.data.message) {
              case '密码错误':
                this.err.password = '密码错误'
                this.loading = false
                break
              case '用户不存在':
                this.err.id = '用户不存在'
                this.loading = false
                break
              default:
                this.done = true
                setTimeout(() => {
                  this.$store.dispatch('GET_USER').then(() => {
                    this.$router.replace('/main/me')
                  })
                }, 500)
            }
          }, d2 - d1 < 1000 ? 1000 : 0)
        })
      }
    },
    forget () {
      this.$router.push({
        path: '/password',
        query: {
          action: 'forget',
          type: 'login'
        }
      })
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
