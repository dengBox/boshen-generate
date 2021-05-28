// 封装全局使用的socket类
import { read } from '../storage'

let lockReconnect = false
let socketUrl = ''
switch (process.env.NODE_ENV) {
  case 'development':
    socketUrl = ''
    break
  case 'production':
    socketUrl = ''
    break
  case 'testing':
    socketUrl = ''
    break
  case 'uat':
    socketUrl = ''
    break
  default:
    socketUrl = ''
    break
}
const WEBSOCKET_URL = `${socketUrl}?identify_primary=`
let websocket = {}

const heartCheck = {
  timeout: 50 * 1000, // 1分钟发一次心跳
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function () {
    clearTimeout(this.timeoutObj)
    clearTimeout(this.serverTimeoutObj)
    return this
  },
  start: function () {
    this.timeoutObj = setTimeout(() => {
      // 这里发送一个心跳，后端收到后，返回一个心跳消息，
      // onmessage拿到返回的心跳就说明连接正常
      websocket.send('ping')
      this.serverTimeoutObj = setTimeout(() => {
        // 如果超过一定时间还没重置，说明后端主动断开了
        // 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
        websocket.close()
      }, this.timeout)
    }, this.timeout)
  }
}

function getWebSocket () {
  if (!websocket || websocket.readyState !== 1) {
    return openWebSocket()
  }
  return websocket
}

function reconnect () {
  if (lockReconnect) return
  lockReconnect = true
  setTimeout(function () {
    // 没连接上会一直重连，设置延迟避免请求过多
    openWebSocket()
    lockReconnect = false
  }, 2000)
}

function openWebSocket () {
  let url = WEBSOCKET_URL + JSON.parse(read('userInfor')).employeeNo
  try {
    websocket = new WebSocket(url)
  } catch (error) {
    console.log('connectSocket error:', error)
  }
  websocket.onopen = (event) => {
    console.log('websocket open:', event)
    heartCheck.reset().start()
  }
  websocket.onerror = error => {
    reconnect()
    console.log('websocket error:', error)
  }
  websocket.onclose = event => {
    reconnect()
    console.log('websocker close', event)
  }
  return websocket
}

// 消息类型的枚举
const SOCKET_TYPES = [
  'unreadMessage', // 未读消息
  'readMessage' // 已读消息
]
class GaiaSocket {
  constructor (events) {
    this.list = {}
    events.forEach(v => {
      this.list[v] = []
    })
  }
  on (ev, callback) {
    if (this.list[ev]) {
      this.list[ev].push(callback)
      return true
    } else {
      return false
    }
  }
  emit (ev, data) {
    // 防止其他callback修改data，data拷贝
    const dataStr = JSON.stringify(data)
    if (this.list[ev]) {
      this.list[ev].forEach(v => {
        new Promise(() => { v(JSON.parse(dataStr)) }).catch(err => { console.log('socket callback error:', err, v) })
      })
      return true
    } else {
      return false
    }
  }

  remove (ev, callback) {
    if (callback && this.list[ev]) {
      this.list[ev].forEach((v, i) => {
        if (v === callback) {
          this.list[ev].splice(i, 1)
        }
      })
      return true
    } else {
      return false
    }
  }
}

export const socket = new GaiaSocket(SOCKET_TYPES)

export function connectSocket () {
  const websocket = getWebSocket()
  websocket.onmessage = msgEvent => {
    heartCheck.reset().start()
    const data = JSON.parse(JSON.parse(msgEvent.data).message)
    switch (data.messageStatus) {
      case -1:
        console.log('心跳检测', data)
        break
      case 0:
        socket.emit('unreadMessage', data)
        break
      case 1:
        socket.emit('readMessage', data)
        break
      default:
        console.log('未知消息')
        break
    }
  }
}

export function disconnectSocket () {
  const websocket = getWebSocket()
  try {
    websocket.close()
  } catch (error) {
    console.log('disconnectSocket error', error)
  }
}
