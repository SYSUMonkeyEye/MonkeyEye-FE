<template lang="pug">
div#select-session
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(@click.native="$router.back()")
        md-icon keyboard_arrow_left
      h2.md-title 速度与激情8
  div.banner
    img(:src="movie.image")
  div.sessions-container
    md-tabs.md-transparent
      md-tab(v-for="(sessionsOfDay, offset) in sessions",
        :md-label="dateMap[offset] + ' ' + dates[offset]")
        div.no-ticket(v-show="sessionsOfDay.length === 0") 抱歉，当天暂时没有可出售的电影票
        div.session-container(v-for="session in sessionsOfDay")
          div.time
            span.start-time {{ formatStartTime(session.startTime) }}
            span.end-time {{ formatEndTime(session.startTime) }}散场
          div.info
            span.playing-type {{ session.playingType }}
            span.playing-place {{ session.playingPlace }}
          div.money
            span.price ￥{{ session.price }}
          md-button.md-dense.md-primary.md-raised.select-seat(@click.native="$router.push(`/select-seat/${movie.id}/${session.id}`)") 选座

</template>

<script>
import axios from 'axios'
import * as DateUtils from '../../utils/DateUtils'

export default {
  data () {
    return {
      movie: {},
      sessions: [[], [], []],
      dates: [],
      dateMap: ['今天', '明天', '后天']
    }
  },
  created () {
    axios.get('/data/movies.json').then((res) => {
      if (res.status === 200) {
        this.movie = res.data[0]
      }
    })
    axios.get('/data/sessions.json').then((res) => {
      if (res.status === 200) {
        let sessions = res.data
        this.initSessions(sessions)
      }
    })
    this.initDates()
  },
  methods: {
    /**
     * 将电影场次划分为今天、明天和后天
     * @param {Object[]} sessions - 电影场次
     */
    initSessions (sessions) {
      let now = new Date()

      for (let i = 0; i < sessions.length; i++) {
        let date = new Date(parseInt(sessions[i].startTime, 10))
        let days = DateUtils.daysBetween(now, date)

        if (days >= 0 && days < 3) {
          this.sessions[days].push(sessions[i])
        }
      }
    },
    /**
     * 获取今天、明天和后天的日期
     */
    initDates () {
      for (let offset = 0; offset < 3; offset++) {
        this.dates.push(DateUtils.getDate(offset))
      }
    },
    formatStartTime (time) {
      return DateUtils.getTime(parseInt(time, 10))
    },
    formatEndTime (time) {
      return DateUtils.getTime(parseInt(time, 10),
        parseInt(this.movie.duration, 10))
    }
  }
}
</script>

<style lang="sass">
#select-session
  position: relative
  height: 100%
  background: #eee
  .banner
    img
      width: 100%
      height: 2.5rem
  .sessions-container
    margin-top: .15rem
    background: #ffffff
    .md-tab
      padding: .08rem
      .no-ticket
        padding: .1rem 0
        text-align: center
      .session-container
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
