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
      lastActiveChild: null
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
    // this.dropMove = this.$untils.throttle(this.dropMove, 10)
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
      if (this.dropPanel || !currentWrap) return
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
          this.lastActiveChild = activeNode
        }
      })
      const result = [...currentWrap.el.children].find(child => {
        const position = child.getBoundingClientRect()
        /**
         * 1. 上下区间
         * 2. 左右区间
         */
        return event.clientY >= position.top && position.bottom >= event.clientY && event.clientX >= position.left && position.right >= event.clientX
      })
      if (result) {
        /**
         * 1. 获取最后一个子节点即是遮罩dom
         * 2. 因为遮罩的问题，所以获取到的容器不会更新，故需要递归去判断
         * 3. 计算之后，需要更新stack
         * 4. 更新之后，因为遮罩消失，即可正常更新，此时stack恢复正常
         */
        // console.log('parent', activeNode)
        let activeNode = result.lastChild
        if (this.lastActiveChild && this.lastActiveChild !== activeNode) {
          this.lastActiveChild.style.display = 'none'
        }
        activeNode.style.display = 'block'
        this.lastActiveChild = activeNode
      } else if (currentWrap.panel._id !== -1) {
        /**
         * 1. 获取父节点的最后一个子节点，即是遮罩dom
         */
        // console.log('child', activeNode)
        let activeNode = currentWrap.el.parentNode.lastChild
        if (this.lastActiveChild && this.lastActiveChild !== activeNode) {
          this.lastActiveChild.style.display = 'none'
        }
        activeNode.style.display = 'block'
        this.lastActiveChild = activeNode
      } else if (this.lastActiveChild) {
        this.lastActiveChild.style.display = 'none'
      }
    },
    // 拖拽结束
    dropEnd (event) {
      /**
       * 1. 根据stack，判断是否添加组件
       *    a: 拖放是否是容器
       *       （1）该容器是否支持该组件（form -formItem）
       *    b: 拖放的位置
       *        (1) top
       *        (2) right     *****
       *        (3) bottom
       *        (4) left      *****
       * 2. 将添加的新组建设置为active状态，并通过父组件进行同步
       * 3. 拿到组件初始配置，进行配置更新，赋值给组件
       */
      this.$emit('on-drop-end')
      if (this.stack.length < 1) return
      /**
       * 1. 拖入的组件可能会是容器
       * 2. 嵌套顺序
       * 3. 拖入的上下顺序
       */
      const panel = this.countPanelConfig()
      this.$emit('on-add-panel', {
        target: this.stack[0].panel._id === -1 ? undefined : this.stack[0].panel,
        panel
      })
      this.emitActivePanel(panel)
    },
    countPanelConfig () {
      // const container = ['Layout', 'Form']
      /**
       * 1. 生成属性名
       * 2. 混入业务代码
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
      // console.log('countPanelConfig', result)
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
