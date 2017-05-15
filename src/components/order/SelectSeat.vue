<template lang="pug">
div#select-seat
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(@click.native="$router.back()")
        md-icon keyboard_arrow_left
      h2.md-title {{ movie.name }}
  div.info
    span {{ screen.playingTime }}
    span {{ screen.playingDate }}
    span {{ screen.playingType }}
  div.head-seat 正厅银幕
  div.seat-container
    div.seat-row(v-for="i in rows")
      div.row-num.cell {{ i }}
      div.seat.cell(v-for="j in columns",
        @click="toggleSelected(i, j)",
        :class="{'checked': isSelected(i, j), 'locked': isLocked(i, j)}")
      div.cell
    div.legend-container
      div.legend-group
        div.cell.seat.avaliable
        span.text 可选
      div.legend-group
        div.cell.seat.checked
        span.text 已选
      div.legend-group
        div.cell.seat.locked
        span.text 已售
  div.seats-selected
    md-chip(v-for="seat in seatsSelected") {{ convert2D(seat).row }}排{{ convert2D(seat).column }}座
  div.footer
    md-button.md-primary.md-raised(:disabled="isDisabled",
      @click.native="$router.push(`/reservation/${$route.params.screenId}`)") 确认选座
  md-snackbar(md-position="bottom center" md-duration="2000" ref="seatLimit")
    span 您最多只能购买四张票
    md-button(@click.native="$refs.seatLimit.close()") 确定

</template>

<script>
const SEATS_LIMIT = 4

export default {
  data () {
    return {
      rows: 10,
      columns: 12
    }
  },
  created () {
    let screenId = this.$route.params.screenId

    this.$store.dispatch('GET_ONE_SCREEN', screenId)
    this.$store.dispatch('GET_ONE_SCREEN_SEATS', screenId)
    this.$store.dispatch('RESET_SEATS_SELECTED')
  },
  computed: {
    isDisabled () {
      return this.seatsSelected.length <= 0 ||
          this.seatsSelected.length > SEATS_LIMIT
    },
    screen () {
      return this.$store.state.screen.screen
    },
    movie () {
      return this.$store.state.screen.screen.movie
    },
    seatsLocked () {
      return this.$store.state.screen.seatsLocked
    },
    seatsSelected () {
      return this.$store.state.screen.seatsSelected
    }
  },
  methods: {
    isSelected (row, column) {
      let num = (row - 1) * this.columns + column
      let index = this.seatsSelected.indexOf(num)
      return index !== -1
    },
    isLocked (row, column) {
      let num = (row - 1) * this.columns + column
      let index = this.seatsLocked.indexOf(num)
      return index !== -1
    },
    toggleSelected (row, column) {
      if (this.isLocked(row, column)) {
        return
      }
      let num = (row - 1) * this.columns + column
      let index = this.seatsSelected.indexOf(num)
      if (index !== -1) {
        this.seatsSelected.splice(index, 1)
      } else {
        if (this.seatsSelected.length === SEATS_LIMIT) {
          this.$refs.seatLimit.open()
          return
        }
        this.seatsSelected.push(num)
      }
    },
    convert2D (num) {
      let row = Math.floor((num - 1) / this.columns) + 1
      let column = (num - 1) % this.columns + 1
      return {
        row,
        column
      }
    }
  }
}
</script>

<style lang="sass">
#select-seat
  position: relative
  height: 100%
  background: #eee
  .info
    padding: .1rem 0
    text-align: center
    font-size: .14rem
    color: #f44336
    background: #fff
    border-bottom: .01rem solid #ddd
    span
      display: inline-block
      margin: 0 .08rem
  .head-seat
    width: 2rem
    margin: .15rem auto .2rem
    padding: .03rem
    text-align: center
    background: #fff
    color: #666
    border-radius: .05rem
  .seat-container
    .seat
      margin: .01rem
      background: #ffffff
      border: .01rem solid #cccccc
      border-radius: .04rem
      &.checked
        background: #9ccc65
      &.locked
        background: #e84e40
    .cell
      width: .20rem
      height: .20rem
    .seat-row
      display: flex
      justify-content: center
      .row-num
        line-height: .20rem
        color: #666
        text-align: center
    .legend-container
      margin-top: .1rem
      padding-right: .4rem
      display: flex
      justify-content: flex-end
      .legend-group
        margin-left: .08rem
        display: flex
        .text
          line-height: .22rem
  .seats-selected
    margin-top: .1rem
    padding: 0 .1rem
    display: flex
    justify-content: center
    .md-chip
      height: 26px
      padding: 5px 12px
      margin: 0 .05rem
      font-size: .12rem
      border-radius: .05rem
  .footer
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    padding: .1rem
    text-align: center
    button
      display: block
      width: 100%
      margin: 0
      padding: .02rem .16rem
      font-size: .16rem
</style>
