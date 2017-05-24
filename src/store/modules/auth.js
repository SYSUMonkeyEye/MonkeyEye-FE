import axios from 'axios'
import Form from '../../common/utils/Form'

export default {
  state: {
    user: ''
  },
  mutations: {
    SET_SMS_CODE (state, smscode) {
      state.formData.smscode = smscode
    },
    SET_RESULT (state, message) {
      if (message === '验证码非法' || message === '请先获取短信验证码' || message === '验证码错误') state.err.smscode = message
      else state.err.id = '手机号已被注册'
    },
    SET_USER (state, user) {
      state.user = user
    },
    RE_SET (state) {
      state.signInErr.err.id = state.signInErr.err.phone = ''
    }
  },
  actions: {
    GET_SMS_CODE ({commit}, mobile) {
      return axios.get('/api/smscode?mobile=' + mobile).then(res => {
        res.status >= 200 ? commit('SET_SMS_CODE', res.data.message) : ''
      })
    },
    GET_USER ({commit}) {
      return axios.get('/api/users/').then((res) => {
        res.status === 200 ? commit('SET_USER', res.data) : ''
      })
    },
    SIGN_UP ({commit}, data) {
      return axios(Form.postData('/api/users/', data)).then(res => {
        commit('SET_RESULT', res.data.message)
      })
    }
  }
}
