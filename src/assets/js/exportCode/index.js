/**
 * 导出源码类
 * 1. exportType: 导出类型（vue、react、javascript）
 * 2. sourceCode: 源代码
 *    a: 可读代码块 -- 专为生成器定制
 *    b: 蜀海内部ast源文件 || ast源码
 */

import dayjs from 'dayjs'
import VueReplace from './vue-plugin'
import ReactReplace from './react-plugin'
import AngularReplace from './angular-plugin'
import untils from '@/assets/js/until'

const fs = require('fs')
const FileSaver = require('file-saver')

const path = new RegExp('^[A-z]:\\\\(.+?\\\\)*$')

class CodeGenerator {
  constructor ({ sourceCode, exportType } = {}) {
    if (untils.typeOf(sourceCode) !== 'object') throw new Error('sourceCode 必须为 Object类型')
    this.init(sourceCode, exportType)
  }
  // 初始化操作
  init (sourceCode, exportType) {
    this.typeArr = ['vue', 'react', 'angular']
    this._ast = {}
    this.type = exportType
    if (!this.typeArr.find(t => t === this.type)) {
      console.error(new Error('请传递对应类型进行导出'))
      return
    }
    this.codeReplace = {
      vue: new VueReplace(),
      react: new ReactReplace(),
      angular: new AngularReplace()
    }
    this.code = path.test(sourceCode)
      ? fs.readFileSync(sourceCode, 'utf8', {})
      : sourceCode
    this._ast = this.toAst()
  }
  // 转换真正方法
  toAst () {
    /**
     * 模板引擎设计
     *   1. 插值引擎（vue、react。。。）
     *   2. 引擎编译为AST
     *   3. AST编译为引擎
     */
    const { panels, currencyConfig } = this.code
    if (this.code._compile || !panels || !currencyConfig) return

    const result = {
      _compile: true,
      tag: 'div',
      children: [],
      attrs: {},
      className: ['code-wrap'],
      // componentName: '',
      style: {}
    }

    // 计算全局样式
    currencyConfig.AttributePanel.forEach(c => {
      result.style[c.key] = c.attrs.value
    })
    /**
     * 递归panel
     * 1. panel 无限层级
     * 2. panel 带有全局style
     */
    function countConfig (config) {
      // 遍历config 生成组件特有属性
      return {
        style: {}
      }
    }
    function transfrom (source, target) {
      if (source) {
        source.forEach(c => {
          const child = {
            _id: c._id,
            tag: !c.componentName || 'div',
            attrs: c._attrs,
            componentName: c.componentName, // 有可能是容器
            children: [],
            ...countConfig(c.config)
          }
          target.children.push(child)
          if (c.children) transfrom(c.children, child)
        })
      }
    }
    transfrom(this.code.panels, result)
    // return [result]
    return result
  }
  export (name) {
    let blob = this.codeReplace[this.type].replace(this._ast)
    let fileName = name || `${dayjs().format('YYYY-MM-DD HH:mm:ss')}.vue`
    // console.log('export', blob)
    FileSaver.saveAs(new Blob([blob], { type: 'text/plain;charset=utf-8' }), fileName)
  }
}

export default CodeGenerator
