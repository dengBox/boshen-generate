<template>
  <div class="empty tool-wrap">
    <div class="tool-btns">
      <Tooltip :content="btn.label" placement="bottom" v-for="btn in panelBtn" :key="btn.key">
        <Icon :type="btn.icon" @click.stop="operation(btn.key)" />
      </Tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropTool',
  props: {
    panel: Object
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
    operation (type) {
      /**
       * 删除 复制，应该在对应panel下，因为有层级的概念
       */
      switch (type) {
        case 'delete':
          this.$emit('on-operation', 'on-delete-panel', this.panel)
          break
        case 'copy':
          this.$emit('on-operation', 'on-copy-panel', this.panel)
          break
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
