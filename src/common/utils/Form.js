/* eslint-disable no-undef */
export default {
  generateFrom (data) {
    let formData = new FormData()
    for (var key in data) {
      formData.append(key, data[key])
    }
    return formData
  },
  postData (url, data) {
    return {
      url: url,
      data: this.generateFrom(data),
      method: 'POST'
    }
  },
  upload (cb) {
    let input = document.createElement('input')
    input.type = 'file'
    document.body.appendChild(input)
    input.onchange = (evt) => {
      let file = evt.target.files[0]
      let reader = new FileReader()
      reader.onloadend = (e) => {
        cb({
          url: e.target.result,
          file: file
        })
      }
      reader.readAsDataURL(file)
    }
    input.click()
    input.style.display = 'none'
  }
}
