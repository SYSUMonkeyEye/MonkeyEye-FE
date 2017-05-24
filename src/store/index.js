import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import movie from './modules/movie'
import screen from './modules/screen'
import auth from './modules/auth'
import favorite from './modules/favorite'
import comment from './modules/comment'

const store = new Vuex.Store({
  modules: {
    movie,
    screen,
    auth,
    favorite,
    comment
  }
})

export default store
