import axios from 'axios'

export default {
  state: {
    coupons: [],
    isInitial: false,
    couponSelected: {},
    condition: 0
  },

  getters: {
    qualifiedCoupons: state => {
      return state.coupons.filter(coupon => coupon.condition <= state.condition)
    }
  },

  mutations: {
    SET_COUPONS (state, coupons) {
      state.coupons = coupons
    },
    SET_CONDITION (state, condition) {
      state.condition = condition
    },
    SET_COUPON_SELECTED (state, couponSelected) {
      state.couponSelected = couponSelected
    },
    RESET_COUPON_SELECTED (state) {
      state.couponSelected = ''
    },
    ADD_COUPON (state, coupon) {
      state.coupons.push(coupon)
    },
    INIT_COUPON_STATE (state) {
      state.isInitial = false
    }
  },
  actions: {
    GET_COUPONS ({ commit, state }) {
      if (state.isInitial) return
      return axios.get('/api/coupons/').then((res) => {
        if (res.status === 200) {
          commit('SET_COUPONS', res.data)
          state.isInitial = true
        }
      })
    }
  }
}
