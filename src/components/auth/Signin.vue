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
    md-button.md-raised.md-primary#login 登录

</template>

<script>
export default {
  name: 'signin'
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
      width: 80%
      margin: 0 auto
</style>
