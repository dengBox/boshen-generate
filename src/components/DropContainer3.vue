<script>
import { on, off } from '@/assets/js/dom.js'
import FormContainer from '@/components/FormContainer'
import DropTool from '@/components/DropTool'

export default {
  name: 'DropContainer',
  props: {
    panel: Object,
    activePanel: Object,
    panelList: Array,
    stack: Array,
    preview: Boolean,
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
  components: {
    DropTool,
    FormContainer
  },
  data () {
    return {
      // hoverStack: this.commonData.hoverStack
    }
  },
  computed: {
    wrap () {
      return this.$refs.container.$el || this.$refs.container
    }
  },
  render () {
    return (
      <div class="container-wrap" ref="container">{this.renderInner()}</div>
      // this.panel.componentName
      //   ? <this.panel.componentName class="container-wrap min-content" ref="container">{this.renderInner()}</this.panel.componentName>
      //   : <div class="container-wrap min-content" ref="container">{this.renderInner()}</div>
    )
  },
  mounted () {
    if (this.preview) return
    // 开启事件监听
    on(this.wrap, 'mouseenter', this.enterWrap)
    on(this.wrap, 'mouseleave', this.leaveWrap)
  },
  destroyed () {
    if (this.preview) return
    // 关闭事件监听
    off(this.wrap, 'mouseenter', this.enterWrap)
    off(this.wrap, 'mouseleave', this.leaveWrap)
  },
  methods: {
    renderInner () {
      return this.panelList.length > 0
        ? this.panelList.map((p, i) => {
          return <div
            class={this.countClass(p)}
            vOn:mousedown_stop={() => this.movePanel(p, i)}
            vOn:click_stop={() => this.emitActivePanel(p)}>
            {
              p.componentName
                ? (
                  <p.componentName
                    panel={p}
                    active-panel={this.activePanel}
                    common-data={this.commonData}
                    preview={this.preview}
                    panel-list={p.children || []}
                    {...{ props: p._attrs }} />
                )
                : (
                  <drop-container
                    stack={this.stack}
                    panel={p}
                    preview={this.preview}
                    active-panel={this.activePanel}
                    common-data={this.commonData}
                    panel-list={p.children} />
                )
            }
            {
              p._id === this.activePanel._id &&
              <drop-tool panel={p} on-on-operation={this.emitEvent} />
            }
          </div>
        })
        : (
          <div class="empty-contet min-content">
              请拖入组件
            <div class="empty empty-wrap"></div>
          </div>
        )
    },
    countClass (panel) {
      return [
        'panel-item',
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
    movePanel (panel, index) {
      if (this.preview) return
      this.emitEvent('on-move-panel', { source: this.panel, panel, index })
    },
    emitActivePanel (panel) {
      // 如果是移动中，则不需要激活panel
      if (this.preview || panel._id === this.activePanel._id) return
      this.emitEvent('on-change-active', panel)
    }
  }
}
</script>

<style scoped lang="scss">
.panel-wrap {
  background: #fff;
  ::v-deep .panel-item {
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
        content: "";
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
