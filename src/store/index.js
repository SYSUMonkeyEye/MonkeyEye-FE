import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from './modules/auth'
import comment from './modules/comment'
import coupon from './modules/coupon'
import favorite from './modules/favorite'
import movie from './modules/movie'
import order from './modules/order'
import screen from './modules/screen'

const store = new Vuex.Store({
  modules: {
    auth,
    comment,
    coupon,
    favorite,
    movie,
    order,
    screen
  }
})

export default store
