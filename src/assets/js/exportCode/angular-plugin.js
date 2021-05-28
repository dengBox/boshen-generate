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

  replace (ast) {
    this.init(ast)
    return ''
  }
}

export default CodeReplace
