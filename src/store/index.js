import { createStore } from 'vuex'
import cookies from 'js-cookie'
import axios from 'axios'

export default createStore({
  state: {
    user: {},
    userToken: '',
    isLoggedIn: false,
    loading: false,
    Total: '1',
    cart: []
  },
  mutations: {
    setUser(state, user) {
      state.loading = false
      state.user = user
      delete state.user.password
      state.isLoggedIn = true
    },
    Loading(state, value) {
      state.loading = value
    },
    Logout(state) {
      state.user = {}
      state.userToken = ''
      state.isLoggedIn = false
    }
  },
  actions: {
    getUserLogged({commit}) {
      if(cookies.get('tokenE-Commerce')) {
        let token = cookies.get('tokenE-Commerce')
        let id = cookies.get('idE-Commerce')
        commit('Loading', true)
        if(token != '') {
          axios.get('users/4')
          .then(res=> {
              commit('setUser', res.data)
          })
          .catch((e)=>{
            console.log(e)
        })
        }
      }
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
