import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import movie from './modules/movie'
import screen from './modules/screen'

const store = new Vuex.Store({
  modules: {
    movie: movie,
    screen: screen
  }
})

export default store
