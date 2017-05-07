<template lang="pug">
div#movies
  md-tabs(md-centered, md-theme="white")
    md-tab(md-label="正在热映")
      div.hot-movies
        img#playing(v-if="$store.state.movie.recommendPlaying.length > 0",
          :src="$store.state.movie.recommendPlaying[0].poster",
          @click="goToMovieDetail($event)")
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
        md-button.md-warn.md-icon-button.md-raised(@click.native.stop="$router.push('/select-session/' + movie.id)")
          md-icon add_shopping_cart
    md-tab(md-label="即将上映")
      div.hot-movies
        img#toBePlayed(v-if="$store.state.movie.recommendToBePlayed.length > 0",
          :src="$store.state.movie.recommendToBePlayed[0].poster",
          @click="goToMovieDetail($event)")
      div.movie-item(v-for="(movie, index) in $store.state.movie.toBePlayed",
        @click="$router.push('/movie-detail/' + movie.id)")
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
import { formatDate } from '../../utils/DateUtils'

export default {
  name: 'movies',
  data () {
    return {
      activeSlideForTab1: 0,
      activeSlideForTab2: 0,
      sliderTimeout: null
    }
  },
  created () {
    if (!this.$store.state.movie.playing.length || !this.$store.state.movie.toBePlayed.length) {
      this.$store.dispatch('GET_ALL_MOVIES')
    }
    if (!this.$store.state.movie.recommendPlaying.length || !this.$store.state.movie.recommendToBePlayed.length) {
      this.$store.dispatch('RECOMMEND_MOVIE')
    }
  },
  mounted () {
    this.sliderTimeout = setTimeout(() => {
      this.slide()
    }, 3000)
  },
  methods: {
    goToMovieDetail (event) {
      const movieId = (
        event.target.id === 'playing'
        ? this.$store.state.movie.recommendPlaying[this.activeSlideForTab1].movieId
        : this.$store.state.movie.recommendToBePlayed[this.activeSlideForTab2].movieId
      )
      clearTimeout(this.sliderTimeout)
      this.$router.push('/movie-detail/' + movieId)
    },
    slide () {
      this.activeSlideForTab1 = (this.activeSlideForTab1 + 1) % this.$store.state.movie.recommendPlaying.length
      this.activeSlideForTab2 = (this.activeSlideForTab2 + 1) % this.$store.state.movie.recommendToBePlayed.length
      let imgs = document.querySelectorAll('.hot-movies img')
      imgs[0] ? imgs[0].src = this.$store.state.movie.recommendPlaying[this.activeSlideForTab1].poster : ''
      imgs[1] ? imgs[1].src = this.$store.state.movie.recommendToBePlayed[this.activeSlideForTab2].poster : ''
      this.sliderTimeout = setTimeout(() => {
        this.slide()
      }, 3000)
    },
    formatTime (time) {
      return formatDate(time)
    }
  }
}
</script>

<style lang="sass">
#movies
  .md-tabs .md-tab
    padding: 0
    .hot-movies
      position: relative
      width: 100%
      height: 2.5rem
      img
        width: 100%
        height: 100%
        transition: all 1s
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
