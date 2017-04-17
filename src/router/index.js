import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HelloWorld from '../components/HelloWorld'

export default new Router({
  mode: 'history',
  routes: [{
    path: '/helloworld',
    component: HelloWorld
  }, {
    path: '/',
    redirect: '/helloworld'
  }]
})
