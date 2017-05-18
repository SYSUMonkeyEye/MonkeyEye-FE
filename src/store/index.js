import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import movie from './modules/movie'
import screen from './modules/screen'
import auth from './modules/auth'

const store = new Vuex.Store({
  modules: {
    movie: movie,
    screen: screen,
    auth: auth
  }
})

export default store
