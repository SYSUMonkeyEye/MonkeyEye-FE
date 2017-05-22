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
        md-input(type='text' v-model="$store.state.auth.formData.id")
        span.md-error {{$store.state.auth.err.id}}
    md-list-item
      md-input-container
        md-icon code
        label 验证码
        md-input(type='text' v-model="$store.state.auth.formData.smscode")
        span.md-error {{$store.state.auth.err.smscode}}
      md-button.md-raised.md-primary#get-code(@click.native="getCode") {{msg}}
    md-list-item
      md-input-container
        md-icon vpn_key
        label 支付密码
        md-input(type='payPassword' v-model="$store.state.auth.formData.payPassword")
        span.md-error {{$store.state.auth.err.password}}
    md-list-item
      md-input-container
        md-icon vpn_key
        label 密码
        md-input(type='password' v-model="$store.state.auth.formData.password")
        span.md-error {{$store.state.auth.err.password}}
    md-list-item
      md-input-container
        md-icon vpn_key
        label 重复密码
        md-input(type='password' v-model="$store.state.auth.formData.repeat")
        span.md-error {{$store.state.auth.err.repeat}}
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
      time: 10,
      timer: null
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
            this.time = 10
            this.msg = '获取验证码'
            clearInterval(this.timer)
            this.timer = null
            this.getCodeBox.style.backgroundColor = '#f44336'
          }
        }, 1000)
        this.getCodeBox.style.backgroundColor = 'gray'
        this.$store.dispatch('GET_SMS_CODE', this.$store.state.auth.formData.id)
      }
    },
    next () {
      let formData = this.$store.state.auth.formData
      let err = this.$store.state.auth.err
      if (this.canNext) {
        for (let key in err) err[key] = ''
        if (!formData.id) {
          err.id = '手机号不能为空'
        } else if (formData.id.length !== 11) {
          err.id = '手机号格式不正确'
        } else if (!formData.smscode) {
          err.smscode = '验证码不能为空'
        } else if (!formData.payPassword) {
          err.password = '支付密码不能为空'
        } else if (formData.password !== formData.repeat) {
          err.repeat = '两次密码不一致'
        } else {
          // 提交请求
          this.$store.dispatch('SIGN_UP', formData).then(() => {
            console.log(err)
//            this.$router.push('/main')
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
