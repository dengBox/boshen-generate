<template>
  <div class="table--config-wrap">

  </div>
</template>

<script>
/**
 * 配置combination-table组件
 * 1. columns配置（CRUD）
 *    a: title // 列名称
 *    b: key   // 回显字段key值
 *    c: tooltip  // 超出部分tips提示
 *    d: width // column宽度
 *    e: fixed // 左固定、右固定
 *    f: type    // [index, selection, expand]
 *    g: align   // 对齐方式，
 *    h: className // 列名
 * 2. table配置
 *    1. data
 *    2. column
 *    3. stripe
 *    4. width
 *    5. height
 *    6. loading
 *    7. row-class-name
 */
export default {
  name: 'CombinationTableConfig',
  props: {
    value: Object
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
    emitChange () {
      this.$emit('on-change')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
