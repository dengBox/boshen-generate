<template>
  <ul class="container-wrap panel-items" ref="container">
    <li
      :class="countClass(panel)"
      v-for="panel in panelList" :key="panel._id"
      @click.stop="emitActivePanel(panel)" >
      <component
        v-if="!panel.children"
        :is="panel.componentName"
        v-bind="panel._attrs" />
      <drop-container
        v-else
        :stack="stack"
        :panel="panel"
        :active-panel="activePanel"
        :common-data="commonData"
        :panel-list="panel.children" />
      <div class="empty tool-wrap" v-if="panel._id === activePanel._id" @click.stop>
        <div class="tool-btns">
          <Tooltip :content="btn.label" placement="bottom" v-for="btn in panelBtn" :key="btn.key">
            <Icon :type="btn.icon" @click="operation(btn.key, panel)" />
          </Tooltip>
        </div>
      </div>
      <div class="empty empty-wrap"></div>
    </li>
    <li class="empty-contet panel-items" v-if="panelList.length < 1">
      请拖入组件
      <div class="empty empty-wrap"></div>
    </li>
  </ul>
</template>

<script>
import { on, off } from '@/assets/js/dom.js'

/**
 * CenterPanel改为Layout即可实现组件容器多级嵌套
 * 1. 递归向上寻找组件名，组成dom树
 * 2. 每一个layout可嵌套多个平级组件、包括layout本身
 */

export default {
  name: 'DropContainer',
  props: {
    isPreview: Boolean,
    panel: Object,
    activePanel: Object,
    panelList: Array,
    stack: Array,
    commonData: {
      type: Object,
      default: () => {
        /**
         * 利于对象浅拷贝，所有后代组件初始化引用其数据
         * 1. 即达到修改之后，所有组件同步的效果。
         * 2. 同时绕开props单向数据流的规则
         */
        return {
          hoverStack: [] // 鼠标移入的panel栈
        }
      }
    }
  },
  data () {
    return {
      panelBtn: Object.freeze([
        {
          label: '复制',
          icon: 'icon-new',
          key: 'copy'
        },
        {
          label: '删除',
          icon: 'icon-delete',
          key: 'delete'
        }
      ]),
      hoverStack: this.commonData.hoverStack
    }
  },
  computed: {
    wrap () {
      return this.$refs.container
    }
  },
  watch: {
  },
  created () {
  },
  mounted () {
    // 开启事件监听
    if (!this.isPreview) {
      on(this.wrap, 'mouseenter', this.enterWrap)
      on(this.wrap, 'mouseleave', this.leaveWrap)
    }
  },
  destroyed () {
    // 关闭事件监听
    if (!this.isPreview) {
      off(this.wrap, 'mouseenter', this.enterWrap)
      off(this.wrap, 'mouseleave', this.leaveWrap)
    }
  },
  methods: {
    countClass (panel) {
      return [
        'panel-item',
        'panel-items',
        {
          'panel-item-active': panel._id === this.activePanel._id,
          'panel-item-empty': panel.children && panel.children.length < 1
        }]
    },
    emitEvent () {
      if (this.$parent.$options.name !== 'CenterPanel') {
        this.$parent.emitEvent(...arguments)
      } else {
        this.$emit(...arguments)
      }
    },
    enterWrap () {
      // console.log('enter-wrap', this.panel)
      this.emitEvent('on-add-stack', {
        el: this.$el,
        panel: this.panel
      })
    },
    leaveWrap () {
      // console.log('leave-wrap', this.panel)
      this.emitEvent('on-del-stack', this.panel._id)
    },
    emitActivePanel (panel) {
      if (panel._id === this.activePanel._id) return
      this.emitEvent('on-change-active', panel)
    },
    operation (type, panel) {
      /**
       * 删除 复制，应该在对应panel下，因为有层级的概念
       */
      switch (type) {
        case 'delete':
          this.emitEvent('on-delete-panel', panel)
          break
        case 'copy':
          this.emitEvent('on-copy-panel', panel) // id在父组件进行赋值
          break
      }
    }
  }
}
</script>

<style scoped lang="scss">
// .container-wrap {
//   position: relative;
//   z-index: 99;
// }
.panel-wrap {
  // width: 100%;
  // height: 100%;
  // overflow: auto;
  background: #fff;
  .panel-item {
    margin-bottom: 14px;
    position: relative;
    cursor: pointer;
    border: 1px solid transparent;
    .empty {
      width: 100%;
      z-index: 99;
      position: absolute;
      left: 0;
      top: 0;
      box-sizing: border-box;
    }
    .tool-wrap {
      z-index: 100;
      .tool-btns {
        position: absolute;
        display: flex;
        right: 0;
        top: -20px;
      }
    }
    .empty-wrap {
      display: none;
      height: 100%;
      background: rgba(51, 119, 255, .08);
      border: 1px dashed #397AFD;
    }
    // &:hover {
    //   border-color: transparent;x
    //   & > .empty-wrap {
    //     display: block;
    //   }
    // }
    &-active {
      border-color: #397AFD;
      .empty-wrap {
        cursor: default;
        display: none
      }
    }
    &-empty {
      .empty-contet {
        top: 0;
        left: 0;
        content: "请拖入组件";
        width: 100%;
        height: 100%;
        cursor: pointer;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
        background: #eee;
      }
    }
  }
}
</style>
