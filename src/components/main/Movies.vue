<template lang="pug">
div#movies
  md-tabs(md-centered, md-theme="white")
    md-tab(v-for="(movies, key) in tabs", :md-label="key")
      div.hot-movies
        img(:src="recommend[0].image", @click="goToMovieDetail")
      div.movie-item(v-for="(movie, index) in movies", @click="$router.push('/movie-detail/' + index)")
        img(:src="movie.image")
        div.movie-info
          div
            span.name {{ movie.name }}
            span.playing-type {{ movie.playingType }}
          div
            md-chip {{ movie.movieType }}
            md-chip {{ movie.time }}
        md-button.md-warn.md-icon-button.md-raised(@click.native.stop="$router.push('/select-session/' + index)")
          md-icon add_shopping_cart
</template>

<script>
export default {
  name: 'movies',
  data () {
    return {
      activeSlide: 0,
      recommend: [{
        movieId: 0,
        image: '/data/images/movie-cover.jpg'
      }, {
        movieId: 1,
        image: '/data/images/movie-cover2.jpg'
      }, {
        movieId: 2,
        image: '/data/images/movie-cover.jpg'
      }, {
        movieId: 3,
        image: '/data/images/movie-cover2.jpg'
      }],
      tabs: {
        '正在热映': [{
          'name': '速度与激情7',
          'image': '/data/images/movie-cover.jpg',
          'movieType': '冒险 动作',
          'playingType': '3D|MAX',
          'time': '2014-08-09'
        }, {
          'name': '速度与激情8',
          'image': '/data/images/movie-cover.jpg',
          'movieType': '冒险 动作',
          'playingType': '3D|MAX',
          'time': '2014-08-09'
        }, {
          'name': '金刚狼3',
          'image': '/data/images/movie-cover.jpg',
          'movieType': '冒险 动作',
          'playingType': '3D|MAX',
          'time': '2014-08-09'
        }, {
          'name': '攻壳机动队',
          'image': '/data/images/movie-cover.jpg',
          'movieType': '冒险 动作',
          'playingType': '3D|MAX',
          'time': '2014-08-09'
        }],
        '即将上映': [{
          'name': '速度与激情10',
          'image': '/data/images/movie-cover.jpg',
          'movieType': '冒险 动作',
          'playingType': '3D|MAX',
          'time': '2014-08-09'
        }, {
          'name': '速度与激情11',
          'image': '/data/images/movie-cover.jpg',
          'movieType': '冒险 动作',
          'playingType': '3D|MAX',
          'time': '2014-08-09'
        }, {
          'name': '速度与激情12',
          'image': '/data/images/movie-cover.jpg',
          'movieType': '冒险 动作',
          'playingType': '3D|MAX',
          'time': '2014-08-09'
        }]
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.slide()
    }, 3000)
  },
  methods: {
    goToMovieDetail () {
      this.$router.push('/movie-detail/' + this.recommend[this.activeSlide].movieId)
    },
    slide () {
      this.activeSlide = (this.activeSlide + 1) % this.recommend.length
      let imgs = document.querySelectorAll('.hot-movies img')
      for (let i = 0; i < imgs.length; ++i) {
        imgs[i].src = this.recommend[this.activeSlide].image
      }
      setTimeout(() => {
        this.slide()
      }, 3000)
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
