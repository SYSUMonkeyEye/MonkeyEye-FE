<template lang="pug">
div#movie-detail
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button
        md-icon
      h2.md-title 电影详情界面
      md-button.md-icon-button(@click.native="favoriteOrNot")
        md-icon {{ hasFavorited ? 'favorite' : 'favorite_border' }}
  md-whiteframe
    div.main-info
      img.poster(:src="detail.poster")
      div.info
        div.name-and-type
          span {{ detail.name }}
          span {{ detail.playingType }}
        div.rating
          span 评分:
          img(src="../../assets/images/star-on.png", v-for="i in detail.rating")
          img(src="../../assets/images/star-off.png", v-for="i in (5 - detail.rating)")
        div.type-and-time
          span {{ detail.movieType }}
          span {{ detail.duration + '分钟' }}
        div.playing-time {{ formatTime(detail.playingTime) + ' 上映' }}
  md-whiteframe
    div.description {{ detail.description }}
  md-whiteframe
    div.comment(v-for="comment in comments")
      div.comment-header
        img.user-avatar(:src="comment.avatar")
        div.rating
          img.rating-star(src="../../assets/images/star-on.png", v-for="i in comment.rating")
          img.rating-star(src="../../assets/images/star-off.png", v-for="i in (5 - comment.rating)")
          span {{ comment.rating + '分' }}
      p.comment-content {{ comment.content }}
  md-button.md-raised.md-primary.buy-ticket(@click.native="$router.push('/select-screen/' + detail.id)") 立即购票
</template>

<script>
import { formatDate } from '../../common/utils/DateUtils'

export default {
  name: 'movie-detail',
  created () {
    this.$store.dispatch('GET_MOVIE_DETAIL', this.$route.params.movieId)
    .then(detail => {
      this.detail = detail
    })
    this.$store.dispatch('GET_COMMENTS', this.$route.params.movieId)
    .then(comments => {
      this.comments = comments
    })
  },
  methods: {
    formatTime (time) {
      return formatDate(time)
    },

    // favorite 该电影或者取消 favorite
    favoriteOrNot () {
      if (this.hasFavorited) {
        this.$store.dispatch('UNFAVORITE_MOVIE', this.detail.id)
      } else {
        this.$store.dispatch('FAVORITE_MOVIE', this.detail)
      }
    }
  },
  data () {
    return {
      detail: {
        name: 'loading ...',
        playingType: 'loading ...',
        movieType: 'loading ...',
        duration: 0,
        playingTime: Date.now(),
        description: 'loading ...',
        rating: 0
      },
      comments: [{
        rating: 3,
        content: '这是一段很长很长的评价',
        avatar: '/data/images/head-img.jpg'
      }]
    }
  },
  computed: {
    // 判断是否已经存在 favorite 关系
    hasFavorited () {
      for (let i = 0; i < this.$store.state.favorite.favoriteMovies.length; ++i) {
        if (this.$store.state.favorite.favoriteMovies[i].id === this.detail.id) {
          return true
        }
      }
      for (let i = 0; i < this.$store.state.favorite.wannaMovies.length; ++i) {
        if (this.$store.state.favorite.wannaMovies[i].id === this.detail.id) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang="sass">
#movie-detail
  position: relative
  height: 100%
  background: #eee
  .md-toolbar
    height: .64rem
    .md-toolbar-container .md-title
      flex: 1
      text-align: center
  .main-info
    background: white
    margin-bottom: .1rem
    .poster
      width: 100%
      height: 2.5rem
    .info
      padding: .1rem
      .name-and-type
        margin-bottom: .08rem
        span:first-child
          font-size: .18rem
        span:last-child
          font-size: .17rem
          color: #ff6500
          float: right
      .rating
        margin-bottom: .08rem
        img
          width: .18rem
          height: .18rem
      .rating span, .type-and-time span, .playing-time
        color: #999
        margin-right: .1rem
  .description
    background: white
    color: #888
    padding: .1rem
    margin-bottom: .1rem
  .buy-ticket
    width: 100%
    height: .5rem
    font-size: .18rem
    position: fixed
    bottom: 0
    margin: 0
    z-index: 99
  .comment
    background: white
    padding: .1rem
    position: relative
    border-bottom: .01rem solid #f1f1f1
    &:last-child
      margin-bottom: .5rem
    .comment-header
      display: flex
      align-items: center
      .user-avatar
        width: .4rem
        height: .4rem
        border-radius: 50%
      .rating
        flex-grow: 1
        text-align: right
        .rating-star
          width: .2rem
          height: .2rem
        span
          margin-left: .1rem
    .comment-content
      background: #f1f1f1
      padding: .1rem
      border-radius: .1rem
      margin-top: .25rem
      &:before
        content: ''
        width: 0
        height: 0
        border-left: .15rem solid transparent
        border-right: .15rem solid transparent
        border-bottom: .3rem solid #f1f1f1
        position: absolute
        top: .55rem
        left: .15rem
</style>
