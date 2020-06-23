import Vue from 'vue'
import Vuex from 'vuex'
// huwenbo
import NurserySetting from './modules/NurserySetting'
import UserLogin from './modules/UserLogin' // 登录页面
import FarewellPartyAdministration from './modules/FarewellPartyAdministration' // 告别会管理
import UnitManagement from './modules/UnitManagement' // 单位管理

Vue.use(Vuex)
const state = {
  loading: false
}

// 全局loading
const mutations = {
  SETLOADING(state, payload) {
    // 变更状态
    state.loading = payload
  }
}

const store = new Vuex.Store({
  modules: {
    // huwenbo
    NurserySetting,
    UserLogin,
    FarewellPartyAdministration,
    UnitManagement

  },
  state,
  mutations
})

export default store
