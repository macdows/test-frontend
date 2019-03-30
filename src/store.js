import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { remove } from 'lodash'

Vue.use(Vuex)

const vuexPersist = new VuexPersistence({
  storage: window.localStorage,
})

export default new Vuex.Store({
  state: {
    cart: []
  },
  actions: {
    addToCart ({ commit }, item) {
      commit('addItemToCart', item)
    },
    removeFromCart ({ commit }, itemId) {
      commit('removeItemFromCart', itemId)
    },
    emptyCart ({ commit }) {
      commit('emptyCart')
    }
  },
  mutations: {
    addItemToCart (state, item) {
      state.cart.push(item)
    },
    removeItemFromCart (state, itemId) {
      remove(state.cart, o => o.id === itemId)
    },
    emptyCart (state) {
      state.cart = []
    }
  },
  plugins: [vuexPersist.plugin],
})
