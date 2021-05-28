import * as loginApi from '@/http/login'

export default {
  // namespaced: true,
  state: {
    // panelList: []
  },
  getters: {
    // user (state) {
    //   return state.userInfor.token
    // }
  },
  actions: {
    // 调用接口，存储store(根据业务决定是否存储store)
    reportDelete ({ commit }, payload) {
      return loginApi.reportDelete(payload)
    }
  },
  mutations: {
    // 此处拿到接口返回值，进行处理保存store
    // SET_PANEL_LIST (state, payload) {
    //   state.panelList = payload
    // }
  }

}
