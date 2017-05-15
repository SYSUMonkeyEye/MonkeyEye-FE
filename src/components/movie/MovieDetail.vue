<template lang="pug">
div#movie-detail
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button
        md-icon
      h2.md-title 电影详情界面
      md-button.md-icon-button
        md-icon favorite
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
  md-button.md-raised.md-primary.buy-ticket(@click.native="$router.push('/reservation/' + detail.id)") 立即购票
</template>

<script>
import { formatDate } from '../../utils/DateUtils'

export default {
  name: 'movie-detail',
  created () {
    this.$store.dispatch('GET_MOVIE_DETAIL', this.$route.params.id)
    .then(detail => {
      this.detail = detail
    })
  },
  methods: {
    formatTime (time) {
      return formatDate(time)
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
      }
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
  .buy-ticket
    width: 100%
    height: .5rem
    font-size: .18rem
    position: absolute
    bottom: 0
    margin: 0
</style>