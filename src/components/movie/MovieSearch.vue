<template lang="pug">
div#movie-search
  md-toolbar(md-theme="white")
    div.md-toolbar-container
      md-button.md-icon-button
        md-icon search
      md-input-container(md-inline)
        label Search ...
        md-input(type="text")
      md-button.md-icon-button
        md-icon cancel
  div.result-item(v-for="(movie, index) in result", @click="$router.push('/movie-detail/' + index)")
    img(:src="movie.image")
    div.movie-info
      div
        span.name {{ movie.name }}
        span.playing-type {{ movie.playingType }}
      div
        md-chip {{ movie.movieType }}
        md-chip {{ movie.time }}
</template>

<script>
export default {
  name: 'movie-search',
  data () {
    return {
      result: [{
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
      }]
    }
  }
}
</script>

<style lang="sass">
#movie-search
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
      .md-chip:first-child
        margin-right: .1rem
</style>