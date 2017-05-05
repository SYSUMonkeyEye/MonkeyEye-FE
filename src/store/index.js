import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import movie from './modules/movie'

const store = new Vuex.Store({
  modules: {
    movie: movie
  }
})

export default store
