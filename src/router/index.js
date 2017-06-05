import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Signin from '../components/auth/Signin'
import Signup from '../components/auth/Signup'
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
import SelctCoupon from '../components/order/SelectCoupon'
import SelectSeat from '../components/order/SelectSeat'
import SelectScreen from '../components/order/SelectScreen'
import ChangeInfo from '../components/profile/ChangeInfo'
import Coupons from '../components/profile/Coupons'
import MovieCollection from '../components/profile/MovieCollection'
import UserInfo from '../components/profile/UserInfo'

import store from '../store'

const router = new Router({
  routes: [
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
    { path: '/movie-comment/:movieId', component: MovieComment },
    { path: '/main',
      component: Main,
      children: [
        { path: 'movies', component: Movies },
        { path: 'me', component: Me },
        { path: '*', redirect: 'movies' }
      ]
    },
    { path: '/movie-detail/:movieId', component: MovieDetail },
    { path: '/movie-search', component: MovieSearch },
    { path: '/my-orders/:type', component: MyOrders, meta: { requireAuth: true } },
    { path: '/order-detail/:orderId', component: OrderDetail, meta: { requireAuth: true } },
    { path: '/order-pay/:orderId', component: OrderPay, meta: { requireAuth: true } },
    { path: '/reservation/:screenId', component: Reservation, meta: { requireAuth: true } },
    { path: '/select-coupon', component: SelctCoupon, meta: { requireAuth: true } },
    { path: '/select-seat/:screenId', component: SelectSeat, meta: { requireAuth: true } },
    { path: '/select-screen/:movieId', component: SelectScreen, meta: { requireAuth: true } },
    { path: '/change-info', component: ChangeInfo, meta: { requireAuth: true } },
    { path: '/coupons', component: Coupons, meta: { requireAuth: true } },
    { path: '/movie-collection/:type', component: MovieCollection, meta: { requireAuth: true } },
    { path: '/user-info', component: UserInfo, meta: { requireAuth: true } },
    { path: '*', redirect: '/main/' }
  ]
})

// 权限检查
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (!store.state.auth.user) {
      next({
        path: '/signin'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
