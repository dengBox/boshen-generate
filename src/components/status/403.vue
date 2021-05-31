<template>
  <div class="status-wrap">
    <img src="../../assets/images/noPrivileges.png" alt="图片加载失败">
    <p class="inner-text">暂时还没有权限查看哦</p>
    <!-- <div>
      <Button type="primary" @click="goBack">返回上一步</Button>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'NoPrivileges',
  methods: {
    // goBack () {
    //   this.$router.go(-1)
    // }
  }
}
</script>
