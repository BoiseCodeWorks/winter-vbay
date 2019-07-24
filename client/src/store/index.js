import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import socketStore from './socketStore'

Vue.use(Vuex)
let _api = axios.create({
  baseURL: '//localhost:3000/api'
})


export default new Vuex.Store({
  modules: {
    socketStore
  },
  state: {
    products: []
  },
  mutations: {
    setProducts(state, data) {
      state.products = data;
    },
    updateProduct(state, data) {
      let index = state.products.findIndex(p => p._id == data._id)
      if (index == -1) {
        state.products.push(data)
      } else {
        state.products.splice(index, 1, data)
      }
    },
    deleteProduct(state, data) {
      let index = state.products.findIndex(p => p._id == data._id)
      if (index > -1) {
        state.products.splice(index, 1)
      }
    }
  },
  actions: {
    async getProducts({ commit }) {
      try {
        let res = await _api.get('products')
        commit('setProducts', res.data)
      }
      catch (e) {
        console.error(e.message)
      }
    },
    async add({ commit }, payload) {
      try {
        let res = await _api.post('products', payload)
        commit('updateProduct', res.data)
      }
      catch (e) {
        console.error(e.message)
      }
    },
    async bid({ commit }, payload) {
      let res = await _api.put('products/' + payload._id + '/bid', payload)
      commit('updateProduct', res.data)
    },
    async delete({ commit }, payload) {
      try {
        await _api.delete('products/' + payload._id)
        //commit('deleteProduct', payload)
      } catch (error) {

      }

    }

  }
})
