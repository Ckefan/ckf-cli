import Vue from 'vue'
import Vuex from 'vuex'

// modules
import Index from './module/index'
import Router from './module/router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Index,
    Router
  },
})
