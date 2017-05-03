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
        div.no-ticket(v-show="sessionsOfDay.length === 0") 抱歉，暂时没有当天可出售的电影票
        div.session-container(v-for="session in sessionsOfDay")
          div.time
            span.start-time {{ formatStartTime(session.startTime) }}
            span.end-time {{ formatEndTime(session.startTime) }}散场
          div.info
            span.playing-type {{ session.playingType }}
            span.playing-place {{ session.playingPlace }}
          div.money
            span.price ￥{{ session.price }}
          md-button.md-dense.md-primary.select-seat 选座



</template>

<script>
import axios from 'axios'

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
      let now = this.formatDate(new Date())

      for (let i = 0; i < sessions.length; i++) {
        let date = this.formatDate(new Date(parseInt(sessions[i].startTime, 10)))
        let diff = date.getTime() - now.getTime()
        let days = parseInt(diff / (1000 * 60 * 60 * 24), 10)

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
        this.dates.push(this.getDate(offset))
      }
    },
    /**
     * @param {number} offset - 偏离天数
     * @returns {string} 与当前日期偏离offset的日期
     */
    getDate (offset) {
      let now = new Date()
      now.setDate(now.getDate() + offset)
      let m = now.getMonth() + 1
      let d = now.getDay()
      return m + '月' + d + '日'
    },
    /**
     * 为小于10的数字前面添加0
     * @param n
     * @returns {string}
     */
    addZero (n) {
      if (n < 10) {
        return '0' + n
      }
      return '' + n
    },
    /**
     * 格式化时间
     * @param {number} time - 时间戳
     * @returns {string} 格式为HH:mm的时间
     */
    formatStartTime (time) {
      let t = new Date(parseInt(time, 10))
      let h = this.addZero(t.getHours())
      let m = this.addZero(t.getMinutes())
      return h + ':' + m
    },
    /**
     * 格式化结束时间（加上电影时长）
     * @param {number} time - 时间戳
     * @returns {string} 格式为HH:mm的时间
     */
    formatEndTime (time) {
      let t = new Date(parseInt(time, 10))
      t.setMinutes(t.getMinutes() + parseInt(this.movie.duration, 10))
      let h = this.addZero(t.getHours())
      let m = this.addZero(t.getMinutes())
      return h + ':' + m
    },
    /**
     * @param {Date} date - 日期
     * @returns {Date} 当天零点
     */
    formatDate (date) {
      return new Date(date.getFullYear() + '-' +
        (date.getMonth() + 1) + '-' + date.getDate())
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
