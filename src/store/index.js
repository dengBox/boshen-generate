import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 自动导入model 文件夹下的所有js文件
const importSubModules = () => {
  const modelList = require.context('./model', true, /\.js$/)
  let subModels = {}
  modelList.keys().forEach(k => {
    let key = k.match(/^\.\/(.*)\.js$/)[1]
    subModels[key] = modelList(k).default
  })
  return subModels
}

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    ...importSubModules()
  }
})
