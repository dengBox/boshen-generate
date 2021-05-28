import * as workbenchApi from '@/http/workbench'

export default {
  state: {
    // panelList: []
  },
  getters: {
    // user (state) {
    //   return state.userInfor.token
    // }
  },
  actions: {
    savePanels ({ commit }, payload) {
      return workbenchApi.savePanels(payload)
    }
  },
  mutations: {
    // SET_PANEL_LIST (state, payload) {
    //   state.panelList = payload
    // }
  }

}
