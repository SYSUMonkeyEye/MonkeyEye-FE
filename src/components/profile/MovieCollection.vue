<template lang="pug">
div#movie-collection
  md-toolbar
    div.md-toolbar-container
      h2.md-title {{ title }}
  div.movie-item(v-for="(movie, index) in $store.state.movie.playing",
    @click="$router.push('/movie-detail/' + movie.id)")
    img(:src="movie.poster")
    div.movie-info
      div
        span.name {{ movie.name }}
        span.playing-type {{ movie.playingType }}
      div
        p {{ movie.movieType }}
        p {{ formatTime(movie.playingTime) }}
  div.no-data(v-if="$store.state.movie.recommendPlaying.length === 0")
    md-icon sentiment_neutral
    p 暂无相关资讯
</template>

<script>
import { formatDate } from '../../common/utils/DateUtils'

export default {
  name: 'movie-collection',
  data () {
    return {
      title: (this.$route.params.type === 'favorites' ? '我的收藏'
        : this.$route.params.type === 'wanna' ? '期待上映'
        : this.$route.params.type === 'watched' ? '观影历史' : ''
      )
    }
  },
  methods: {
    formatTime (time) {
      return formatDate(time)
    }
  }
}
</script>

<style lang="sass">
#movie-collection
  .md-toolbar .md-toolbar-container .md-title
    flex: 1
    text-align: center
  .movie-item
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
