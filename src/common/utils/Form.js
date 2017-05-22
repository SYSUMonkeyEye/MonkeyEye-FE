/* eslint-disable no-undef */
export default {
  generateFrom (data) {
    let formData = new FormData()
    for (var key in data) {
      if (key !== 'repeat') formData.append(key, data[key])
    }
    return formData
  },
  postData (url, data) {
    return {
      url: url,
      data: this.generateFrom(data),
      method: 'POST'
    }
  }
}
