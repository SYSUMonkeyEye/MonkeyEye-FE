import axios from 'axios'

export default {
  state: {
    favoriteMovies: [],
    wannaMovies: [],
    historyMovies: [],
    favoritesGot: false
  },

  mutations: {
    // 设置 favorites 列表
    SET_FAVORITES (state, data) {
      state.favoriteMovies = []
      state.wannaMovies = []
      state.favoritesGot = true
      const now = Date.now()
      for (let i = 0; i < data.length; ++i) {
        if (data[i].playingTime > now) {
          state.wannaMovies.push(data[i])
        } else {
          state.favoriteMovies.push(data[i])
        }
      }
    },

    // 新增 favorite 的电影
    ADD_FAVORITE (state, movie) {
      const now = Date.now()
      if (movie.playingTime > now) {
        state.wannaMovies.push(movie)
      } else {
        state.favoriteMovies.push(movie)
      }
    },

    // 删除 favorite 的电影
    DELETE_FAVORITE (state, movieId) {
      for (let i = 0; i < state.favoriteMovies.length; ++i) {
        if (state.favoriteMovies[i].id === movieId) {
          state.favoriteMovies.splice(i, 1)
          return
        }
      }
      for (let i = 0; i < state.wannaMovies.length; ++i) {
        if (state.wannaMovies[i].id === movieId) {
          state.wannaMovies.splice(i, 1)
          return
        }
      }
    }
  },

  actions: {
    // 查询 favorite 列表
    GET_FAVORITES ({ commit }) {
      return axios.get('/api/favorites').then(res => {
        res.status === 200 ? commit('SET_FAVORITES', res.data) : ''
      })
    },

    // favorite 电影
    FAVORITE_MOVIE ({ commit }, movie) {
      return axios.post('/api/favorites', { movieId: movie.id }).then(res => {
        res.status === 200 ? commit('ADD_FAVORITE', movie) : ''
      })
    },

    // 取消某部电影的 favorite
    UNFAVORITE_MOVIE ({ commit }, movieId) {
      return axios.delete('/api/favorites/' + movieId).then(res => {
        res.status === 200 ? commit('DELETE_FAVORITE', movieId) : ''
      })
    }
  }
}
