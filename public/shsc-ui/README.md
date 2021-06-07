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

2. 安装ui库
```npm install shsc-ui -s -d```
## 全局安装

```js
import Vue from 'vue'
import entry from './App.vue'

import shscui from 'shsc-ui'
// 引入组件库样式
import 'shsc-ui/lib/index.css'
// 默认语言为中文
import en from 'shsc-ui/dist/locale/en'
Vue.use(shscUI, {
  size: 'middle', // 默认为large
  locale: en      // 默认为zh-cn
})

/**
 * 生成响应式属性size，不需要响应式修改组件尺寸，不必注入到Vue中
 * 可根据页面尺寸自行修改属性（所有组件共享）:
 * small :   max-width:   1280
 * middle:   width:1680 - 1281
 * large :   min-width:   1681
 * /
const shui = new shscUI.init({
  size: 'middle'
})
new Vue({
  shui,
  render: h => h(entry)
}).$mount('#app')
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
// 按需引入需要的组件 && 语言组件
import { locale, Input, ... } from 'shsc-ui'
import lang from 'shsc-ui/dist/locale/en'

// locale不需要use，如果使用vue-i18n则不需引入locale组件，请看language.md
Vue.use(Input)
locale(lang)
```
### 

babel-plugin-import会将多单词文件命名改为中划线连接如：inputNumber --> input-number,故组件库按需引用时，需要更新文件路径  
1. babel.config.js
```javascript
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'shsc-ui',
      style: true,
      customName: require('path').resolve(__dirname, './customName.js')
    }]
  ]
}
```
2. customName
```javascript
module.exports = function customName (name) {
  switch (name) {
    case 'input-number':
      name = 'inputNumber'
      break
    case 'cascader-easy':
      name = 'cascaderEasy'
      break
    case 'date-picker':
      name = 'datePicker'
      break
    case 'time-picker':
      name = 'timePicker'
      break
  }
  return `shsc-ui/lib/${name}`
}
```

## 备注
1. 打包出现内存泄漏 `setx  /M  NODE_OPTIONS --max_old_space_size=4096`