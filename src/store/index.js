import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

// 生成实例对象
const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})

export default store