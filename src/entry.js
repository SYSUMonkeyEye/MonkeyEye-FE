import Vue from 'vue'
import './common/css/font.css'
import './common/css/icon.css'

// vue-material 组件按需加载，减少构建后产品体积

// import VueMaterial from 'vue-material/dist/vue-material'
// import 'vue-material/dist/vue-material.css'
// Vue.use(VueMaterial)

import 'vue-material/dist/components/mdCore/index.css'
import 'vue-material/dist/components/mdButton/index.css'
import 'vue-material/dist/components/mdBackdrop/index.css'
import 'vue-material/dist/components/mdIcon/index.css'
import 'vue-material/dist/components/mdToolbar/index.css'
import 'vue-material/dist/components/mdSpinner/index.css'
import 'vue-material/dist/components/mdInputContainer/index.css'
import 'vue-material/dist/components/mdList/index.css'
import 'vue-material/dist/components/mdCheckbox/index.css'
import 'vue-material/dist/components/mdBottomBar/index.css'
import 'vue-material/dist/components/mdWhiteframe/index.css'
import 'vue-material/dist/components/mdTabs/index.css'
import 'vue-material/dist/components/mdChips/index.css'
import 'vue-material/dist/components/mdDialog/index.css'
import 'vue-material/dist/components/mdSnackbar/index.css'
import 'vue-material/dist/components/mdDivider/index.css'

import VueMaterialMdCore from 'vue-material/dist/components/mdCore'
import VueMaterialMdButton from 'vue-material/dist/components/mdButton'
import VueMaterialMdBackdrop from 'vue-material/dist/components/mdBackdrop'
import VueMaterialMdIcon from 'vue-material/dist/components/mdIcon'
import VueMaterialMdToolbar from 'vue-material/dist/components/mdToolbar'
import VueMaterialMdSpinner from 'vue-material/dist/components/mdSpinner'
import VueMaterialMdInputContainer from 'vue-material/dist/components/mdInputContainer'
import VueMaterialMdList from 'vue-material/dist/components/mdList'
import VueMaterialMdCheckbox from 'vue-material/dist/components/mdCheckbox'
import VueMaterialMdDialog from 'vue-material/dist/components/mdDialog'
import VueMaterialMdBottomBar from 'vue-material/dist/components/mdBottomBar'
import VueMaterialMdWhiteframe from 'vue-material/dist/components/mdWhiteframe'
import VueMaterialMdTabs from 'vue-material/dist/components/mdTabs'
import VueMaterialMdChips from 'vue-material/dist/components/mdChips'
import VueMaterialMdSnackbar from 'vue-material/dist/components/mdSnackbar'
import VueMaterialMdDivider from 'vue-material/dist/components/mdDivider'

Vue.use(VueMaterialMdCore)
Vue.use(VueMaterialMdButton)
Vue.use(VueMaterialMdBackdrop)
Vue.use(VueMaterialMdIcon)
Vue.use(VueMaterialMdToolbar)
Vue.use(VueMaterialMdSpinner)
Vue.use(VueMaterialMdInputContainer)
Vue.use(VueMaterialMdList)
Vue.use(VueMaterialMdCheckbox)
Vue.use(VueMaterialMdDialog)
Vue.use(VueMaterialMdBottomBar)
Vue.use(VueMaterialMdWhiteframe)
Vue.use(VueMaterialMdTabs)
Vue.use(VueMaterialMdChips)
Vue.use(VueMaterialMdSnackbar)
Vue.use(VueMaterialMdDivider)

Vue.material.registerTheme({
  default: {
    primary: 'red',
    accent: 'teal',
    warn: 'orange',
    background: 'white'
  },
  white: {
    primary: 'white'
  }
})

import LazyLoad from './common/utils/LazyLoad'

Vue.use(LazyLoad)

import App from './App'
import router from './router'
import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  render: h => h(App),
  router,
  store
})
