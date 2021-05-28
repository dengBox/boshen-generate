
export default {
  getBrowserEngine () {
    const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
    if (
      userAgent.indexOf('Trident') !== -1 ||
      userAgent.indexOf('MSIE') !== -1 ||
      userAgent.indexOf('Edge') > -1
    ) {
      // 表示使用的是IE的内核
      return 'IE'
    } else if (userAgent.indexOf('Firefox') !== -1) {
      return 'Firefox'
    } else if (userAgent.indexOf('Chrome') !== -1) {
      return 'Chrome'
    } else if (userAgent.indexOf('Safari') !== -1) {
      return 'Safari'
    }
  },

  // 检查对象类型
  typeOf (obj) {
    const toString = Object.prototype.toString
    const map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    }
    return map[toString.call(obj)]
  },

  // 对象深拷贝
  deepCopy (data) {
    const t = this.typeOf(data)
    let o

    if (t === 'array') {
      o = []
    } else if (t === 'object') {
      o = {}
    } else {
      return data
    }

    if (t === 'array') {
      for (let i = 0; i < data.length; i++) {
        o.push(this.deepCopy(data[i]))
      }
    } else if (t === 'object') {
      for (let i in data) {
        o[i] = this.deepCopy(data[i])
      }
    }
    return o
  },

  /**
   * 验证字符串是否为空
   *
   * @param {String} str 字符串值
   * @returns true false
   */
  strIsEmpty (val) {
    if (val === undefined || val === null || val === 'null' || val === '') {
      return true
    }
    return false
  },

  // 去空格
  removeSpace (str) {
    return str.replace(/\s*/g, '')
  },
  /**
   * 校验上传文档文件后缀类型pdf,doc,docx
   *
   * @param {String} filename 文件名字
   * @param {String} types 文件类型集合
   * @returns true false
   */
  checkcontractdocFileSuffix (filename, types) {
    // 再对文件名进行截取，以取得后缀名
    var three = filename.split('.')
    // 获取截取的最后一个字符串，即为后缀名
    var last = three[three.length - 1]
    // 添加需要判断的后缀名类型
    var tp = types // 'pdf,doc,docx'
    // 返回符合条件的后缀名在字符串中的位置
    var rs = tp.indexOf(last)
    // 如果返回的结果大于或等于0，说明包含允许上传的文件类型
    if (rs >= 0) {
      return true
    } else {
      return false
    }
  },
  /**
   * @return {string} 数值保留两位小数
   * @param {*} point 待处理值 withPercent 是否带%
   * @description 转换百分数保留两位小数带或不带%
   */
  toPercent (point, withPercent) {
    let str = ''
    if (withPercent) {
      str = Number(point * 100)
      str += '%'
    } else {
      str = Number(point).toFixed(2)
    }
    return str
  },
  /**
   * @return {string} 返回处理后的字符串
   * @param {*} str 被截取字符串 length超过长度截取
   * @description 字符串长度过长时截取显示
   */
  stringSubStr (str, length) {
    let newStr = ''
    if (str !== '' && str !== null && str.length > length) {
      newStr = `${str.substring(0, length)}...`
    } else {
      newStr = str === null ? '' : str
    }
    return newStr
  },
  /**
   * @return {string} 返回处理后的和
   * @param {*} num1  num2
   * @description 自定义加法运算
   */
  //
  addNum (num1, num2) {
    let sq1 = ''
    let sq2 = ''
    let m = ''
    try {
      sq1 = num1.toString().split('.')[1].length
    } catch (e) {
      sq1 = 0
    }
    try {
      sq2 = num2.toString().split('.')[1].length
    } catch (e) {
      sq2 = 0
    }
    m = Math.pow(10, Math.max(sq1, sq2))
    let result = (Number(num1) * m + Number(num2) * m) / m
    // if (result.toString().indexOf('.') > -1) {
    //   if (result.toString().substring(result.toString().indexOf('.')).length > 1) {
    //     result = result.toFixed(2)
    //   }
    // }
    result = result.toFixed(2)
    return result
  },

  /**
   * @return {string} 转义过后字符串
   * @param {*} obj 引用数据类型
   * @description 转义中文，或者对象、数组，不带JSON.stringfly()
   */
  enCodeRouter (obj) {
    const encodeReserveRE = /[!'()*]/g
    const encodeReserveReplacer = function (c) {
      return '%' + c.charCodeAt(0).toString(16)
    }
    const commaRE = /%2C/g
    return encodeURIComponent(obj)
      .replace(encodeReserveRE, encodeReserveReplacer)
      .replace(commaRE, ',')
  },
  /**
   * @return {string}
   * @param {*} obj 引用数据类型
   * @description 校验文件类型是否是图片
   */
  checkImageSuffix (filename) {
    // 再对文件名进行截取，以取得后缀名
    var three = filename.split('.')
    // 获取截取的最后一个字符串，即为后缀名
    var last = three[three.length - 1]
    // 添加需要判断的后缀名类型
    var tp = 'bmp,jpg,jpeg,png,gif'
    // 返回符合条件的后缀名在字符串中的位置
    var rs = tp.indexOf(last.toLocaleLowerCase())
    // 如果返回的结果大于或等于0，说明包含允许上传的文件类型
    if (rs >= 0) {
      return true
    } else {
      return false
    }
  },
  /**
   ** 减法函数，用来得到精确的减法结果
   ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
   ** 调用：accSub(arg1,arg2)
   ** 返回值：arg1减去arg2的精确结果
   * */
  accSub (arg1, arg2) {
    let r1
    let r2
    let m
    let n
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2)) // last modify by deeka //动态控制精度长度
    n = r1 >= r2 ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
  },
  // 安全乘法
  accMul (a, b) {
    var c = 0
    var d = a.toString()
    var e = b.toString()
    try {
      c += d.split('.')[1].length
    } catch (f) { }
    try {
      c += e.split('.')[1].length
    } catch (f) { }
    return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c)
  },
  // 安全除法
  accDiv (a, b) {
    var c
    var d
    var e = 0
    var f = 0
    try {
      e = a.toString().split('.')[1].length
    } catch (g) { }
    try {
      f = b.toString().split('.')[1].length
    } catch (g) { }
    c = Number(a.toString().replace('.', ''))
    d = Number(b.toString().replace('.', ''))
    return this.accMul(c / d, Math.pow(10, f - e))
  },

  // debounce防抖,接受一个函数和延迟执行的时间作为参数，多次操作后仅执行最后一次操作
  debounce (fn, interval = 500) {
    let timeout = null
    return function () {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn.apply(this, arguments)
      }, interval)
    }
  },
  // throttle节流，多次操作后，仅在既定时间后执行第一次操作
  throttle (fn, interval = 300) {
    let run = true
    return function () {
      if (!run) return
      run = false
      setTimeout(() => {
        fn.apply(this, arguments)
        run = true
      }, interval)
    }
  }
}
