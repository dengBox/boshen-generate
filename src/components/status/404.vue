<template>
  <div class="status-wrap">
    <!-- <img src="../../assets/images/notFound.png" alt="图片加载失败"> -->
    <p class="inner-text">啊哦，页面找不到了</p>
    <div>
      <Button type="primary" @click="goBack">返回上一步</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
