<template lang="pug">
.password-input
  input.real-input(type="tel", :maxlength="passwordLength",
    @input="setPassword($event)", v-model="password")
  div.password-show-container
    div.password-show(v-for="i in passwordLength")
      md-icon(v-show="password.length >= i") lens
</template>

<script>
const passwordLength = 6

export default {
  data () {
    return {
      passwordLength: passwordLength,
      password: ''
    }
  },
  methods: {
    setPassword ($event) {
      let value = $event.target.value

      // 过滤非数字字符
      this.password = value.replace(/\D/g, '')

      if (this.password.length === 6) {
        this.$emit('complete', this.password)
      }
    },
    clear () {
      this.password = ''
    }
  }
}
</script>

<style lang="sass">
.password-input
  position: relative
  width: 2.4rem
  height: .4rem
  margin: 0 auto
  .real-input
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
    z-index: 1
    opacity: 0
  .password-show-container
    display: flex
    z-index: 0
    .password-show
      flex: 1
      height: .4rem
      border: .01rem solid #d3d3d3
      border-right: none
      text-align: center
      &:last-child
        border-top-right-radius: .05rem
        border-bottom-right-radius: .05rem
        border-right: .01rem solid #d3d3d3
      &:first-child
        border-top-left-radius: .05rem
        border-bottom-left-radius: .05rem
      .md-icon
        min-width: .16rem
        width: .16rem
        height: .4rem
        font-size: .16rem

</style>
