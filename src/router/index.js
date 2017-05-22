import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Signin from '../components/auth/Signin'
import Signup from '../components/auth/Signup'
import Password from '../components/auth/Password'
import MovieComment from '../components/comment/MovieComment'
import Main from '../components/main/Main'
import Movies from '../components/main/Movies'
import Me from '../components/main/Me'
import MovieDetail from '../components/movie/MovieDetail'
import MovieSearch from '../components/movie/MovieSearch'
import MyOrders from '../components/order/MyOrders'
import OrderDetail from '../components/order/OrderDetail'
import OrderPay from '../components/order/OrderPay'
import Reservation from '../components/order/Reservation'
import SelectSeat from '../components/order/SelectSeat'
import SelectScreen from '../components/order/SelectScreen'
import ChangeInfo from '../components/profile/ChangeInfo'
import Coupons from '../components/profile/Coupons'
import MovieCollection from '../components/profile/MovieCollection'
import UserInfo from '../components/profile/UserInfo'

export default new Router({
  mode: 'history',
  routes: [
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
    { path: '/password', component: Password },
    { path: '/movie-comment', component: MovieComment },
    { path: '/main',
      component: Main,
      children: [
        { path: 'movies', component: Movies },
        { path: 'me', component: Me },
        { path: '*', redirect: 'movies' }
      ]
    },
    { path: '/movie-detail/:id', component: MovieDetail },
    { path: '/movie-search', component: MovieSearch },
    { path: '/my-orders/:type', component: MyOrders },
    { path: '/order-detail/:orderId', component: OrderDetail },
    { path: '/order-pay/:orderId', component: OrderPay },
    { path: '/reservation/:screenId', component: Reservation },
    { path: '/select-seat/:screenId', component: SelectSeat },
    { path: '/select-screen/:movieId', component: SelectScreen },
    { path: '/change-info', component: ChangeInfo },
    { path: '/coupons', component: Coupons },
    { path: '/movie-collection/:type', component: MovieCollection },
    { path: '/user-info', component: UserInfo },
    { path: '*', redirect: '/main/' }
  ]
})
