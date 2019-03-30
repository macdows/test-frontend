import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { sumBy } from 'lodash'

Vue.use(Vuex)

const vuexPersist = new VuexPersistence({
  storage: window.localStorage,
})

export default new Vuex.Store({
  state: {
    cart: []
  },
  getters: {
    itemCount: state => state.cart.length,
    cart: state => state.cart,
    total: state => sumBy(state.cart, o => o.price),
  },
  actions: {
    addToCart ({ commit }, item) {
      commit('addItemToCart', item)
    },
    removeFromCart ({ commit }, index) {
      commit('removeItemFromCart', index)
    },
    emptyCart ({ commit }) {
      commit('emptyCart')
    }
  },
  mutations: {
    addItemToCart (state, item) {
      state.cart.push(item)
    },
    removeItemFromCart (state, index) {
      state.cart.splice(index, 1)
    },
    emptyCart (state) {
      state.cart = []
    }
  },
  plugins: [vuexPersist.plugin],
})
