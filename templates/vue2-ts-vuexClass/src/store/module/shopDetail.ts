import { ShopDetailState } from '@/types/views/shopDetail.interface'
import { GetterTree, MutationTree, ActionTree } from 'vuex'
import * as ShopDetailApi from '@/api/shopDetail'

const state: ShopDetailState = {
  shopDetail: {
    author: undefined
  }
}

// 强制使用getter获取state
const getters: GetterTree<ShopDetailState, any> = {
  author: (state: ShopDetailState) => state.shopDetail.author
}

// 更改state
const mutations: MutationTree<ShopDetailState> = {
  // 更新state都用该方法
  UPDATE_STATE(state: ShopDetailState, data: ShopDetailState) {
    for (const key in data) {
      if (!data.hasOwnProperty(key)) { return }
      state[key] = data[key]
    }
  }
}

const actions: ActionTree<ShopDetailState, any> = {
  UPDATE_STATE_ASYN({ commit, state: ShopDetailState }, data: ShopDetailState) {
    commit('UPDATE_STATE', data)
  },
  // GET_DATA_ASYN({ commit, state: LoginState }) {
  //   ShopDetail.getData()
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}

