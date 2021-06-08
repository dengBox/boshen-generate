import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { read, save } from '@/storage'

// 引入路由
import Common from '@/views/Common.vue'
import NotFound from '@/components/status/404.vue'

NProgress.configure({ showSpinner: false })

Vue.use(VueRouter)

// 自动导入其他 router 文件
const context = require.context('./', true, /.js$/)
let routerList = []
context.keys().forEach(k => {
  if (k !== './index.js') {
    routerList = [...routerList, ...context(k).default]
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}

const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      // redirect: '/login'
      redirect: '/workbench'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      component: Common,
      children: [
        ...routerList
      ]
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
