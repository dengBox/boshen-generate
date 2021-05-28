<template>
  <router-view />
  <!-- <Layout>
    <Content class="right-content">
      <router-view />
    </Content>
  </Layout> -->
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Common',
  data () {
    return {
    }
  },
  components: {
    // ShLeftMenu
  },
  computed: {
    ...mapState({
      // tabList: ({ tabList }) => tabList,
    })
  },
  watch: {
  },
  methods: {
    ...mapMutations(['']),
    ...mapActions(['']),
    loginOut () {}
  }
}
</script>
<style scoped lang="scss">
::v-deep .left-nav {
  height: 100%;
  flex: none;
}

.right-content {
  display: flex;
  overflow: hidden;
  flex-direction: column;
}
</style>
