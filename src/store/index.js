import { createStore } from 'vuex'
import cookies from 'js-cookie'
import axios from 'axios'

export default createStore({
  state: {
    user: {},
    userToken: '',
    isLoggedIn: false,
    loading: false,
    cartQnt: 0
  },
  mutations: {
    USER_SET(state, user) {
      state.loading = false
      state.user = user
      delete state.user.password
      state.isLoggedIn = true
    },
    USER_LOGOUT(state) {
      state.user = {}
      state.userToken = ''
      state.isLoggedIn = false
    },
    LOADING(state, value) {
      state.loading = value
    },
    CHANGE_CART_QNT(state, payload) {
      state.cartQnt = payload
    }
  },
  actions: {
    getUserLogged({commit}) {
      if(cookies.get('tokenE-Commerce')) {
        let token = cookies.get('tokenE-Commerce')
        let id = cookies.get('idE-Commerce')
        commit('LOADING', true)
        if(token != '') {
          axios.get(`users/${id}`)
          .then(res=> {
              commit('USER_SET', res.data)
          })
          .catch((e)=>{
            console.log(e)
        })
        }
      }
    },
    upgradeCartQnt({commit}){
      const localCart = JSON.parse(localStorage.getItem('cart'))
      commit('CHANGE_CART_QNT', localCart.length)
    }

  },
  modules: {
  },
  getters: {
    user(state) {
      return state.user
    }
  }
})
