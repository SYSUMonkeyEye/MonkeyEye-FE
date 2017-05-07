import axios from 'axios'

export default {
  state: {
    playing: [],
    toBePlayed: [],
    recommendPlaying: [],
    recommendToBePlayed: [],
    detail: {
      rating: 0
    }
  },

  mutations: {
    // 设置"即将上映"和"正在热映"电影列表
    SET_ALL_MOVIES (state, movies) {
      state.toBePlayed = []
      state.playing = []
      const now = Date.now()
      for (let i = 0; i < movies.length; ++i) {
        if (movies[i].playingTime > now) {
          state.toBePlayed.push(movies[i])
        } else {
          state.playing.push(movies[i])
        }
      }
    },

    // 设置电影详情
    SET_MOVIE_DETAIL (state, detail) {
      state.detail = detail
    },

    // 设置"即将上映"和"正在热映"的电影推荐
    SET_RECOMMEND (state, recommend) {
      state.recommendPlaying = []
      state.recommendToBePlayed = []
      const now = Date.now()
      for (let i = 0; i < recommend.length; ++i) {
        if (recommend[i].playingTime > now) {
          state.recommendToBePlayed.push(recommend[i])
        } else {
          state.recommendPlaying.push(recommend[i])
        }
      }
    }
  },

  actions: {
    // 获取电影列表
    GET_ALL_MOVIES ({ commit }) {
      return axios.get('/api/movies').then(res => {
        res.status === 200 ? commit('SET_ALL_MOVIES', res.data) : ''
      })
    },

    // 查询某部电影的详情
    GET_MOVIE_DETAIL ({ commit }, movieId) {
      return axios.get('/api/movies/' + movieId).then(res => {
        res.status === 200 ? commit('SET_MOVIE_DETAIL', res.data) : ''
      })
    },

    // 查询推荐电影列表
    RECOMMEND_MOVIE ({ commit }) {
      return axios.get('/api/movies/recommendation').then(res => {
        res.status === 200 ? commit('SET_RECOMMEND', res.data) : ''
      })
    }
  }
}
