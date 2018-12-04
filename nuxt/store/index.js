import Vue from 'vue'
import Vuex from 'vuex'
import city from './moudels/city'
import navbar from './moudels/navber'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    modules: {
      city,
      navbar
    },
    actions: {
      // nuxtServerInit({ commit }, { req }) {
      //   if (req.session.user) {
      //     commit('city', req.session.user)
      //   }
      // }
    }
  })

export default store
