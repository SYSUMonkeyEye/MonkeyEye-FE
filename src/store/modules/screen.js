import axios from 'axios'
import * as DateUtils from '../../common/utils/DateUtils'

export default {
  state: {
    screen: {
      movie: {}
    },
    screens: [[], [], []],
    seatsLocked: [],
    seatsSelected: []
  },

  mutations: {
    // 设置某部电影的所有场次
    SET_MOVIE_SCREENS (state, screens) {
      state.screens = [[], [], []]

      const now = new Date()

      for (let i = 0; i < screens.length; i++) {
        let date = new Date(screens[i].time)
        let days = DateUtils.daysBetween(now, date)

        if (days >= 0 && days < 3) {
          state.screens[days].push(screens[i])
        }
      }
    },
    SET_MOVIE_SCREEN (state, screen) {
      const now = new Date()
      let date = new Date(screen.time)

      let days = DateUtils.daysBetween(now, date)

      const dateMap = ['今天', '明天', '后天']

      screen.playingDate = dateMap[days] + DateUtils.getDate(days)
      screen.playingTime = DateUtils.getTime(screen.time)

      state.screen = screen
    },
    SET_MOVIE_SCREEN_SEATS (state, seatsLocked) {
      state.seatsLocked = seatsLocked
    },
    SET_SEATS_SELECTED (state, seatsSelected) {
      state.seatsSelected = seatsSelected
    }
  },

  actions: {
    GET_ALL_SCREENS ({ commit }, movieId) {
      return axios.get('/api/screens/', {
        params: {
          movieId: movieId
        }
      }).then(res => {
        if (res.status === 200) {
          commit('SET_MOVIE_SCREENS', res.data)
        }
      })
    },
    GET_ONE_SCREEN ({ commit }, screenId) {
      return axios.get(`/api/screens/${screenId}`).then(res => {
        if (res.status === 200) {
          commit('SET_MOVIE_SCREEN', res.data)
        }
      })
    },
    GET_ONE_SCREEN_SEATS ({ commit }, screenId) {
      return axios.get(`/api/screens/${screenId}/seats`).then(res => {
        if (res.status === 200) {
          commit('SET_MOVIE_SCREEN_SEATS', res.data)
        }
      })
    },
    RESET_SEATS_SELECTED ({ commit }) {
      commit('SET_SEATS_SELECTED', [])
    }
  }
}
