## 文件描述

*component*
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

*component-config*
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
         "isParent": true, // 嵌套组件使用的属性，表示该属性是否为父级所用
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
## issues

*关于Form强关联的处理方案*

1. 生成代码时，类抽离，有强关联关系时，调用特殊函数生成代码
2. 拖拽界面进行控制，生成拖拽禁用规则
3. 属性栏生成时，根据代码生成规则，显示对应的属性栏
4. 带有强关联的属性变更时，应同步到该关联关系下的父级组件

*关于DropContainer的改造*

1. 根据拖入的组件，渲染为对应的组件。
2. `DropContainer`只负责处理拖入、拖出的需求
3. `DropContainer`抽离为虚拟类，不占有dom资源以及生成vue对象

*关于拖拽规则的生成*

1. Form仅能拖拽Form相关的控件
2. Form相关的控件，仅能存在于Form之下，不能独立存在


## 流程梳理

1. 拖拽 -- Input
      a: 拖放 -- Form
            (1): 生成 -- FormItem <-> Input
      b: 拖放 -- DropContainer
            (1): 生成 -- Input
2. 拖拽 -- Form
      a: 拖放 -- DropContainer
            (1): 生成 -- Form
3. 拖拽 -- DropContainer
      a: 拖放 -- DropContainer
            (1): 生成 -- DropContainer

## 实现DropContainer

1. DropContainer无限递归本身
2. DropContainer可渲染为组件
3. DropContainer仅处理容器栈

## 配置生成规则

1. 含有嵌套
      a: 虚拟节点继承子节点的config
      b: 父节点config引用子节点config（isParent进行区分）
      c: 生成特有属性，例如form-item: prop(唯一键，且Form需要收集所有子节点的主键)
2. 没有嵌套
      a: 生成真实节点、容器，config即自身

## 配置修改规则

1. 含有嵌套
      a: 修改自身 - 同步到父级
      b: 父级修改 - 同步到子级
2. 没有嵌套
      a: 自身维护自身

## 点击行为

1. 含有嵌套
      a: 点击虚拟节点不做任何处理，仅点击子节点生成左侧配置
      b: 点击自身，生成自身（根据子节点进行过滤）
2. 没有嵌套
      a: 生成自身配置

### 重构dom事件

1. 计算出active组件
2. 生成对应activeDom & hoverDom （全局仅有一个）