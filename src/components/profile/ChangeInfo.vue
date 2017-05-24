<template lang="pug">
  div#change-info
    md-toolbar
      div.md-toolbar-containe
        h2.md-title 修改{{name}}
    form.form(v-if="type == 'image'")
      label 选择头像
      span.md-error {{err}}
    form.form(v-else, novalidate, @submit.stop.prevent='submit')
      div(v-if="type == 'login' || type == 'pay'")
        md-input-container
          md-icon keyboard
          label 输入旧{{name}}
          md-input(type='password', required, v-model="val.old")
          span.md-error {{err.old}}
        md-input-container  
          md-icon keyboard
          label 输入新的{{name}}
          md-input(type='password', required, v-model="val.new")
          span.md-error {{err.new}}
        md-input-container  
          md-icon keyboard
          label 重复新的{{name}}
          md-input(type='password', required, v-model="val.repeat")
          span.md-error {{err.repeat}}
      dev(v-else)    
        md-input-container
          md-icon settings
          label 输入新的{{name}}
          md-input(type='text', required, v-model="val.normal")
          span.md-error {{err.normal}}   
    md-button.md-raised.md-primary#change(@click.native="change") 修改
</template>

<script>
  export default {
    name: 'user-info',
    data () {
      return {
        file: '',
        val: {
          normal: '',
          old: '',
          new: '',
          repeat: ''
        },
        type: this.$route.query.type,
        name: this.$route.query.name,
        err: {
          normal: '',
          old: '',
          new: '',
          repeat: ''
        }
      }
    },
    methods: {
      change () {
        this.err = ''
        if (this.type === 'login' || this.type === 'pay') {
          if (!this.val.old) {
            this.err.old = '旧' + this.name + '不等为空'
          } else if (!this.val.new) {
            this.err.new = '新' + this.name + '不等为空'
          } else if (this.val.new !== this.val.repeat) {
            this.err.repeat = '两次密码不一致'
          } else {
            let password = this.type + 'Password'
            let url = '/api/password/' + password
            let data = {}
            data['new_' + password] = this.val.old
            data[password] = this.val.new
            // 提交请求
            console.log(url, data)
          }
        } else {
          if (!this.val.normal) this.err.normal = this.name + '不等为空'
        }
      }
    }
  }
</script>

<style lang="sass">
#change-info
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
    .user-info
  .form
    width: 80%
    margin: 0 auto
  #change
    display: block
    width: 90%
    margin: 0.5rem auto 0 auto
  .md-error
    padding-top: 0.1rem
    color: red
    opacity: 1 !important
</style>
