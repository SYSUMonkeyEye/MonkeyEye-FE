<template lang="pug">
div#movie-collection
  md-toolbar
    div.md-toolbar-container
      md-button.md-icon-button(@click.native="$router.back()")
        md-icon keyboard_arrow_left
      h2.md-title {{ title }}
      md-button.md-icon-button(disabled)
        md-icon
  div.movie-item(v-for="(item, index) in movieList",
    @click="$router.push('/movie-detail/' + item.movie.id)")
    img(:src="item.movie.poster")
    div.movie-info
      div
        span.name {{ item.movie.name }}
        span.playing-type {{ item.movie.playingType }}
      div
        p {{ item.movie.movieType }}
        p {{ formatTime(item.movie.playingTime) }}
  div.no-data(v-if="movieList.length === 0")
    md-icon sentiment_neutral
    p {{ noDataTip }}
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
      ),
      noDataTip: (this.$route.params.type === 'favorites' ? '还没有收藏'
        : this.$route.params.type === 'wanna' ? '还没有期待'
        : this.$route.params.type === 'watched' ? '还没有历史' : ''
      ),
      movieList: (this.$route.params.type === 'favorites' ? this.$store.state.favorite.favoriteMovies
        : this.$route.params.type === 'wanna' ? this.$store.state.favorite.wannaMovies
        : this.$route.params.type === 'watched' ? this.$store.state.favorite.historyMovies : []
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
  .no-data
    text-align: center
    margin-top: 1.5rem
    color: #888
    .md-icon
      font-size: 1rem
      height: auto
      width: auto
    p
      font-size: .2rem
</style>
