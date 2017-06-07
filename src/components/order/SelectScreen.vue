<template lang="pug">
div#select-screen
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(@click.native="$router.back()")
        md-icon keyboard_arrow_left
      h2.md-title {{ movie.name }}
      md-button.md-icon-button(disabled)
        md-icon
  div.banner
    img(:src="movie.poster")
  div.screens-container
    md-tabs.md-transparent
      md-tab(v-for="(screensOfDay, offset) in screens",
        :md-label="dateMap[offset] + ' ' + dates[offset]",
        :key="offset")
        div.no-ticket(v-show="screensOfDay.length === 0") 抱歉，当天暂时没有可出售的电影票
        div.screen-container(v-for="screen in screensOfDay")
          div.time
            span.start-time {{ formatStartTime(screen.time) }}
            span.end-time {{ formatEndTime(screen.time) }}散场
          div.info
            span.playing-type {{ screen.playingType }}
            span.playing-place {{ screen.hallNum }}号厅
          div.money
            span.price ￥{{ screen.price }}
          md-button.md-dense.md-primary.md-raised.select-seat(@click.native="$router.push(`/select-seat/${screen.id}`)") 选座

</template>

<script>
import * as DateUtils from '../../common/utils/DateUtils'

export default {
  data () {
    return {
      dates: [],
      dateMap: ['今天', '明天', '后天'],
      movie: {
        name: 'loading ...',
        playingType: 'loading ...',
        movieType: 'loading ...',
        duration: 0,
        playingTime: Date.now(),
        description: 'loading ...',
        rating: 0
      }
    }
  },
  created () {
    let movieId = this.$route.params.movieId
    this.$store.dispatch('GET_MOVIE_DETAIL', movieId)
      .then(movie => {
        this.movie = movie
      })
    this.$store.dispatch('GET_ALL_SCREENS', movieId)
    this.initDates()
  },
  computed: {
    screens () {
      return this.$store.state.screen.screens
    }
  },
  methods: {
    /**
     * 获取今天、明天和后天的日期
     */
    initDates () {
      for (let offset = 0; offset < 3; offset++) {
        this.dates.push(DateUtils.getDate(offset))
      }
    },
    formatStartTime (time) {
      return DateUtils.getTime(time)
    },
    formatEndTime (time) {
      return DateUtils.getTime(time, this.movie.duration)
    }
  }
}
</script>

<style lang="sass">
#select-screen
  position: relative
  min-height: 100%
  background: #eee
  .banner
    img
      width: 100%
      height: 2.5rem
  .screens-container
    margin-top: .15rem
    background: #ffffff
    .md-tab
      padding: .08rem
      .no-ticket
        padding: .1rem 0
        text-align: center
      .screen-container
        display: flex
        align-items: center
        padding: .08rem .06rem
        border-bottom: 1px dashed #d3d3d3
        &:last-child
          border: none
        .time
          flex: 0 0 1rem
          display: flex
          flex-direction: column
          .start-time
            font-size: .20rem
            font-weight: 400
          .end-time
            font-size: .12rem
            color: #888888
        .info
          flex: 1
          display: flex
          flex-direction: column
          .playing-type
            line-height: .16rem
            font-size: .14rem
            font-weight: 400
          .playing-place
            font-size: .12rem
            color: #888888
        .money
          flex: 0 0 .5rem
          .price
            text-align: right
            font-size: .18rem
            color: #f47a15
        .select-seat
          min-width: .5rem
          padding: 0 .08rem
          font-size: .14rem
</style>
