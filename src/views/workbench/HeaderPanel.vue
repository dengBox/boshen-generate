<template>
  <header class="header-panel">
    <div style="height: 44px; width: 44px; background: #ccc; margin-right: 14px"></div>
    <Breadcrumb :breadcrumb="routerList" class="sh-breadcrumb" />
    <div class="center-btns"></div>
    <ul class="right-btns">
      <!-- <li class="btn-wrap cursor">表单设置</li> -->
      <!-- <li class="btn-wrap cursor">页面设置</li> -->
      <li class="btn-wrap cursor">帮助</li>
      <li class="operation-wrap">
        <Tooltip :content="i.label" placement="bottom" v-for="i in operationList" :key="i.key" >
          <Icon :type="i.icon" @click="operation(i.key)" />
        </Tooltip>
      </li>
      <li>
        <Button style="margin-right: 10px;" @click="previewPanel">预览</Button>
        <Button type="primary" @click="savePanel">保存</Button>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'HeaderPanel',
  data () {
    return {
      routerList: [
        {
          path: '/workbench',
          name: '工作空间'
        },
        {
          path: '/workbench',
          name: '新建表单'
        }
      ],
      operationList: Object.freeze([
        {
          label: '撤销',
          icon: 'icon-left-bracket',
          key: 'revoke'
        },
        {
          label: '重做',
          icon: 'icon-right-bracket',
          key: 'redo'
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
    },
    savePanel () {
      this.$emit('on-save-panel')
    },
    previewPanel () {
      this.$emit('on-preview-panel')
    }
  }
}
</script>

<style scoped lang="scss">
.header-panel {
  height: 45px;
  background: #fff;
  margin-bottom: 1px;
  display: flex;
  align-items: center;
  ::v-deep .sh-breadcrumb {
    width: auto;
  }
  .center-btns {
    flex: 1;
  }
  .right-btns {
    width: 400px;
    display: flex;
    align-items: center;
    .btn-wrap {
      margin-right: 14px;
    }
    .cursor {
      cursor: pointer;
    }
    .operation-wrap {
      display: flex;
      cursor: pointer;
      .iconfont {
        margin: 0 10px;
      }
    }
  }
}
</style>
