import untils from '@/assets/js/until'

export default class Tree {
  constructor (treeData = []) {
    if (untils.typeOf(treeData) !== 'array') throw new Error('treeData 必须为 Array类型')
    this.init(treeData)
  }
  init (data) {
    this.treeData = data
  }
  get (node) {}

  push (node, targetNode) {
    /**
     * node 需要增加的node
     * targetNode 增加到哪里
     */
  }

  remove (node) {}

  merge () {}
}
