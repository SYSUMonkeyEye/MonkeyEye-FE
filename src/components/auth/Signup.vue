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
        md-input(type='text' v-model="formData.phone")
        span.md-error {{err.phone}}
    md-list-item
      md-input-container
        md-icon code
        label 验证码
        md-input(type='text' v-model="formData.code")
        span.md-error {{err.code}}
      md-button.md-raised.md-primary#get-code(@click.native="getCode") {{msg}}
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
export default {
  name: 'signup',
  data () {
    return {
      msg: '获取验证码',
      canNext: false,
      time: 60,
      timer: null,
      formData: {
        phone: '',
        code: '',
        password: '',
        repeat: ''
      },
      err: {
        phone: '',
        code: '',
        password: '',
        repeat: ''
      }
    }
  },
  mounted () {
    this.getCodeBox = document.getElementById('get-code')
    this.nextBox = document.getElementById('next')
  },
  methods: {
    getCode () {
      if (!this.timer) {
        this.msg = this.time + 's后重新获取'
        this.timer = setInterval(() => {
          this.time--
          this.msg = this.time + 's后重新获取'
          if (this.time === 0) {
            this.time = 60
            this.msg = '获取验证码'
            clearInterval(this.timer)
            this.timer = null
            this.getCodeBox.style.backgroundColor = '#f44336'
          }
        }, 1000)
        this.getCodeBox.style.backgroundColor = 'gray'
      }
    },
    next () {
      if (this.canNext) {
        for (let key in this.err) this.err[key] = ''
        if (!this.formData.phone) {
          this.err.phone = '手机号不能为空'
        } else if (this.formData.phone.length !== 11) {
          this.err.phone = '手机号格式不正确'
        } else if (!this.formData.code) {
          this.err.code = '验证码不能为空'
        } else if (!this.formData.password) {
          this.err.password = '验证码不能为空'
        } else if (this.formData.password !== this.formData.repeat) {
          this.err.repeat = '两次密码不一致'
        } else {
          // 提交请求
          let err = {
            phone: '手机号已存在',
            code: '验证码错误'
          }
          if (err) {
            this.err.phoen = err.phone
            this.err.code = err.code
          } else {
            this.$router.push('/main')
          }
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
