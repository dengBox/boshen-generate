import { addListener, removeListener } from '@/assets/js/event'

let event = 'resize'
let hasHandler = false
let dom = window
/**
 * @param {event} 事件名称
 * @param {notWindow} 是否绑定为window，默认为true（存在表示为当前dom绑定事件）
 * @deprecated dom || window绑定事件监听
 * @example<div v-event.click.isWindow="clickHandler"></div>
 * @remark 第一个参数必须是事件名称,暂时不对事件做校验
 */
export default {
  event: 'resize',
  inserted: function (el, binding) {
    if (binding.value && typeof (binding.value) === 'function') {
      if (JSON.stringify(binding.modifiers) !== '{}') {
        event = Object.keys(binding.modifiers)[0]
        if (binding.modifiers.notWindow) { dom = el }
      }
      hasHandler = true
      addListener(dom, event, binding.value)
    }
  },
  unbind: function (el, binding) {
    if (hasHandler) {
      removeListener(dom, event, binding.value)
    }
  }
}
