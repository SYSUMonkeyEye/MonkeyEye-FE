<template lang="pug">
div#signup
  md-toolbar
    div.md-toolbar-container
      h2.md-title 免费注册
  md-list
    md-list-item
      md-input-container
        md-icon phone
        label 手机号
        md-input(type='text' v-model="formData.id")
        span.md-error {{err.id}}
    md-list-item
      md-input-container
        md-icon code
        label 验证码
        md-input(type='text' v-model="formData.smscode")
        span.md-error {{err.smscode}}
      md-button.md-raised.md-primary#get-code(@click.native="getCode") {{msg}}
    md-list-item
      md-input-container
        md-icon vpn_key
        label 支付密码
        md-input(type='payPassword' v-model="formData.payPassword")
        span.md-error {{err.payPassword}}
    md-list-item
      md-input-container
        md-icon vpn_key
        label 密码
        md-input(type='password' v-model="formData.password")
        span.md-error {{err.password}}
    md-list-item
      md-input-container
        md-icon vpn_key
        label 重复密码
        md-input(type='password' v-model="formData.repeat")
        span.md-error {{err.repeat}}
    div#read-box
      md-checkbox.md-primary#check(v-model="canNext")
      p#read 已阅读并同意《猿眼电影服务协议》,愿意同步创建猿眼电影账号
    md-button.md-raised.md-primary(@click.native="next", :class="canNext ? '': 'inActive'")#next 下一步
</template>

<script>
import axios from 'axios'
import Form from '../../common/utils/Form'
export default {
  name: 'signup',
  data () {
    return {
      msg: '获取验证码',
      canNext: false,
      time: 10,
      timer: null,
      formData: {
        id: '',
        smscode: '',
        password: '',
        repeat: '',
        payPassword: ''
      },
      err: {
        id: '',
        smscode: '',
        password: '',
        payPassword: '',
        repeat: ''
      }
    }
  },
  mounted () {
    this.getCodeBox = document.getElementById('get-code')
    this.nextBox = document.getElementById('next')
  },
  methods: {
    reset () {
      for (let key in this.err) this.err[key] = ''
    },
    getCode () {
      this.reset()
      if (this.formData.id.length !== 11) {
        this.err.id = '手机号格式不正确'
        return
      }
      if (!this.timer) {
        this.msg = this.time + 's后重新获取'
        this.timer = setInterval(() => {
          this.time--
          this.msg = this.time + 's后重新获取'
          if (this.time === 0) {
            this.time = 10
            this.msg = '获取验证码'
            clearInterval(this.timer)
            this.timer = null
            this.getCodeBox.style.backgroundColor = '#f44336'
          }
        }, 1000)
        this.getCodeBox.style.backgroundColor = 'gray'
        axios.get('/api/smscode?mobile=' + this.formData.id).then(res => {
          res.status === 200 ? this.formData.smscode = res.data.message : this.err.id = res.data.message
        })
      }
    },
    next () {
      if (this.canNext) {
        for (let key in this.err) this.err[key] = ''
        if (!this.formData.id) {
          this.err.id = '手机号不能为空'
        } else if (this.formData.id.length !== 11) {
          this.err.id = '手机号格式不正确'
        } else if (!this.formData.smscode) {
          this.err.smscode = '验证码不能为空'
        } else if (!this.formData.payPassword) {
          this.err.payPassword = '支付密码不能为空'
        } else if (!this.formData.password) {
          this.err.password = '密码不能为空'
        } else if (this.formData.password !== this.formData.repeat) {
          this.err.repeat = '两次密码不一致'
        } else {
          // 提交请求
          var data = {}
          for (let key in this.formData) {
            if (key !== 'repeat') data[key] = this.formData[key]
          }
          axios(Form.postData('/api/users/', data)).then(res => {
            switch (res.data.message) {
              case '验证码非法':
              case '请先获取短信验证码':
              case '验证码错误':
                this.err.smscode = res.data.message
                break
              case '手机号已被注册':
                this.err.id = res.data.message
                break
              default:
                this.$store.dispatch('GET_USER').then(() => {
                  this.$router.push('/main/me')
                })
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
#signup
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
  #get-code
    z-index: 9999999
    width: 50%
    text-align: center
  #read-box
    padding-left: 0.2rem
    padding-right: 0.2rem
    position: relative
    #read
      display: inline-block
      position: absolute
      width: 80%
  #next
    display: block
    margin: 0.3rem auto
    width: 90%
.inActive
  background-color: gray !important
.md-error
  padding-top: 0.1rem
  color: red
  opacity: 1 !important
</style>
