<template>
  <div class="center-panel" @mouseenter="enterWrap" @mouseleave="leaveWrap">
    <drop-container
      ref="wrap"
      class="panel-wrap"
      :stack="stack"
      :style="wrapStyle"
      :panel="{_id: -1}"
      :active-panel="activePanel"
      :panel-list="panelList"
      :drop-panel="dropPanel"
      @on-add-stack="addStack"
      @on-del-stack="delStack"
      @on-delete-panel="delPanel"
      @on-copy-panel="copyPanel"
      @on-change-active="emitActivePanel" />
  </div>
</template>

<script>
import { on, off } from '@/assets/js/dom.js'
import DropContainer from '@/components/DropContainer'
import componentConfig from '@/views/workbench/config/component-config.json'
import { deepChange, deepDomHandle } from './untils'
/**
 * 1. 递归向上寻找组件名，组成dom树
 * 2. 每一个layout可嵌套多个平级组件
 */
let panelId = new Date().getTime()
export default {
  name: 'CenterPanel',
  props: {
    dropPanel: Object,
    activePanel: Object,
    panelList: Array,
    wrapStyle: Object
  },
  components: {
    DropContainer
  },
  data () {
    return {
      stack: [], // -1表示为画布容器，其余则为各个容器panel的id
      lastActiveChild: null,
      dropIndex: null
    }
  },
  computed: {
    wrap () {
      return this.$refs.wrap
    }
  },
  watch: {
    dropPanel (panel) {
      if (panel) {
        // 开启事件监听
        on(document, 'mouseup', this.dropEnd)
      } else {
        // 关闭事件监听
        off(document, 'mouseup', this.dropEnd)
      }
    }
  },
  created () {
    this.dropMove = this.$untils.throttle(this.dropMove, 50)
  },
  mounted () {
  },
  destroyed () {},
  methods: {
    addStack (panel) {
      this.stack.unshift(panel)
    },
    delStack (id) {
      // 因为是按照层级触发，所以是有顺序的
      this.stack.shift()
    },
    delPanel (panel) {
      this.$emit('on-delete-panel', panel)
    },
    copyPanel (panel) {
      /**
       * 1. 自身以及所有后代_id自增一
       * 2. 向上抛出旧的ID以用来查找数据
       */
      const newPanel = this.$untils.deepCopy(panel)
      deepChange([newPanel], item => {
        item._id = ++panelId
      })
      this.$emit('on-copy-panel', { newPanel, id: panel._id })
    },
    enterWrap () {
      on(this.wrap.$el, 'mousemove', this.dropMove)
    },
    leaveWrap () {
      this.stack = []
      if (this.lastActiveChild) {
        this.lastActiveChild.style.display = 'none'
      }
      off(this.wrap.$el, 'mousemove', this.dropMove)
    },
    dropMove (event) {
      /**
       * 计算的复杂度为 1ms * n^n
       * 1. 计算过一次dom的位置属性之后，缓存当前stack下的所有子节点的属性
       * 2. 清除缓存
       *        a: 添加、复制
       *        b: 修改
       *        c: 删除
       *        d: config更改
       *        e: stack更新
       */
      const currentWrap = this.stack[0]
      if (!currentWrap) return
      if (this.dropPanel) {
        /**
         * 1.判断运动方向
         *   a. 上
         *   b. 下
         *   c. 左
         *   d. 右
         * 2. 寻找当前容器下，距离最近的4个组件、容器
         *   a: 上
         *   b: 下
         *   b: 左
         *   b: 右
         */
      } else {
        deepDomHandle([...currentWrap.el.children], event, currentWrap, activeNode => {
          if (!activeNode) {
            if (this.lastActiveChild) {
              this.lastActiveChild.style.display = 'none'
            }
          } else {
            if (this.lastActiveChild && this.lastActiveChild !== activeNode) {
              this.lastActiveChild.style.display = 'none'
            }
            activeNode.style.display = 'block'
            if (this.lastActiveChild !== activeNode) this.lastActiveChild = activeNode
          }
        })
      }
    },
    // 拖拽结束
    dropEnd (event) {
      /**
       * 1. 根据stack，判断是否添加组件
       * 2. 将添加的新组建设置为active状态，并通过父组件进行同步
       * 3. 拿到组件初始配置，进行配置更新，赋值给组件
       */
      this.$emit('on-drop-end')
      if (this.stack.length < 1) return
      const panel = this.dropPanel._id ? this.dropPanel : this.initPanel()
      this.$emit('on-add-panel', {
        target: this.stack[0].panel._id === -1 ? undefined : this.stack[0].panel,
        panel,
        index: this.dropIndex
      })
      this.emitActivePanel(panel)
    },
    initPanel () {
      /**
       * 1. 生成属性名
       * 2. 混入业务代码
       * 3. 如拖放的容器为form && 拖拽的panel为表单控件，需进行特殊处理
       */
      const config = componentConfig[this.dropPanel.componentName]
      const result = {
        _id: ++panelId, // id
        _attrs: {},
        componentName: this.dropPanel.componentName, // 组件类型
        config: this.$untils.deepCopy(config)
      }
      config.AttributePanel.forEach(c => {
        // 配置组件的value值
        result._attrs[c.key] = c.attrs.value
      })
      if (this.dropPanel.isContainer) {
        // 容器组件特有属性
        result.children = []
      }
      // console.log('initPanel', result)
      return result
    },
    emitActivePanel (panel) {
      if (panel._id === this.activePanel._id) return
      this.$emit('on-change-active', panel)
    }
  }
}
</script>

<style scoped lang="scss">
.panel-wrap {
  // width: 100%;
  // height: 100%;
  overflow: auto;
  background: #fff;
}
</style>
