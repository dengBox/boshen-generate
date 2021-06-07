'use strict'

import Vue from 'vue'
import axios from 'axios'
import shscUI from '../../public/shsc-ui/lib/index.min'
import router from '../router'
import { clear } from '@/storage/index'
import store from '../store'
import './../../.config.http.js'

const { Message } = shscUI

let config = {
  timeout: 10 * 60 * 1000 // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    if (sessionStorage.token) config.headers.shsctoken = sessionStorage.token
    // 当 请求data字段为undefined时  会删除ContentType 字段
    if (config.method === 'get') config.data = true
    return config
  },
  function (error) {
    Message({
      type: 'error',
      message: '请求超时！'
    })
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
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
    if (!error.response) {
      router.replace('/502')
      Message({
        type: 'error',
        message: '网络异常，请检查您的网络连接是否正常！'
      })
    } else if (error.response.status === 401) {
      router.replace('/403')
      Message({
        type: 'error',
        message: '当前用户没有访问该页面资源的权限！'
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
        message: '系统错误'
      })
    }
    return Promise.reject(error)
  }
)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
}

Vue.use(Plugin)

export default Plugin
