import axios from 'axios'
import Form from '../../common/utils/Form'

function markOrder (order) {
  if (!order.status) {
    order._status = 'unpay'
    return
  }

  let endTime = new Date(order.screenTime)
  endTime.setMinutes(order.duration)

  let now = new Date()

  if (endTime.getTime() - now.getTime() >= 0) {
    order._status = 'unplay'
    return
  }

  order._status = 'played'
}

export default {
  state: {
    isInitial: false,
    order: {},
    orders: []
  },
  mutations: {
    SET_ORDER (state, order) {
      state.order = order
    },
    SET_ORDERS (state, orders) {
      orders.forEach((order) => {
        markOrder(order)
      })
      state.orders = orders
    },
    ADD_ORDER (state, order) {
      markOrder(order)

      for (let i = 0; i < state.orders.length; i++) {
        if (state.orders[i].id === order.id) {
          state.orders.splice(i, 1)
          break
        }
      }

      state.orders.unshift(order)
    },
    REMOVE_UNVALID_ORDERS (state) {
      let orders = state.orders

      for (let i = 0; i < orders.length; i++) {
        if (orders[i]._status === 'unpay') {
          let endTime = new Date(orders[i].createTime)
          endTime.setMinutes(endTime.getMinutes() + 10)

          let nowTime = new Date()
          let delta = Math.floor((endTime.getTime() - nowTime.getTime()) / 1000)

          if (delta <= 0) {
            orders.splice(i, 1)
            i--
          }
        }
      }
    },
    INIT_ORDER_STATE (state) {
      state.isInitial = false
    }
  },
  actions: {
    CREATE_ORDER ({ commit }, order) {
      return axios(Form.postData('/api/orders/', order)).then((res) => {
        return res
      })
    },
    PAY_ORDER ({ commit }, data) {
      let form = {
        payPassword: data.payPassword
      }

      if (data.couponSelected) {
        form.couponId = data.couponSelected
      }

      return axios.patch('/api/orders/' + data.orderId, Form.generateFrom(form)).then((res) => {
        return res
      })
    },
    GET_ORDER_INFO ({ commit }, orderId) {
      return axios.get('/api/orders/' + orderId).then((res) => {
        if (res.status === 200) {
          commit('SET_ORDER', res.data)
        } else {
          commit('SET_ORDER', {})
        }
      })
    },
    GET_ALL_ORDERS ({ state, commit }) {
      if (state.isInitial) return
      return axios.get('/api/orders/').then((res) => {
        if (res.status === 200) {
          commit('SET_ORDERS', res.data)
          state.isInitial = true
        }
      })
    },
    GET_ADD_ORDER ({ commit, dispatch, state }, orderId) {
      return dispatch('GET_ORDER_INFO', orderId).then(() => {
        commit('ADD_ORDER', state.order)
      })
    }
  }
}
