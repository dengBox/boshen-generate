<template>
  <ul class="right-config">
    <div class="tabs-wrap">
      <li v-for="p in attrList" :key="p.key" :class="['tab-title', {'tab-title-active': p.key === active}]" @click="changeActive(p.key)">
        {{p.label}}
      </li>
    </div>
    <component
      :is="active"
      :config="activeConfig[active] || []"
      @on-change="changeConfig" />
  </ul>
</template>

<script>
import StylePanel from './components/StylePanel'
import SeniorPanel from './components/SeniorPanel'
import AttributePanel from './components/AttributePanel'
import { deepFind } from './untils'

const panelMap = new Map([
  ['AttributePanel', { label: '属性', key: 'AttributePanel' }],
  ['StylePanel', { label: '样式', key: 'StylePanel' }],
  ['SeniorPanel', { label: '高级', key: 'SeniorPanel' }]
])

export default {
  name: 'RightConfig',
  components: {
    StylePanel,
    SeniorPanel,
    AttributePanel
  },
  props: {
    panelList: Array,
    activePanel: Object,
    currencyConfig: Object
  },
  data () {
    return {
      active: 'AttributePanel',
      attrList: [],
      activeConfig: {}
    }
  },
  computed: {

  },
  watch: {
    activePanel (panel) {
      this.countConfig(panel._id)
    }
  },
  created () {
    this.countConfig(-1)
  },
  mounted () {

  },
  methods: {
    changeActive (key) {
      this.active = key
    },
    countConfig (id) {
      let result = {}
      this.attrList = []
      if (id === -1 || !id) {
        result = this.currencyConfig
      } else {
        deepFind(this.panelList, id, (item) => {
          result = item.config || {}
        })
      }
      this.activeConfig = result
      Object.keys(this.activeConfig).forEach(k => {
        let item = panelMap.get(k)
        if (item) this.attrList.push(item)
      })
    },
    changeConfig ({ key, index, panel, value } = {}) {
      /**
       * 1. 子组件不对组件数据做任何变更
       * 2. 仅做逻辑处理，真正更新交给Index
       * 3. key应该是一个数组，链条去寻找。目前写死层级
       * 4. 全局config----
       * 5. 考虑裙带关系组件的场景
       */
      // const config = this.activeConfig[panel][index]
      // config.attrs.value = value
      this.$emit('on-change-config', { key, index, panel, value })
    }
  }
}
</script>

<style scoped lang="scss">
.right-config {
  height: 100%;
  width: 300px;
  background-color: #fff;
  .tabs-wrap {
    display: flex;
    border-bottom: 1px solid #eee;
  }
  .tab-title {
    flex: 1;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    &-active {
      color: #0673FC;
      border-bottom: 2px solid #0673FC;
    }
  }
}
</style>
