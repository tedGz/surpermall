import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: [],
  },
  getters: {
    getLength: (state) => {
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    }
  },
  actions: {
    addCart(context, playload) {
      return new Promise((resolve,reject) => {
        let oldProduct = context.state.cartList.find(item => item.iid === playload.iid)

      if(oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('添加数量成功')
      } else {
        playload.count = 1
        context.commit('addTo', playload)
        resolve('添加商品成功')
      }
      })
    }
  },
  mutations: {
    addCounter(state, playload) {
      playload.count++
    },
    addTo(state, playload) {
      playload.checked = true
      state.cartList.push(playload)
    }
  }
})

export default store