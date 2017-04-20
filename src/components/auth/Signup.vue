<template lang="pug">
div#signup(@click="getCode")
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
      md-button.md-raised.md-primary#get-code(@click="getCode") {{msg}}
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
      md-checkbox.md-primary
        span#read 已阅读并同意《猿眼电影服务协议》,愿意同步创建猿眼电影账号
    md-button.md-raised.md-primary#next 下一步
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
      msg: '获取验证码'
    }
  },
  methods: {
    getCode () {
      console.log('2312')
    }
  }
}
</script>

<style lang="sass">
#signup
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
  #get-code
    z-index: 999
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
</style>
