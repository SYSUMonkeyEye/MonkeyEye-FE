import axios from 'axios'

export default {
  state: {
    playing: [],
    toBePlayed: [],
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
    }]
  },
  mutations: {
    SET_ALL_MOVIES (state, movies) {
      const now = Date.now()
      for (let i = 0; i < movies.length; ++i) {
        movies[i].playingTime > now ? state.toBePlayed.push(movies[i]) : state.playing.push(movies[i])
      }
    }
  },
  actions: {
    GET_ALL_MOVIES ({ commit }) {
      return axios.get('/api/movies').then(res => {
        res.status === 200 ? commit('SET_ALL_MOVIES', res.data) : ''
      })
    }
  }
}
