<template>
  <div style="padding=20px" class="code-wrap">
    <Input
      :title="inputTitle_1"
      :placeholder="inputPlaceholder_1"
      :disabled="inputDisabled_1"
    >
    </Input>
    <Table
      :loading="tableLoading_1"
      :columns="tableColumns_1"
      :data="tableData_1"
    >
    </Table>
    <Page
      :total="pageTotal_1"
      :current="pageCurrent_1"
      :prevText="pagePrevText_1"
      :nextText="pageNextText_1"
    >
    </Page>
  </div>
</template>

<script>
export default {
  name: 'exportCode',
  data () {
    return {
      inputTitle_1: '输入框',
      inputPlaceholder_1: '请输入文字',
      inputDisabled_1: false,
      tableLoading_1: false,
      tableColumns_1: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          fixed: 'left',
          align: 'center',
          __id: 'Futkd5'
        },
        { type: 'selection', width: 60, align: 'center', __id: 'E2UQJD' },
        { title: '姓名', align: 'center', key: 'name', __id: 'XGS1T0' },
        { title: '年龄', align: 'center', key: 'age', __id: 'lXHsMk' },
        { title: '电话', align: 'center', key: 'telephone', __id: '4XZF2r' },
        { title: '邮箱', align: 'center', key: 'email', __id: 'EgoYQ2' },
        {
          title: '家庭住址',
          align: 'center',
          key: 'address',
          fixed: 'right',
          width: 200,
          __id: 'uPjSr4'
        }
      ],
      tableData_1: [
        {
          name: '张三',
          age: '18',
          telephone: '13201530000',
          email: '1716775221@qq.com',
          address: '陕西省西安市XXXX'
        },
        {
          name: '李四',
          age: '18',
          telephone: '13201530000',
          email: '1716775221@qq.com',
          address: '陕西省西安市XXXX'
        },
        {
          name: '王五',
          age: '18',
          telephone: '13201530000',
          email: '1716775221@qq.com',
          address: '陕西省西安市XXXX'
        },
        {
          name: '赵六',
          age: '18',
          telephone: '13201530000',
          email: '1716775221@qq.com',
          address: '陕西省西安市XXXX'
        }
      ],
      pageTotal_1: 0,
      pageCurrent_1: 1,
      pagePrevText_1: '上一页',
      pageNextText_1: '下一页'
    }
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

  <style scoped lang="less">
</style>
