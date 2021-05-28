## 文件描述

***component***
1. description
   左侧可拖拽的组件列表
2. type
   Array
3. example
```javascipt
const panelList = [
  {
    "title": "普通组件", // 分类名称
    "key": "ordinary", // 唯一key
    "isReal": false, // 是否为真实的组件
    "children": [ // 包含的组件数组
      {
        "title": "基础表格", // 组件title
        "componentName": "Table", // 组件名称
        "icon": "", // 组件缩略图
        "smallIcon": "" // 大纲树所展示的图标
      },
      ...
    ]
  },
  ...
]
```

***component-config***
1. description
   右侧组件对应配置项
2. type
   Object
3. example
```javascipt
const config = {
  "Input": {
    "AttributePanel": [ // 属性面板
      {
        "label": "标题", // 该属性的label名称
        "key": "title", // 绑定在组件时的key
        "type": "Input", // 该属性用什么组件去呈现
        "attrs": { // 传入该组件的属性集合
          "value": "输入框" // 初始化的值(必须包含)
        }
      },
      ...
    ],
    "StylePanel": [ // 样式面板
    ],
    "SeniorPanel": [ // 高级面板
    ]
  },
  ...
}
```
