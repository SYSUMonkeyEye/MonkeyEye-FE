<template lang="pug">
div#movie-comment
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(@click.native="$router.back()")
        md-icon keyboard_arrow_left
      h2.md-title {{ $route.query.name }}
      md-button.md-icon-button(@click.native="submit")
        md-icon check
  div.star-rating
    div.rating
      span 我的评分：
      span {{ rating }}
    div.stars
      img(src="../../assets/images/star-on.png", v-for="i in rating", :id="i", @click="setRating($event)")
      img(src="../../assets/images/star-off.png", v-for="i in (5 - rating)", :id="i + rating", @click="setRating($event)")
  textarea.content(v-model="content", placeholder="分享你的观看心得吧~")
  md-dialog-alert(md-title="Tips:", md-content="请输入评价内容！", md-ok-text="确认", ref="errDialog")
</template>

<script>
export default {
  name: 'movie-comment',
  data () {
    return {
      rating: 1,
      content: ''
    }
  },
  methods: {
    setRating (event) {
      this.rating = Number.parseInt(event.target.id)
    },
    submit () {
      if (!this.content) {
        this.$refs['errDialog'].open()
        return
      }
      this.$store.dispatch('COMMENT_MOVIE', {
        movieId: this.$route.params.movieId,
        rating: this.rating,
        content: this.content
      }).then(success => {
        success ? this.$router.replace('/main/me') : ''
      })
    }
  }
}
</script>

<style lang="sass">
#movie-comment
  position: relative
  height: 100%
  background: #eee
  .md-toolbar
    height: .64rem
    .md-toolbar-container .md-title
      flex: 1
      text-align: center
  .star-rating
    background: white
    margin-top: .1rem
    padding: .15rem
    .rating span
      font-size: .24rem
      &:last-child
        color: #f44336
    .stars
      display: flex
      justify-content: space-around
      margin-top: .1rem
      img
        width: .4rem
        height: .4rem
  .content
    width: 100%
    height: 3rem
    margin-top: .1rem
    outline: none
    padding: .1rem
    font-size: .16rem
    resize: none
</style>
