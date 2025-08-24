import authService from '../../services/auth.service'

const state = {
  user: null,
  accessToken: localStorage.getItem(import.meta.env.VITE_TOKEN_STORAGE_KEY) || null,
  refreshToken: localStorage.getItem(import.meta.env.VITE_REFRESH_TOKEN_KEY) || null,
  isAuthenticated: !!localStorage.getItem(import.meta.env.VITE_TOKEN_STORAGE_KEY)
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  
  SET_TOKEN(state, tokens) {
    state.accessToken = tokens.accessToken
    state.refreshToken = tokens.refreshToken
    if (tokens.accessToken) {
      localStorage.setItem(import.meta.env.VITE_TOKEN_STORAGE_KEY, tokens.accessToken)
      if (tokens.refreshToken) {
        localStorage.setItem(import.meta.env.VITE_REFRESH_TOKEN_KEY, tokens.refreshToken)
      }
    } else {
      localStorage.removeItem(import.meta.env.VITE_TOKEN_STORAGE_KEY)
      localStorage.removeItem(import.meta.env.VITE_REFRESH_TOKEN_KEY)
    }
  },
  
  SET_REFRESH_TOKEN(state, refreshToken) {
    state.refreshToken = refreshToken
    if (refreshToken) {
      localStorage.setItem(import.meta.env.VITE_REFRESH_TOKEN_KEY, refreshToken)
    } else {
      localStorage.removeItem(import.meta.env.VITE_REFRESH_TOKEN_KEY)
    }
  },
  
  SET_AUTHENTICATED(state, status) {
    state.isAuthenticated = status
  }
}

const actions = {
  async login({ commit, dispatch }, credentials) {
    try {
      dispatch('setLoading', true, { root: true })
      
      const response = await authService.login(credentials)
      const { user, tokens} = response
      
      commit('SET_USER', user)
      commit('SET_TOKEN', tokens)
      commit('SET_AUTHENTICATED', true)
      
      dispatch('showNotification', {
        message: 'Connexion réussie !',
        type: 'success'
      }, { root: true })
      
      return response
    } catch (error) {
      dispatch('showNotification', {
        message: error.message || 'Erreur de connexion',
        type: 'error'
      }, { root: true })
      throw error
    } finally {
      dispatch('setLoading', false, { root: true })
    }
  },
  
  async signup({ commit, dispatch }, userData) {
    try {
      dispatch('setLoading', true, { root: true })
      
      const response = await authService.signup(userData)
      
      dispatch('showNotification', {
        message: 'Compte créé avec succès !',
        type: 'success'
      }, { root: true })
      
      return response
    } catch (error) {
      dispatch('showNotification', {
        message: error.message || 'Erreur lors de la création du compte',
        type: 'error'
      }, { root: true })
      throw error
    } finally {
      dispatch('setLoading', false, { root: true })
    }
  },
  
  async logout({ commit, dispatch }) {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    } finally {
      // Nettoyer l'état local même en cas d'erreur
      commit('SET_USER', null)
      commit('SET_TOKEN', null)
      commit('SET_REFRESH_TOKEN', null)
      commit('SET_AUTHENTICATED', false)
      
      dispatch('showNotification', {
        message: 'Déconnexion réussie',
        type: 'success'
      }, { root: true })
    }
  },
  
  async initializeAuth({ commit, state }) {
    if (state.accessToken) {
      try {
        const response = await authService.getCurrentUser()
        const user = response.customer
        commit('SET_USER', user)
        commit('SET_AUTHENTICATED', true)
      } catch (error) {
        // Token invalide, nettoyer
        commit('SET_USER', null)
        commit('SET_TOKEN', null)
        commit('SET_REFRESH_TOKEN', null)
        commit('SET_AUTHENTICATED', false)
      }
    }
  }
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  currentUser: state => state.user,
  accessToken: state => state.accessToken
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
