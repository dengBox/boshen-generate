/**
 * @param {Array} arr
 * @param {Number} id
 * @param {Function} cb
 * @param {Object} parent
 */
export function deepFind (arr, id, cb, parent) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item._id === id) {
      /**
       * 找到符合条件时，调用函数
       * 1. item: 符合条件对象
       * 2. i: 当前index
       * 3. parent: 父节点
       */
      cb(item, i, parent || {})
      continue
    } else if (item.children && item.children.length) {
      deepFind(item.children, id, cb, item)
    }
  }
}

/**
 * @param {Array} arr
 * @param {Function} cb
 */
export function deepChange (arr, cb) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    cb(item)
    if (item.children && item.children.length) {
      deepChange(item.children, cb)
    }
  }
}

export function deepDomHandle (arr, event, currentWrap, cb, r) {
  const result = arr.find(child => {
    const position = child.getBoundingClientRect()
    /**
     * 1. 上下区间
     * 2. 左右区间
     */
    return event.clientY >= position.top &&
    position.bottom >= event.clientY &&
    event.clientX >= position.left &&
    position.right >= event.clientX
  })
  if (result) {
    let activeNode = null
    if (result.className.indexOf('panel-items') !== -1) {
      if (result.tagName === 'UL') {
        // 取父级最后一个节点
        activeNode = result.parentNode.lastChild
      } else {
        // 取当前最后一个节点
        activeNode = result.lastChild
      }
    } else {
      activeNode = result.parentNode.lastChild
    }
    if (!activeNode) {
      cb(activeNode)
      return
    }
    r = activeNode
    // console.log(result.className.split(' '))
    if (result.className.indexOf('panel-item-empty') === -1 && result.className.indexOf('panel-items') !== -1) {
      deepDomHandle([...result.children].filter(c => c.className.indexOf('panel-items') !== -1), event, currentWrap, cb, r)
    } else {
      cb(r || activeNode)
    }
  } else if (currentWrap.panel._id !== -1) {
    let activeNode = currentWrap.el.parentNode.lastChild
    cb(r || activeNode)
  } else {
    cb(r)
  }
}
