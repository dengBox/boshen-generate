<template>
  <ul class="attribute-wrap">
    <li v-for="(item, i) in config" :key="item.key" class="attr-item">
      <div class="left-title">{{item.label}}</div>
      <div class="right-inner">
        <!-- select需要特殊处理 -->
        <component :is="item.type" v-bind="item.attrs" @on-change="value => changeValue(i, item.key, value)" />
      </div>
    </li>
  </ul>
</template>

<script>

import TableConfig from '@/components/config/TableConfig'
import SelectConfig from '@/components/config/SelectConfig'
import SearchHeaderConfig from '@/components/config/SearchHeaderConfig'

export default {
  name: 'AttributePanel',
  props: {
    config: Array
  },
  components: {
    TableConfig,
    SelectConfig,
    SearchHeaderConfig
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
    changeValue (index, key, value) {
      this.$emit('on-change', {
        key,
        index,
        value: value.target ? value.target.value : value,
        panel: this.$options.name || ''
      })
    }
  }
}
</script>

<style scoped lang="scss">
.attribute-wrap {
  padding: 10px;
  .attr-item {
    display: flex;
    margin-bottom: 10px;
    // align-items: center;
    .left-title {
      width: 100px;
    }
  }
}
</style>
