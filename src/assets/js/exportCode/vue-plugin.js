class CodeReplace {
  constructor (ast = {}) {
    this.init(ast)
  }
  init (ast) {
    this.ast = ast
    this.code = {
      data: {},
      methods: {}
    }
    this.variable = new Map()
  }

  setChild (child) {
    let str = ''
    if (child && child.length) {
      let i = 0
      while (i < child.length) {
        str += this.setTemplate(child[i]) + '\n'
        i++
        // console.log('setChild', setTemplate(child[i]))
      }
    }
    return str
  }

  setTemplate (ast) {
    if (ast) {
      /**
       * 1. 根据key 生成变量名
       *      a. 组件名 + 属性名 + index
       * 2. 变量名生成真正对象，塞入javascript
       *      a: data
       *      b: methods
       */
      let attrs = ''
      Object.keys(ast.attrs).forEach(k => {
        let v = this.variable.get(k)
        if (v) {
          const temp = v.split('_')
          v = `${temp[0]}_${Number(temp[1]) + 1}`
        } else {
          // v = `${ast.componentName}${k.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}_${0}`
          v = `${ast.componentName[0].toLowerCase()}${ast.componentName.slice(1)}${k[0].toUpperCase()}${k.slice(1)}_1`
        }
        this.variable.set(k, v)
        attrs += `:${k}="${v}" `
        this.code.data[v] = ast.attrs[k]
      })
      /**
       * 每个属性自带前置空格
       * 1. style
       * 2. attrs
       * 3. class
       * 4. event
       * 5. id
       */
      return `<${ast.componentName || ast.tag}${this.countStyle(ast.style)}${attrs.length < 1 ? '' : ' ' + attrs.slice(0, -1)}${!ast.className ? '' : ' class="' + ast.className + '"'}>
    ${this.setChild(ast.children)}
  </${ast.componentName || ast.tag}>`
    }
    return ''
  }

  setJavascript () {
    /**
     * 1. 根据规则生成带有语义化代码
     * 2. 用户自行输入代码
     */
    return `<script>
  
  export default {
    name: 'exportCode',
    data () {
      return ${Object.keys(this.code.data).length < 1 ? '{}' : JSON.stringify(this.code.data)}
    },
    computed: {
    },
    watch: {
  
    },
    methods: ${Object.keys(this.code.methods).length < 1 ? '{}' : JSON.stringify(this.code.methods)}
  }
  </script>`
  }

  setCss () {
    /**
     * 1. 根据规则生成带有语义化代码
     * 2. 用户自行输入代码
     */
    return `<style scoped lang="less">
  </style>`
  }

  countStyle (styleObj = {}) {
    let str = ''
    for (let k in styleObj) {
      str += `${k}=${styleObj[k]} `
    }
    return str.length < 1 ? '' : ` style="${str.slice(0, -1)}"`
  }

  replace (ast) {
    this.init(ast)
    return `<template>
    ${this.setTemplate(this.ast)}
  </template>
  
  ${this.setJavascript()}
  
  ${this.setCss()}`
  }
}

export default CodeReplace
