import axios from 'axios'

export default {
  state: {
    favoriteMovies: [],
    wannaMovies: [],
    historyMovies: [],
    favoritesGot: false,
    historyGot: false
  },

  mutations: {
    // 设置 favorites 列表
    SET_FAVORITES (state, data) {
      state.favoriteMovies = []
      state.wannaMovies = []
      state.favoritesGot = true
      const now = Date.now()
      for (let i = 0; i < data.length; ++i) {
        if (data[i].movie.playingTime > now) {
          state.wannaMovies.push(data[i])
        } else {
          state.favoriteMovies.push(data[i])
        }
      }
    },

    // 新增 favorite 的电影
    ADD_FAVORITE (state, item) {
      const now = Date.now()
      if (item.movie.playingTime > now) {
        state.wannaMovies.push(item)
      } else {
        state.favoriteMovies.push(item)
      }
    },

    // 删除 favorite 的电影
    DELETE_FAVORITE (state, favoriteId) {
      for (let i = 0; i < state.favoriteMovies.length; ++i) {
        if (state.favoriteMovies[i].id === favoriteId) {
          state.favoriteMovies.splice(i, 1)
          return
        }
      }
      for (let i = 0; i < state.wannaMovies.length; ++i) {
        if (state.wannaMovies[i].id === favoriteId) {
          state.wannaMovies.splice(i, 1)
          return
        }
      }
    },

    // 设置观影历史
    SET_HISTORY_MOVIES (state, movies) {
      for (let i = 0; i < movies.length; ++i) {
        state.historyMovies.push({ movie: movies[i] })
      }
      state.historyGot = true
    },

    // 初始化状态
    INIT_FAV_STATE (state) {
      state.favoritesGot = false
      state.historyGot = false
    }
  },

  actions: {
    // 查询 favorite 列表
    GET_FAVORITES ({ commit }) {
      return axios.get('/api/favorites/').then(res => {
        res.status === 200 ? commit('SET_FAVORITES', res.data) : ''
      })
    },

    // favorite 电影
    FAVORITE_MOVIE ({ commit }, movie) {
      /* eslint-disable no-undef */
      let formData = new FormData()
      formData.append('movieId', movie.id)
      return axios.post('/api/favorites/', formData).then(res => {
        res.status === 200 ? commit('ADD_FAVORITE', {
          id: res.data.id,
          movie
        }) : ''
      })
    },

    // 取消某部电影的 favorite
    UNFAVORITE_MOVIE ({ commit }, favoriteId) {
      return axios.delete('/api/favorites/' + favoriteId).then(res => {
        res.status === 200 ? commit('DELETE_FAVORITE', favoriteId) : ''
      })
    },

    // 查询观影历史
    GET_HISTORY_MOVIES ({ commit }) {
      return axios.get('/api/users/history').then(res => {
        res.status === 200 ? commit('SET_HISTORY_MOVIES', res.data) : ''
      })
    }
  }
}
