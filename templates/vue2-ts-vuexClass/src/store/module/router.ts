import { UserInfoState } from '@/types/stores/userInfo.interface'
import { MutationTree } from 'vuex'

const state = {
  direction: ''
}

const getters: any = {
  direction: (state: any) => state.direction,
}

const mutations: MutationTree<UserInfoState> = {
  updateDirection(state, payload) {
    state.direction = payload.direction
  }
}

export default {
  state,
  mutations,
  getters
}

