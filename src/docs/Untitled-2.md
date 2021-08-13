
## schema

1. 描述组件信息
    a: 属性
    b: 事件
       基于用户行为抽象出常用的几种事件类型，进行mixins注入
       ajax
       reset
       drawer
       link
       url
       ...
    c: 样式
2. 描述接口信息
    a: 请求地址
    b: 请求方式
    c: 请求参数
3. 三方资源注入
    a: sdk
    b: npm包
4. 高度封装固定业务场景，比如分页修改之后，刷新列表
    a: 行为 -- 接口 -- 数据 -- 组件
    b: 利用数据将组件关联，即可达到联动效果
    c: 数据高度抽象（data/methods）
       （1）disabled -- 禁用
       （2）getApi   -- 获取请求

## 接入方式

1. sdk注入 + schema
2. ...
## 边界

1. 沙箱
2. 资源
3. 调试

