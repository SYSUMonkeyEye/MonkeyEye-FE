<template lang="pug">
  div#change-info
    md-toolbar
      div.md-toolbar-container
        h2.md-title 修改{{name}}
    input(type='file')
    form.form(v-if="type == 'image'")
      label 选择头像
      input(type='file', required, onchange="newVal" name="file")
      span.md-error {{err}}
    form.form(v-else, novalidate, @submit.stop.prevent='submit')
      md-input-container
        md-icon settings
        label {{name}}
        md-input(type='text', required, v-model="newVal")
        span.md-error {{err}}
    md-button.md-raised.md-primary#change(@click.native="change") 修改
</template>

<script>
  export default {
    name: 'user-info',
    data () {
      return {
        newVal: '',
        type: this.$route.query.type,
        name: this.$route.query.name,
        err: ''
      }
    },
    methods: {
      change () {
        this.err = ''
        if (!this.newVal) this.err = this.name + '不等为空'
        else console.log(this.type, this.newVal)
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
