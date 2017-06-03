<template lang="pug">
div#movie-search
  md-toolbar(md-theme="white")
    div.md-toolbar-container
      md-button.md-icon-button(@click.native="$router.back()")
        md-icon keyboard_arrow_left
      md-button.md-icon-button(@click.native="search")
        md-icon search
      md-input-container(md-inline)
        label Search ...
        md-input(type="text", v-model="keyword")
      md-button.md-icon-button(v-show="keyword.length > 0", @click.native="clear")
        md-icon cancel
  div.result-item(v-for="(movie, index) in $store.state.movie.searchResult", @click="$router.push('/movie-detail/' + movie.id)")
    img(:src="movie.poster")
    div.movie-info
      div
        span.name {{ movie.name }}
        span.playing-type {{ movie.playingType }}
      div
        p {{ movie.movieType }}
        p {{ formatTime(movie.playingTime) }}
</template>

<script>
import { formatDate } from '../../common/utils/DateUtils'

export default {
  name: 'movie-search',
  data () {
    return {
      keyword: this.$store.state.movie.keyword
    }
  },
  methods: {
    search () {
      if (this.keyword.length === 0) return
      this.$store.dispatch('SEARCH_MOVIE', this.keyword)
    },
    clear () {
      this.keyword = ''
      this.$store.commit('CLEAR_SEARCH_RESULT')
    },
    formatTime (time) {
      return formatDate(time)
    }
  }
}
</script>

<style lang="sass">
#movie-search
  .md-icon-button
    margin-right: 0
  .result-item
    display: flex
    align-items: center
    padding: .1rem
    background: white
    border-bottom: .01rem solid #e1e1e1
    position: relative
    &:last-child
      border-bottom: none
    img
      width: .8rem
      height: 1rem
    .movie-info
      display: flex
      justify-content: space-around
      flex-direction: column
      padding: 0 .1rem
      flex-grow: 1
      height: 1rem
      .name
        margin: 0 0 .03rem 0
        font-size: .16rem
        font-weight: 400
      .playing-type
        font-size: .16rem
        float: right
        color: #ff6500
      div p
        margin: 0
</style>
