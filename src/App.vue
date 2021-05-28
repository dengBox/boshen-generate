<template>
  <div id="app">
    <router-view />
    <!-- 预加载状态图片 -->
    <!-- <img src="./assets/images/lostConnection.png" alt="加载失败" class="hidden-img">
    <img src="./assets/images/noPrivileges.png" alt="加载失败" class="hidden-img">
    <img src="./assets/images/notFound.png" alt="加载失败" class="hidden-img"> -->
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
    })
  },
  mounted () {
    // console.log('local', this.$i18n.locale)
  },
  methods: {
    ...mapMutations([''])
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  width: 100%;
  .hidden-img {
    display: none;
    width: 0;
    height: 0;
  }
}
#nprogress {
  .bar {
    background: red !important;
  }
}
</style>
