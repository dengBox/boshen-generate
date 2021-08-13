'use strict'

import Vue from 'vue'
import axios from 'axios'
import shscUI from '../../public/shsc-ui/lib/index.min'
import router from '../router'
import { clear } from '@/storage/index'
import store from '../store'
import './../../.config.http.js'
import i18n from '@/assets/js/i18n'

// Vue.prototype.$t = function (key) {
//   var values = [], len = arguments.length - 1;
//   while ( len-- > 0 ) values[ len ] = arguments[ len + 1 ];

//   var i18n = this.$i18n;
//   return i18n._t.apply(i18n, [ key, i18n.locale, i18n._getMessages(), this ].concat( values ))
// };

// console.log('11111', i18n._t('page.login.loginBtn', i18n.locale, i18n.messages))

const { Message } = shscUI

let date = new Date().getTime()
let axiosCancel = []
let timer = null
let msgFlag = {
  router: '',
  isError: true
}

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 10 * 60 * 1000 // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (sessionStorage.token) {
      config.headers.shsctoken = sessionStorage.token
    }
    // 当 请求data字段为undefined时  会删除ContentType 字段
    if (config.method === 'get') {
      config.data = true
    }
    config.cancelTag = ++date
    // 添加取消标记
    config.cancelToken = new axios.CancelToken(cancel => {
      axiosCancel.push({
        cancel,
        cancelTag: date
      })
    })
    return config
  },
  function (error) {
    Message({
      type: 'error',
      message: i18n._t('common.message.requestTimeout', i18n.locale, i18n.messages)
    })
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    axiosCancel = axiosCancel.filter(
      a => a.cancelTag === response.config.cancelTag
    )
    // 流数据没有相应status、故不做判断。。。
    if (response.data.status !== 200 && response.data.status) {
      Message({
        type: 'error',
        message: response.data.message
      })
      return Promise.reject(response)
    } else if (response.config.headers.responseType === 'blob') {
      return response
    } else {
      return response.data
    }
  },
  function (error) {
    if (error.message !== '频繁切换，中断请求') {
      axiosCancel = axiosCancel.filter(a => a.cancelTag === error.config.cancelTag)
    }

    if (msgFlag.router === '' || msgFlag.router !== router.history.current.fullPath) {
      msgFlag.isError = true
    }

    if (!msgFlag.isError) {
      return Promise.reject(error)
    }

    clearTimeout(timer)
    msgFlag.isError = false
    msgFlag.router = router.history.current.fullPath
    timer = setTimeout(() => {
      msgFlag.isError = true
    }, 3000)
    if (error.message === '频繁切换，中断请求') {
      Promise.reject(error)
    }
    if (!error.response) {
      router.replace('/502')
      Message({
        type: 'error',
        message: i18n._t('common.message.error502', i18n.locale, i18n.messages)
      })
    } else if (error.response.status === 401) {
      router.replace('/403')
      Message({
        type: 'error',
        message: i18n._t('common.message.error401', i18n.locale, i18n.messages)
      })
    } else if (error.response.status === 404) {
      Message({
        type: 'error',
        message: error
      })
    } else if (error.response.status === 403) {
      Message({
        type: 'error',
        message: error.response.data.message
      })
      clear('token', true)
      // 清除store中的token
      store.commit('SAVE_TOKEN', '')
      router.replace('/login')
    } else {
      Message({
        type: 'error',
        message: i18n._t('common.message.systemError', i18n.locale, i18n.messages)
      })
    }
    return Promise.reject(error)
  }
)

function canelRequest (arr = axiosCancel) {
  if (arr.length > 0) {
    arr.forEach(r => {
      r.cancel('频繁切换，中断请求')
    })
    arr = []
  }
}

Plugin.install = function (Vue, options) {
  Vue.prototype.$axiosCancel = canelRequest
  Vue.axios = _axios
}

Vue.use(Plugin)

export default Plugin
