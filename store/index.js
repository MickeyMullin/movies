/*
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      expandAll: null,
    },
    mutations: {
      toggleAll(state) {
        state.expandAll = !state.expandAll
      },
    },
  })
}

export default createStore
*/
//  /*
export const state = () => ({
  expandAll: null,
})

export const mutations = {
  toggleAll(state, toggle) {
    state.expandAll = toggle
  },
}
//  */
