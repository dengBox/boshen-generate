<template>
  <div class="outline-tree">
    <header>
      <h3 class="first-title">
        大纲树
        <Icon type="icon-close" @click="closePanel" />
      </h3>
    </header>
    <business-tree :tree-data="treeData" @on-selected-change="clickNode">
      <template #node="node">
        <Icon color="#9BA3AE" :type="node.icon" />
        {{node.name}}
      </template>
    </business-tree>
  </div>
</template>

<script>
export default {
  name: 'OutlineTree',
  props: {
    treeData: Array
  },
  data () {
    return {

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
      this.$emit('on-close-panel', 'OutlineTree')
    },
    clickNode (node) {
      this.$emit('on-change-active-node', node._id)
    }
  }
}
</script>

<style scoped lang="scss">
.outline-tree {
  width: 260px;
  border-left: 1px solid #eee;
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
  ::v-deep .tree-item .item-content {
    display: inline-flex;
    align-items: center;
    color: #354052;
    padding-left: 0;
    .iconfont {
      margin-right: 4px;
    }
  }
}
</style>
