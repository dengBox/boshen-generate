<template>
  <ul class="search-header-config">
    <li v-for="(item, i) in searchList" :key="i">
      <span>列名</span><Input v-model="item.label" @on-change="emitChange" />
      <!-- <Icon type="icon-delete1" @click="delItem(i)" /> -->
    </li>
  </ul>
</template>

<script>
/**
 * 配置search-header组件
 * 1. 多个item配置(CRUD)
 *    a: label // label名称
 *    b: key   // 查询字段key值
 *    c: type  // 渲染的组件类型
 *    d: rules // 表单项校验
 *    e: props // 根据type动态改变（共有和独立）
 *    f: on    // 根据type动态改变（共有和独立）
 */
export default {
  name: 'TableConfig',
  props: {
    value: Array
  },
  data () {
    return {
      searchList: this.value
    }
  },
  computed: {

  },
  watch: {
    vaule: {
      deep: true,
      handler (arr) {
        this.searchList = arr
      }
    }
  },
  created () {
  },
  methods: {
    emitChange () {
      this.$emit('on-change', this.searchList)
      // console.log('emitChange', this.searchList)
    },
    delItem (index) {
      console.log('delItem', index)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
