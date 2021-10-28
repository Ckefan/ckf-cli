import { IndexState } from '@/types/views/index.interface'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import {
  getLocalStorage, objClone,
  removeLocalStorage,
  setLocalStorage,
} from '@/utils/common'
import * as IndexApi from '@/api/index'

/** 
 * 从localstorge 拿存储的数据
 */
const memberStr = getLocalStorage('memberList') || ''
let memberList = []
if (memberStr) {
  memberList = JSON.parse(memberStr)
}


/** 
 * 从localstorge 拿存储的数据
 */
const initData = {
  showShare: true,
}

const s: IndexState = {
  index: {
  },
}

// 强制使用getter获取state
const getters: GetterTree<IndexState, any> = {
  
}


// 更改state
const mutations: MutationTree<IndexState> = {
  // 更新state都用该方法
  UPDATE_INDEX_STATE(state: IndexState, data: IndexState) {
    for (const key in data) {
      if (!data.hasOwnProperty(key)) { return }
      state[key] = data[key]
    }
  },
  RESET_LOADING(state: IndexState) {
    for (const key in state.indexList) {
      state.indexList[key].loading = false
      state.indexList[key].fetching = false
    }
  },
}

const actions: ActionTree<IndexState, any> = {
  UPDATE_INDEX_STATE_ASYNC({ commit, state }, data: IndexState) {
    if (data) {
      commit('UPDATE_INDEX_STATE', data)
    } else {
      commit('UPDATE_INDEX_STATE', initData)
    }
  },

  // GET_RED_PACKET({ commit, state }, data: object) {
  //   return new Promise((resolve, reject) => {
  //     IndexApi.getRedPacket(data)
  //       .then((res: any) => {
  //         if (res && res.code === 10000) {
  //           const list = Array.isArray(res.data) ? res.data : Object.values(res.data);
  //           // commit('UPDATE_INDEX_STATE', { redPacket: list });
  //           // resolve(res)
  //           // setLocalStorage('redPacket', JSON.stringify(list))
  //         } else {
  //           reject(res)
  //         }
  //       })
  //       .catch(reject)
  //   })
  // },
}

export default {
  state: objClone(s),
  getters,
  mutations,
  actions
}