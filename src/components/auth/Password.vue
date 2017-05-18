<template lang="pug">
div#signin
  md-toolbar
    div.md-toolbar-container
      h2.md-title {{action == 'forget' ? '忘记': '修改'}}{{type == 'login' ? '登录': '支付'}}密码
  form#form(novalidate, @submit.stop.prevent='submit')
    md-input-container
      md-icon phone
      label 手机号
      md-input(type='text', required, v-model="formData.id")
      span.md-error {{err.id}}
    md-input-container
      md-icon vpn_key
      label 输入新{{type == 'login' ? '登录': '支付'}}密码
      md-input(type='password', required, v-model="formData.password")
      span.md-error {{err.password}}
  md-button.md-raised.md-primary#submit(@click.native="submit") 提交
</template>
<script>
  import axios from 'axios'
  import Form from '../../utils/Form'
  export default {
    name: 'forget',
    data () {
      return {
        action: this.$route.query.action,
        type: this.$route.query.type,
        formData: {
          password: '',
          id: ''
        },
        err: {
          password: '',
          id: ''
        }
      }
    },
    methods: {
      submit () {
        this.reset()
        if (!this.formData.password) {
          this.err.password = '密码不能为空'
        } else {
          axios(Form.postData('/api/password/loginPassword', this.formData)).then(res => {
            console.log(res.data.message)
          })
        }
      },
      reset () {
        this.err.id = this.err.password = ''
      }
    }
  }
</script>
<style lang="sass" scoped>
.md-toolbar .md-toolbar-container .md-title
  flex: 1
  text-align: center
#form
  width: 80%
  margin: 0 auto
  .md-error
    padding-top: 0.1rem
    color: red
    opacity: 1 !important
#submit
  display: block
  width: 90%
  margin: 0.5rem auto 0 auto
</style>
