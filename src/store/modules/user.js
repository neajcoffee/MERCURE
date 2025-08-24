import { userService } from '../../services/user.service'

const state = {
  profile: null,
  preferences: {
    theme: 'light',
    language: 'fr',
    notifications: true
  }
}

const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = profile
  },
  
  SET_PREFERENCES(state, preferences) {
    state.preferences = { ...state.preferences, ...preferences }
  }
}

const actions = {
  async fetchProfile({ commit, dispatch }) {
    try {
      const profile = await UserService.getProfile()
      commit('SET_PROFILE', profile)
      return profile
    } catch (error) {
      dispatch('showNotification', {
        message: 'Erreur lors du chargement du profil',
        type: 'error'
      }, { root: true })
      throw error
    }
  },
  
  async updateProfile({ commit, dispatch }, profileData) {
    try {
      dispatch('setLoading', true, { root: true })
      
      const updatedProfile = await UserService.updateProfile(profileData)
      commit('SET_PROFILE', updatedProfile)
      
      dispatch('showNotification', {
        message: 'Profil mis à jour avec succès',
        type: 'success'
      }, { root: true })
      
      return updatedProfile
    } catch (error) {
      dispatch('showNotification', {
        message: error.message || 'Erreur lors de la mise à jour du profil',
        type: 'error'
      }, { root: true })
      throw error
    } finally {
      dispatch('setLoading', false, { root: true })
    }
  },
  
  updatePreferences({ commit }, preferences) {
    commit('SET_PREFERENCES', preferences)
    // Sauvegarder localement
    localStorage.setItem('user_preferences', JSON.stringify(preferences))
  }
}

const getters = {
  profile: state => state.profile,
  preferences: state => state.preferences,
  theme: state => state.preferences.theme
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
