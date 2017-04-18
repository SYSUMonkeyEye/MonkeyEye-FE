import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Signin from '../components/auth/Signin'
import Signup from '../components/auth/Signup'
import Main from '../components/main/Main'
import Movies from '../components/main/Movies'
import Me from '../components/main/me'
import MovieDetail from '../components/movie/MovieDetail'
import MovieSearch from '../components/movie/MovieSearch'
import Reservation from '../components/order/Reservation'
import OrderPay from '../components/order/OrderPay'
import UserInfo from '../components/profile/UserInfo'

export default new Router({
  mode: 'history',
  routes: [
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
    { path: '/main',
      component: Main,
      children: [
        { path: 'movies', component: Movies },
        { path: 'me', component: Me },
        { path: '', redirect: 'movies' }
      ]
    },
    { path: '/movie-detail', component: MovieDetail },
    { path: '/movie-search', component: MovieSearch },
    { path: '/reservation', component: Reservation },
    { path: '/order-pay', component: OrderPay },
    { path: '/user-info', component: UserInfo },
    { path: '/', redirect: '/main' }
  ]
})
