import axios from 'axios'
let serviceUrl = ''
switch (process.env.NODE_ENV) {
  case 'development':
    serviceUrl = ''
    break
  case 'production':
    serviceUrl = ''
    break
  case 'test':
    serviceUrl = ''
    break
  case 'uat':
    serviceUrl = ''
    break
}

axios.defaults.baseURL = serviceUrl

export default {
  serviceUrl
}