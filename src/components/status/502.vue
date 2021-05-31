<template>
  <div class="status-wrap">
    <img src="../../assets/images/lostConnection.png" alt="图片加载失败">
    <p class="inner-text">咦，网络怎么无法连接</p>
    <!-- <div>
      <Button type="primary" @click="goBack">返回上一步</Button>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'LostConnection',
  methods: {
    // goBack () {
    //   this.$router.go(-1)
    // }
  }
}
</script>
