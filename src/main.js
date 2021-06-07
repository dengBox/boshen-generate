import Vue from 'vue'
import App from '@/App.vue'
import '@/http'
import router from '@/router'
import store from '@/store'
import i18n from '@/assets/js/i18n'
import untils from '@/assets/js/until.js'
import dayjs from 'dayjs'

// 按钮权限
import btnPermissions from '@/directives/btnPermissions.js'
// 引入公司ui组件
import shscUI from '../public/shsc-ui/lib/index.min'
import '../public/shsc-ui/lib/index.css'

import shscBusinessUI from '../public/shsc-business-ui/lib/index.min'
import '../public/shsc-business-ui/lib/index.css'

import '../public/shsc-business-ui/lib/font/style/index'
// 最后引入公共样式
import './assets/css/base.scss'

// Vue.use(shscUI, {
//   size: 'middle'
// })

Vue.use(shscUI)
Vue.use(shscBusinessUI)

Vue.directive('has', btnPermissions)

// eslint-disable-next-line new-cap
const scui = new shscUI.init({
  _vue: Vue,
  size: 'middle'
})

Vue.config.productionTip = false

Vue.prototype.$dayjs = dayjs
Vue.prototype.$untils = untils

new Vue({
  router,
  store,
  i18n,
  scui,
  render: h => h(App)
}).$mount('#app')
