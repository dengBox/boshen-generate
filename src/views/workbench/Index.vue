<template>
  <div :class="['workbench-wrap', {'workbench-move': dropPanel}]">
    <HeaderPanel
     @on-save-panel="savePanel"
     @on-preview-panel="previewPanel" />
    <div class="workbench-content">
      <LeftPanel
        @drop-start="dropStart"
        :outline-tree="outlineTree"
        @on-change-active="changeActivePanel" />
      <CenterPanel
        ref="wrapEl"
        :wrap-style="centerWrapStyle"
        :drop-panel="dropPanel"
        :panel-list="panelList"
        :active-panel="activePanel"
        @on-drop-end="dropEnd"
        @on-add-panel="addPanel"
        @on-copy-panel="copyPanel"
        @on-delete-panel="delPanel"
        @on-change-tree="changeTree"
        @on-change-active="changeActivePanel"
        @click.native.stop="activePanel = {}" />
      <RightConfig
        :active-panel="activePanel"
        :panelList="panelList"
        :currency-config="currencyConfig"
        @on-change-config="changeConfig" />
    </div>
  </div>
</template>

<script>
import LeftPanel from './LeftPanel'
import CenterPanel from './CenterPanel'
import RightConfig from './RightConfig'
import HeaderPanel from './HeaderPanel'
import { save } from '@/storage'
import { on, off } from '@/assets/js/dom'
import Tree from './untils/tree'
import { deepFind } from './untils'

export default {
  name: 'Workbench',
  components: {
    LeftPanel,
    CenterPanel,
    RightConfig,
    HeaderPanel
  },
  data () {
    return {
      dropPanel: null,
      activePanel: {},
      panelList: [],
      centerWrapStyle: {},
      currencyConfig: {
        AttributePanel: [
          {
            label: '页面内间距',
            key: 'padding',
            type: 'Input',
            attrs: {
              value: '20px'
            }
          }
          // {
          //   label: '组件外间距',
          //   key: 'margin',
          //   type: 'Input',
          //   attrs: {
          //     value: '14px'
          //   }
          // }
        ]
      },
      outlineTree: new Tree([{
        name: '页面',
        _id: -1,
        icon: 'icon-new'
      }]).treeData
    }
  },
  computed: {
  },
  watch: {

  },
  created () {
    on(window, 'resize', this.countStyle)
  },
  beforeDestroy () {
    off(window, 'resize', this.countStyle)
  },
  mounted () {
    this.countStyle()
  },
  methods: {
    savePanel () {},
    previewPanel () {
      const userConfig = {
        panels: this.panelList,
        currencyConfig: this.currencyConfig
      }
      save('userConfig', JSON.stringify(userConfig))
      // let routeData = this.$router.resolve({
      //   path: '/workbench/preview'
      // })
      window.open(`${window.location.origin}${window.location.pathname}/#/workbench/preview`, '_blank')
    },
    // -----------drop panel------------
    dropStart (p) {
      this.dropPanel = p
    },
    dropEnd (event) {
      this.dropPanel = null
    },
    changeActivePanel (panel) {
      this.activePanel = panel
    },
    // -------- --panel change-----------
    addPanel ({ target, panel, index } = {}) {
      // target.splice(index, 0, target)
      target ? target.children.push(panel) : this.panelList.push(panel)
    },
    delPanel (panel) {
      /**
       * 1. 删除当前激活panel，则重置activePanel
       * 2. 在对应直接上进行删除
       */
      if (panel._id === this.activePanel) this.activePanel = {}
      let result = {}
      let index = -1
      deepFind(this.panelList, panel._id, (item, i, parent) => {
        result = parent.children || this.panelList
        index = i
      })
      result.splice(index, 1)
    },
    copyPanel ({ newPanel, id } = {}) {
      /**
       * 1. 找到panel的index
       * 2. 找到panel.的直接上级
       * 3. 在该位置下复制panel
       */
      let result = {}
      let index = -1
      deepFind(this.panelList, id, (item, i, parent) => {
        result = parent.children || this.panelList
        index = i
      })
      result.splice(index + 1, 0, newPanel)
      this.activePanel = newPanel
    },
    // --------config change-----------
    changeConfig ({ key, index, panel, value } = {}) {
      if (this.activePanel._id) {
        this.activePanel.config[panel][index].attrs.value = value
        if (panel === 'AttributePanel') {
          this.activePanel._attrs[key] = value
        }
      } else {
        this.currencyConfig[panel][index].attrs.value = value
        this.countStyle()
      }
    },
    countStyle () {
      if (this.centerWrapStyle.height) {
        this.$set(this.centerWrapStyle, 'height', '100%')
        this.$nextTick(() => {
          this.setStyle()
        })
      } else {
        this.setStyle()
      }
    },
    setStyle () {
      const result = {
        // width: this.$refs.wrapEl.offsetWidth + 'px',
        width: '100%',
        height: this.$refs.wrapEl.$el.offsetHeight + 'px'
      }
      this.currencyConfig.AttributePanel.forEach(c => {
        result[c.key] = c.attrs.value
      })
      this.centerWrapStyle = result
    },
    // 大纲树
    changeTree (changeType, source) {
      console.log('changeTree', this.outlineTree)
    }
  }
}
</script>

<style scoped lang="scss">
.workbench {
  &-wrap{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #F0F0F0;
    .center-panel {
      flex: 1;
      margin: 10px;
    }
  }
  &-content {
    width: 100%;
    height: 100%;
    display: flex;
  }
  &-move {
    cursor: move;
    .center-panel {
      border: 1px solid #0673FC;
    }
  }
}
</style>
