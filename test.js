function deepCountData (arr, childKey = 'children') {
  console.time('init-Data')
  let stack = []
  arr.forEach(node => {
    console.log(node.id)
    if (node[childKey]) stack.push(...node[childKey])
  })
  if (stack.length > 0) deepCountData(stack, childKey)
  console.timeEnd('init-Data')
}

const treeData = [
  {
    name: '一级 1',
    id: 1,
    children: [
      {
        name: '二级 1-1',
        id: 2,
        children: []
      },
      {
        name: '二级 1-2',
        id: 8,
        children: []
      }
    ]
  },
  {
    name: '一级 2',
    id: 11,
    children: [
      {
        name: '二级 2-1',
        id: 12,
        children: []
      },
      {
        name: '二级 2-2',
        id: 15,
        children: []
      }
    ]
  }
]

deepCountData(treeData)
