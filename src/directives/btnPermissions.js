
import { read } from '../storage'
/** 权限指令**/

// 权限检查方法
function _has (path, target) {
  const result = JSON.parse(read('btnPremissions'))
  try {
    return result[path].some(p => {
      return p === target
    })
  } catch (error) {
    console.log('权限解析错误', error)
  }
}
export default {
  inserted: function (el, binding) {
    const { path, target } = binding.value
    // 获取按钮权限
    if (target !== 'no') {
      if (!_has(path, target)) {
        el.parentNode.removeChild(el)
      }
    }
  }
}
