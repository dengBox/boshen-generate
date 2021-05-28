<template>
  <Select class="select-config" :value="value">
    <Option v-for="item in data" :key="item.value" :label="item.label" :value="item.value" />
  </Select>
</template>

<script>
/**
 * 因为select需要内置渲染模板，所以抽离一层组件
 */

// import { Select } from 'shsc-ui'

export default {
  name: 'SelectConfig',
  // extends: Select,
  props: {
    data: Array,
    value: [String]
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

  }
}
</script>

<style scoped lang="less">

</style>
