<template lang="pug">
div#user-info
  md-toolbar
    div.md-toolbar-container
      h2.md-title 用户信息界面
  md-whiteframe
    div.collection
      div.user-info.head(@click="change('head', '头像')")
        span 用户头像
        img(:src="user.image")
        md-icon keyboard_arrow_right
      div.user-info(@click="change('username', '用户名')")
        span 用户名
        span.info {{user.name}}
        md-icon keyboard_arrow_right
      div.user-info(@click="change('phone', '手机号')")
        span 手机号
        span.info {{user.id}}
        md-icon keyboard_arrow_right
      div.user-info(@click="change('sex', '性别')")
        span 性别
        span.info {{user.sex}}
        md-icon keyboard_arrow_right
</template>

<script>
export default {
  name: 'user-info',
  data () {
    return {
      user: {
        image: '/data/images/head-img.jpg',
        name: '风不定，人初静',
        id: '15521297654',
        sex: '男',
        description: '风不定，人初静，明日落红应满径。'
      }
    }
  },
  methods: {
    change (type, name) {
      this.$router.push({
        path: '/change-info',
        query: {
          type: type,
          name: name
        }
      })
    }
  }
}
</script>

<style lang="sass">
#user-info
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
  .user-info
    display: flex
    align-items: center
    padding: .15rem
    border-bottom: .01rem solid #e1e1e1
    position: relative
    img
      width: .65rem
      height: .65rem
      border-radius: 50%
      border: .01rem solid #eee
    &:last-child
      border-bottom: none
      margin-bottom: 0
    span
      flex-grow: 1
      font-size: .2rem
      font-weight: 300
    .info
      display: flex
      justify-content: flex-end
</style>
