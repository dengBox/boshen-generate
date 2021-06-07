
## 基本需求
  **对基本需求组件整理**
1. `Table`（表格）  
    固定表头  
    固定列  
    自定义渲染单元格  
      a: slot  
      b: render  
      c: type [index, selection, html, text]  
    展开  
    筛选  
    排序  
    超出省略  
2. `Form`（表单）  
   校验  
   嵌套  
      a: Input  
      b: Select  
      c: Upload  
      e: Radio
      f: Checkbox
      g: InputNumber
      h: DatePicker
      i: TimePicker
3. `Button`（按钮）
4. `Page`（分页）
5. `Tabs`（标签页）
6. `Tooltip`（提示）
7. `Menu`（菜单）
8. `Model`（弹出框）
## 高阶需求

## 公共业务

1. 点击复制
2. 导入
3. 导出
4. 查询头部
5. 表格展示

## mixins

1. 接口
    a: getSomething
    b: delSomething
2. 联动
    a: 点击** 触发**
    b: ... 

## issues

1. 通过schema进行转换（适配器）
    a: 组件解析
    b: 属性解析与绑定
    c: 事件绑定
    d: 组件联动
2. ...