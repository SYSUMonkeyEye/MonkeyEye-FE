import axios from 'axios'

export default {
  state: {
    playing: [],
    toBePlayed: [],
    recommendPlaying: [],
    recommendToBePlayed: [],
    searchResult: [],
    keyword: '',
    allMovieGot: false,
    recommendGot: false
  },

  mutations: {
    // 设置"即将上映"和"正在热映"电影列表
    SET_ALL_MOVIES (state, movies) {
      state.toBePlayed = []
      state.playing = []
      state.allMovieGot = true
      const now = Date.now()
      for (let i = 0; i < movies.length; ++i) {
        if (movies[i].playingTime > now) {
          state.toBePlayed.push(movies[i])
        } else {
          state.playing.push(movies[i])
        }
      }
    },

    // 设置"即将上映"和"正在热映"的电影推荐
    SET_RECOMMEND (state, recommend) {
      state.recommendPlaying = []
      state.recommendToBePlayed = []
      state.recommendGot = true
      const now = Date.now()
      for (let i = 0; i < recommend.length; ++i) {
        if (recommend[i].playingTime > now) {
          state.recommendToBePlayed.push(recommend[i])
        } else {
          state.recommendPlaying.push(recommend[i])
        }
      }
    },

    // 设置搜索结果
    SET_SEARCH_RESULT (state, data) {
      state.keyword = data.keyword
      state.searchResult = data.result
    },

    // 清空搜索记录
    CLEAR_SEARCH_RESULT (state) {
      state.searchResult = []
      state.keyword = ''
    }
  },

  actions: {
    // 获取电影列表
    GET_ALL_MOVIES ({ commit }) {
      return axios.get('/api/movies/').then(res => {
        res.status === 200 ? commit('SET_ALL_MOVIES', res.data) : ''
      })
    },

    // 查询某部电影的详情
    GET_MOVIE_DETAIL ({ commit }, movieId) {
      return axios.get('/api/movies/' + movieId).then(res => {
        if (res.status === 200) {
          return res.data
        } else {
          return { rating: 0 }
        }
      })
    },

    // 查询推荐电影列表
    RECOMMEND_MOVIE ({ commit }) {
      return axios.get('/api/movies/recommendation').then(res => {
        res.status === 200 ? commit('SET_RECOMMEND', res.data) : ''
      })
    },

    // 搜索电影
    SEARCH_MOVIE ({commit}, keyword) {
      return axios.get('/api/movies/?query=' + keyword).then(res => {
        res.status === 200 ? commit('SET_SEARCH_RESULT', {
          keyword,
          result: res.data
        }) : ''
      })
    }
  }
}
