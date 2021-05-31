<template>
  <Form class="container-wrap" v-bind="panel._attrs" @mouseenter.native="enterWrap" @mouseleave="leaveWrap">
    <form-item
      :class="countClass(item)"
      v-for="(item, i) in panelList" :key="i"
      :label="item._attrs.label"
      :prop="item._attrs.prop"
      @click.native.stop="emitActivePanel(item)" >
        <component :is="item.children[0].componentName" v-bind="item._attrs" />
        <drop-tool v-if="item._id === activePanel._id" :panel="item" @on-operation="emitEvent" />
    </form-item>
    <div class="empty-contet min-content" v-if="panelList.length < 1">
      请拖入表单组件
      <div class="empty empty-wrap"></div>
    </div>
  </Form>
</template>

<script>

import DropTool from '@/components/DropTool'
/**
 * 1. form-item下只能存在一个组件
 * 2. form下仅能包含form-item
 */
export default {
  name: 'FormContainer',
  props: {
    panel: Object,
    panelList: Array,
    activePanel: Object
  },
  components: {
    DropTool
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
      this.$parent.emitEvent(...arguments)
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
      if (this.preview || panel._id === this.activePanel._id) return
      this.emitEvent('on-change-active', panel)
    }
  }
}
</script>

<style scoped lang="less">

</style>
