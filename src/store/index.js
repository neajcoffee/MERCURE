import { createStore } from 'vuex'
import auth from './modules/auth'
import user from './modules/user'

export default createStore({
  state: {
    // État global de l'application
    loading: false,
    // notification:         {message: 'Actualisation des licences...',
    //     type: 'success'}
    notification: null
  },
  
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status
    },
    
    SET_NOTIFICATION(state, notification) {
      state.notification = notification
    },
    
    CLEAR_NOTIFICATION(state) {
      state.notification = null
    }
  },
  
  actions: {
    setLoading({ commit }, status) {
      commit('SET_LOADING', status)
    },
    
    showNotification({ commit }, { message, type = 'success', duration = 5000 }) {
      commit('SET_NOTIFICATION', { message, type })
      
      // Auto-clear notification after duration
      setTimeout(() => {
        commit('CLEAR_NOTIFICATION')
      }, duration)
    },
    
    clearNotification({ commit }) {
      commit('CLEAR_NOTIFICATION')
    }
  },
  
  getters: {
    isLoading: state => state.loading,
    notification: state => state.notification
  },
  
  modules: {
    auth,
    user
  }
})
