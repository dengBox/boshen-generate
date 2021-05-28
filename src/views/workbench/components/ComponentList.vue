<template>
  <div class="component-list">
    <header>
      <h3 class="first-title">
        组件列表
        <Icon type="icon-close" @click="closePanel" />
      </h3>
    </header>
    <section v-for="c in componentList" :key="c.key" class="panel-wrap">
      <p class="second-title">{{c.title}}</p>
      <ul class="panel-list">
        <li v-for="i in c.children" :key="i.componentName" class="cmpt-item" @mousedown="handleDropStart($event, i)">
          <Icon :type="i.icon" />
          <p>{{i.title}}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>

import list from '../config/component.json'

/**
 * 根据拖入的组件是否可嵌套，动态禁用组件
 * 1. form
 *     child: Input、Select、InputNumber、Radio、Checkbox、ShSwitch、DatePicker、TimePicker、Cascader、CascaderEasy、Upload
 * 2. SearchHeader
 *    child: Input、Select、DatePicker、TimePicker、Cascader、CascaderEasy
 */

export default {
  name: 'ComponentList',
  data () {
    return {
      componentList: Object.freeze(list)
    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    closePanel () {
      this.$emit('on-close-panel', 'ComponentList')
    },
    handleDropStart (event, panel) {
      this.$emit('on-drop-start', panel)
    }
  }
}
</script>

<style scoped lang="scss">
.component-list {
  border-left: 1px solid #eee;
  width: 260px;
  .first-title {
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border-bottom: 2px solid #0673FC;
    .iconfont {
      cursor: pointer;
      float: right;
    }
  }
  .panel-wrap {
    padding: 10px;
    .second-title {
      padding-bottom: 4px;
      font-weight: 600;
    }
    .panel-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    .cmpt-item {
      user-select: none;
      cursor: pointer;
      width: 33.33%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px dashed #ddd;
      &:hover {
        border-color: #0673FC;
      }
    }
  }
}
</style>
