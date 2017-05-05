<template lang="pug">
div#movies
  md-tabs(md-centered, md-theme="white")
    md-tab(md-label="正在热映")
      div.hot-movies
        img(:src="$store.state.movie.recommend[0].image", @click="goToMovieDetail")
      div.movie-item(v-for="(movie, index) in $store.state.movie.playing", @click="$router.push('/movie-detail/' + movie.id)")
        img(:src="movie.poster")
        div.movie-info
          div
            span.name {{ movie.name }}
            span.playing-type {{ movie.playingType }}
          div
            md-chip {{ movie.movieType }}
            md-chip {{ formatTime(movie.playingTime) }}
        md-button.md-warn.md-icon-button.md-raised(@click.native.stop="$router.push('/select-session/' + movie.id)")
          md-icon add_shopping_cart
    md-tab(md-label="即将上映")
      div.hot-movies
        img(:src="$store.state.movie.recommend[0].image", @click="goToMovieDetail")
      div.movie-item(v-for="(movie, index) in $store.state.movie.toBePlayed", @click="$router.push('/movie-detail/' + movie.id)")
        img(:src="movie.poster")
        div.movie-info
          div
            span.name {{ movie.name }}
            span.playing-type {{ movie.playingType }}
          div
            md-chip {{ movie.movieType }}
            md-chip {{ formatTime(movie.playingTime) }}
</template>

<script>
export default {
  name: 'movies',
  data () {
    return {
      activeSlide: 0
    }
  },
  created () {
    if (!this.$store.state.movie.playing.length || !this.$store.state.movie.toBePlayed.length) {
      this.$store.dispatch('GET_ALL_MOVIES')
    }
  },
  mounted () {
    setTimeout(() => {
      this.slide()
    }, 3000)
  },
  methods: {
    goToMovieDetail () {
      this.$router.push('/movie-detail/' + this.$store.state.movie.recommend[this.activeSlide].movieId)
    },
    slide () {
      this.activeSlide = (this.activeSlide + 1) % this.$store.state.movie.recommend.length
      let imgs = document.querySelectorAll('.hot-movies img')
      for (let i = 0; i < imgs.length; ++i) {
        imgs[i].src = this.$store.state.movie.recommend[this.activeSlide].image
      }
      setTimeout(() => {
        this.slide()
      }, 3000)
    },
    formatTime (time) {
      time = new Date(time)
      let str = '' + time.getFullYear()
      str += (time.getMonth() < 9) ? '-0' + (time.getMonth() + 1) : '-' + (time.getMonth() + 1)
      str += (time.getDate() < 10) ? '-0' + (time.getDate() + 1) : '-' + (time.getDate() + 1)
      return str
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
        .md-chip:first-child
          margin-right: .1rem
</style>
