import axios from 'axios'

export default {
  actions: {
    // 获取某部电影的评论列表
    GET_COMMENTS (context, movieId) {
      return axios.get('/api/comments/?movieId=' + movieId).then(res => {
        if (res.status === 200) {
          return res.data
        } else {
          return []
        }
      })
    },

    // 对某部电影发表评价
    COMMENT_MOVIE (context, data) {
      /* eslint-disable no-undef */
      let formData = new FormData()
      formData.append('movieId', data.movieId)
      formData.append('rating', data.rating)
      formData.append('content', data.content)
      return axios.post('/api/comments/', formData).then(res => {
        return res.status === 200
      })
    }
  }
}
