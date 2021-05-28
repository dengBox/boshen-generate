<template>
  <article class="left-panel">
    <div class="panel-list">
      <section v-for="item in menuList" :key="item.key" :class="['panel-item', {'panel-item-active': item.key === activePanel}]" @click="changePanel(item.key)">
        <Tooltip :content="item.menuLabel" placement="right">
          <Icon size="24" :type="item.icon" />
        </Tooltip>
      </section>
    </div>
    <component
    v-if="activePanel"
    :is="activePanel"
    :tree-data="outlineTree"
    @on-close-panel="closePanel"
    @on-drop-start="dropStart" />
  </article>
</template>

<script>

import DataSource from './components/DataSource'
import OutlineTree from './components/OutlineTree'
import ComponentList from './components/ComponentList'

export default {
  name: 'LeftPanel',
  components: {
    DataSource,
    OutlineTree,
    ComponentList
  },
  props: {
    outlineTree: Array
  },
  data () {
    return {
      activePanel: null,
      menuList: Object.freeze([
        {
          menuLabel: '大纲',
          icon: 'icon-xiangqing',
          key: 'OutlineTree'
        },
        {
          menuLabel: '组件',
          icon: 'icon-c-product',
          key: 'ComponentList'
        },
        {
          menuLabel: '数据',
          icon: 'icon-my-console',
          key: 'DataSource'
        }
      ])
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
    changePanel (key) {
      this.activePanel = key
    },
    closePanel (panel) {
      this.activePanel = null
    },
    dropStart (panel) {
      this.$emit('drop-start', panel)
    }
  }
}
</script>

<style scoped lang="scss">
.left-panel {
  height: 100%;
  background-color: #fff;
  display: flex;
  .panel-item {
    padding: 8px 10px;
    cursor: pointer;
    &-active {
      background-color: #0673FC;
      color: #fff;
    }
  }
  // .panel-list {}
}
</style>
