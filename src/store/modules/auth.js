import axios from 'axios'
import Form from '../../utils/Form'

export default {
  state: {
    time: 10,
    formData: {
      id: '',
      smscode: '',
      password: '',
      repeat: '',
      payPassword: ''
    },
    err: {
      phone: '',
      smscode: '',
      password: '',
      payPassword: '',
      repeat: ''
    },
    signInErr: {
      password: '',
      id: ''
    },
    signInData: {
      id: '',
      password: ''
    }
  },
  mutations: {
    SET_SMS_CODE (state, smscode) {
      state.formData.smscode = smscode
    },
    SET_RESULT (state, message) {
      if (message === '验证码非法' || message === '请先获取短信验证码' || message === '验证码错误') state.err.smscode = message
      else state.err.id = '手机号已被注册'
    },
    RE_SET (state) {
      state.signInErr.err.id = state.signInErr.err.phone = ''
    },
    SET_SIGN_IN_RESULT (state, message) {
      state.signInErr.id = state.signInErr.password = ''
      if (message === '密码错误') state.signInErr.password = '密码错误'
      else if (message === '用户不存在') state.signInErr.id = '用户不存在'
    }
  },
  actions: {
    GET_SMS_CODE ({commit}, mobile) {
      return axios.get('/api/smscode?mobile=' + mobile).then(res => {
        res.status >= 200 ? commit('SET_SMS_CODE', res.data.message) : ''
      })
    },
    SIGN_IN ({commit}, data) {
      return axios(Form.postData('/api/session/', data)).then(res => {
        commit('SET_SIGN_IN_RESULT', res.data.message)
      })
    },
    SIGN_UP ({commit}, data) {
      return axios(Form.postData('/api/users/', data)).then(res => {
        commit('SET_RESULT', res.data.message)
      })
    }
  }
}
