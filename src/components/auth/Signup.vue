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
        md-input(type='text')
        span.md-error Validation message
    md-list-item
      md-input-container
        md-icon code
        label 验证码
        md-input(type='text')
        span.md-error Validation message
      md-button.md-raised.md-primary#get-code(@click.native="getCode") {{msg}}
    md-list-item
      md-input-container
        md-icon vpn_key
        label 密码
        md-input(type='text')
        span.md-error Validation message
    md-list-item
      md-input-container
        md-icon vpn_key
        label 重复密码
        md-input(type='text')
        span.md-error Validation message
    div#read-box
      md-checkbox.md-primary(v-model="canNext")
        span#read 已阅读并同意《猿眼电影服务协议》,愿意同步创建猿眼电影账号
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
        console.log('下一步')
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
    #read
      text-align: center
  .md-checkbox-container
      width: 24px !important
      height: 20px !important
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
