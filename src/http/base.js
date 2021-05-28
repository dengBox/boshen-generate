import Vue from 'vue'
import { read } from '../storage'

export const get = (param) => {
  return Vue.axios.get(param.url, {
    params: param.query || {},
    headers: param.headers || {}
  })
}

export const getForm = (params) => {
  return Vue.axios({
    url: params.url,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'get',
    params: params.query
  })
}

export const post = (param, config = {}) => {
  return Vue.axios.post(param.url, param.body, config)
}

export const put = (param, config = {}) => {
  return Vue.axios.put(param.url, param.body, config)
}

export const remove = (param, config = {}) => {
  return Vue.axios.delete(param.url, { data: param.body }, config)
}

/**
 *
 * @param {String} method get
 * @param {Object} param {url: ' ', body: {}}
 */
export function getdownload (param) {
  return new Promise((resolve, reject) => {
    Vue.axios.get(param.url, {
      params: param.query || {},
      headers: param.headers || {}
    }).then(res => {
      let fileName = Vue.$moment().format('YYYY-MM-DD') + '.xml'
      const csvData = new Blob([res.data], { type: 'application/vnd.ms-excel;charset=UTF-8' })
      if (read('browser') === 'IE') {
        window.navigator.msSaveOrOpenBlob(csvData, fileName)
      } else {
        const linkEle = document.createElement('a')
        fileName = decodeURI(res.headers['content-disposition'].split('filename=')[1]).toString()
        const url = window.URL.createObjectURL(csvData)
        linkEle.setAttribute('href', url)
        linkEle.setAttribute('download', fileName)
        linkEle.click()
      }
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 *
 * @param {String} method post
 * @param {Object} param {url: ' ', body: {}}
 */
export function postExport (param) {
  return new Promise((resolve, reject) => {
    Vue.axios({
      method: 'post',
      url: param.url,
      data: param.body,
      responseType: 'blob'
    }).then(res => {
      const content = res
      if (content.size === 0) {
        decodeURI(res.headers['content-disposition'].split('filename=')[1]).toString()
      }
      const blob = new Blob([content])
      const fileName = Vue.$moment().format('YYYYMMDDhhmm') + '.xls'
      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      } else {
        navigator.msSaveBlob(blob, fileName)
      }
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
