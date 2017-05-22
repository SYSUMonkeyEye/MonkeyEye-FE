import axios from 'axios'
import Form from '../../utils/Form'

export default {
  state: {
    forgetLogin: {
      id: ''
    },
    changeLogin: {
      id: ''
    },
    forgetPay: {
      id: ''
    },
    changePay: {
      id: ''
    }
  },
  mutations: {
    SET_RES (state) {
      console.log(state)
    }
  },
  actions: {
    FORGET_LOGIN ({commit}, data) {
      axios.create()
      Form.generateFrom(data)
      console.log(data)
    },
    CHANGE_LOGIN ({commit}, data) {
      console.log(data)
    },
    FORGET_PAY ({commit}, data) {
      console.log(data)
    },
    CHANGE_PAY ({commit}, data) {
      console.log(data)
    },
  }
}
