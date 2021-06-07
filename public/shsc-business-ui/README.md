#  快速上手

1. 切换源为公司源  
```html
  npm install nrm -g                      全局安装nrm
  nrm add shsc http://***.npm.taobao.org/ 绑定名称为shsc的http://***.npm.taobao.org/服务器源
  nrm del name 删除name源
  nrm use name 切换当前源为name
  nrm current 查看当前使用的源
  nrm ls 查看已经记录的nrm源列表，方便切换
  nrm test name 测试name源
```

2. 安装业务组件库
```npm install shsc-business-ui shsc-ui -s -d```
## 全局安装

```js
import Vue from 'vue'
import entry from './App.vue'

import business_shui from 'shsc-business-ui'
// 引入组件库样式
import 'shsc-business-ui/lib/index.css'
Vue.use(business_shui)
new Vue({render: h => h(entry)}).$mount('#app')
```
## 局部安装

1. 安装```babel-plugin-import```插件
```json
{
  'plugins': [
    [
      'import',
      {
        'libraryName': 'sh-ui',
        'style': true // 样式是否也按需加载
      }
    ]
  ]
}
```
2. 引入组件
```js
import Vue from 'vue'
import entry from './App.vue'
// 按需引入需要的组件
import { SearchHeader } from 'shsc-business-ui'

// 按需引入基本组件库
import { Icon, Page, Input, Select } from 'shsc-ui'

Vue.use(Icon)
Vue.use(Page)
Vue.use(Input)
Vue.use(Select)

Vue.use(SearchHeader)

new Vue({render: h => h(entry)}).$mount('#app')
```