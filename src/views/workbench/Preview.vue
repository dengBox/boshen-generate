<template>
  <div class="preview">
    <header class="preview-header"><Button @click="exportCode">导出源码</Button></header>
    <drop-container
      preview
      class="panel-wrap"
      :panel="{_id: -1}"
      :activePanel="{}"
      :panel-list="config.panels" />
  </div>
</template>

<script>
import { read } from '@/storage'
import CodeGenerator from '@/assets/js/exportCode/index'
import DropContainer from '@/components/DropContainer'
const userConfig = JSON.parse(read('userConfig'))
const generator = new CodeGenerator({
  exportType: 'vue',
  sourceCode: userConfig || {}
})

export default {
  name: 'Preview',
  components: {
    DropContainer
  },
  data () {
    return {
      config: {}
    }
  },
  computed: {
    wrapStyle () {
      const result = {}
      this.config.currencyConfig.AttributePanel.forEach(c => {
        result[c.key] = c.attrs.value
      })
      return result
    }
  },
  watch: {

  },
  created () {
    this.config = userConfig || {
      panels: [],
      currencyConfig: {}
    }
  },
  mounted () {

  },
  methods: {
    exportCode () {
      // alert('导出成功')
      generator.export()
    }
  }
}
</script>

<style scoped lang="scss">
.preview {
  padding: 14px;
}
</style>
