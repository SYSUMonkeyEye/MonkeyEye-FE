export default function (Vue, options = {}) {
  // 默认图片
  let init = {
    default: '/static/images/poster/default.png'
  }

  // 需要进行监听的图片列表（还没有加载）
  let listeningList = []

  // 已经加载过的图片缓存列表
  let imagesCacheList = []

  // 是否已经加载图片
  // 相同的图片加载第一次后，之后直接从浏览器缓存取出即可
  let isAlreadyLoad = (imageSrc) => {
    if (imagesCacheList.indexOf(imageSrc) !== -1) {
      return true
    } else {
      return false
    }
  }

  // 检测图片是否可以加载，如果可以则进行加载
  let isCanShow = (item) => {
    let ele = item.ele
    let src = item.src

    let top = ele.getBoundingClientRect().top

    // 如果图片进入可视区域
    if (top < window.innerHeight) {
      let image = new Image()
      image.src = src
      image.onload = function () {
        ele.src = src
        imagesCacheList.push(src)

        let index = listeningList.indexOf(item)
        if (index !== -1) {
          listeningList.splice(index, 1)
        }
        return true
      }
    } else {
      return false
    }
  }

  let onScrollListener = () => {
    for (let i = 0; i < listeningList.length; i++) {
      isCanShow(listeningList[i])
    }
  }

  let loadListener = (ele, binding) => {
    // 指令的绑定值
    let imageSrc = binding.value

    // 如果已经加载过，则无需重新加载，直接将src赋值
    if (isAlreadyLoad(imageSrc)) {
      ele.src = imageSrc
      return
    }

    let item = {
      ele: ele,
      src: imageSrc
    }

    ele.src = init.default

    if (isCanShow(item)) {
      return
    }

    listeningList.push(item)
  }

  function activate (ele) {
    ele.addEventListener('scroll', onScrollListener)
  }

  function destroy (ele) {
    listeningList = []
    ele.removeEventListener('scroll', onScrollListener)
  }

  if (!Vue.prototype.$lazyload) {
    Vue.prototype.$lazyload = {
      activate: activate,
      destroy: destroy
    }
  }

  Vue.directive('lazyload', {
    inserted: loadListener,
    updated: loadListener
  })
}
