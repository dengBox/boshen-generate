<script>
import { on, off } from '@/assets/js/dom.js'

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
      return this.$refs.container.$el || this.$refs.container
    }
  },
  render () {
    return (
      this.panel.componentName
        ? <this.panel.componentName class="container-wrap panel-items" ref="container">{this.renderInner()}</this.panel.componentName>
        : <div class="container-wrap panel-items" ref="container">{this.renderInner()}</div>
    )
  },
  mounted () {
    // 开启事件监听
    on(this.wrap, 'mouseenter', this.enterWrap)
    on(this.wrap, 'mouseleave', this.leaveWrap)
  },
  destroyed () {
    // 关闭事件监听
    off(this.wrap, 'mouseenter', this.enterWrap)
    off(this.wrap, 'mouseleave', this.leaveWrap)
  },
  methods: {
    renderInner () {
      return this.panelList.length > 0
        ? this.panelList.map((p, i) => {
          // p.children && p.componentName 视为容器
          return <div
            class={this.countClass(p)}
            vOn:mousedown_stop={() => this.movePanel(p, i)}
            vOn:click_stop={() => this.emitActivePanel(p)}>
            {
              p.componentName
                ? <p.componentName
                  {...{ props: p._attrs }}
                  vOn:mouseenter_native_stop={event => { this.enterWrap(event, p) }}>
                  {
                    // 事件触发有问题
                    p.children && p.children.map(c => {
                      return c.children
                        ? <drop-container
                          stack={this.stack}
                          panel={c}
                          preview={this.preview}
                          active-panel={this.activePanel}
                          common-data={this.commonData}
                          panel-list={c.children} />
                        : <p.componentName
                          {...{ props: p._attrs }}
                          vOn:mouseenter_native_stop={event => { this.enterWrap(event, c) }} />
                    })
                  }
                </p.componentName>
                : <drop-container
                  stack={this.stack}
                  panel={p}
                  preview={this.preview}
                  active-panel={this.activePanel}
                  common-data={this.commonData}
                  panel-list={p.children} />
            }
            {
              p._id === this.activePanel._id &&
                <div class="empty tool-wrap" vOn:mousedown_stop={() => {}}>
                  <div class="tool-btns">
                    {
                      this.panelBtn.map(btn => {
                        return (
                          <Tooltip content={btn.label} placement="bottom">
                            <Icon type={btn.icon} vOn:click_native={() => { this.operation(btn.key, p) }} />
                          </Tooltip>
                        )
                      })
                    }
                  </div>
                </div>
            }
          </div>
        })
        : (
          <div class="empty-contet panel-items">
              请拖入组件
            <div class="empty empty-wrap"></div>
          </div>
        )
    },
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
    enterWrap (event, panel) {
      if (this.preview) return
      // console.log('enter-wrap', this.panel)
      this.emitEvent('on-add-stack', {
        el: event.target,
        panel: panel || this.panel
      })
    },
    leaveWrap () {
      if (this.preview) return
      // console.log('leave-wrap', this.panel)
      this.emitEvent('on-del-stack', this.panel._id)
    },
    movePanel (panel, index) {
      if (this.preview) return
      this.emitEvent('on-move-panel', { source: this.panel, panel, index })
    },
    emitActivePanel (panel) {
      if (this.preview || panel._id === this.activePanel._id) return
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
.panel-wrap {
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
