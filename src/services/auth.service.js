import ApiService from './ApiService'

class AuthService {
  async login(credentials) {
    try {
      const response = await ApiService.post('/api/client/auth/login', credentials)
      // Stocker les tokens via l'ApiService
      if (response.tokens) {
        ApiService.setTokens(response.tokens.accessToken, response.tokens.refreshToken);
      }

      return {
        message: response.message,
        user: response.customer || response.admin,
        tokens: response.tokens,
      }
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la connexion')
    }
  }

  async signup(userData) {
    try {
      // On envoie les données telles quelles, le composant s'assure déjà de la structure
      const response = await ApiService.post('/api/client/auth/register', userData)
      // On peut retourner la réponse complète ou juste un message selon le backend
      return response
    } catch (error) {
      // Gestion d'erreur explicite
      throw new Error(error.message || 'Erreur lors de la création du compte')
    }
  }

  async finishOnboarding(userData) {
    try {
      // Inclure le token d'invitation depuis le localStorage si présent
      const inviteToken = localStorage.getItem('invite_token')
      const response = await ApiService.request('/api/onboarding/register/finalize', {
        method: 'POST',
        headers: inviteToken ? { ...ApiService.getHeaders(), Authorization: `Bearer ${inviteToken}` } : ApiService.getHeaders(),
        body: JSON.stringify(userData)
      })

      if (response?.tokens) {
        ApiService.setTokens(response.tokens.accessToken, response.tokens.refreshToken);
      }

      // Nettoyer le token d'invitation après utilisation
      try {
        localStorage.removeItem('invite_token')
      } catch {}

      return response
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la fin de l\'onboarding')
    }
  }

  async logout() {
    try {
      await ApiService.post('/admin/auth/logout')
    } catch (error) {
      // Ne pas bloquer la déconnexion côté client même en cas d'erreur serveur
      console.warn('Erreur lors de la déconnexion côté serveur:', error)
    } finally {
      // Nettoyer les tokens
      ApiService.clearTokens()
    }
  }

  async getCurrentUser() {
    try {
      const response = await ApiService.get('/api/client/profile')
      return response.user || response.admin || response
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la récupération des informations utilisateur')
    }
  }

  async refreshToken() {
    // L'ApiService gère déjà le refresh automatiquement
    return ApiService.refreshAccessToken()
  }

  async forgotPassword(email) {
    try {
      const response = await ApiService.post('/admin/auth/forgot-password', { email })
      return response
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de l\'envoi du lien de réinitialisation')
    }
  }

  async resetPassword(token, password) {
    try {
      const response = await ApiService.post('/admin/auth/reset-password', {
        token,
        password
      })
      return response
    } catch (error) {
      throw new Error(error.message || 'Erreur lors de la réinitialisation du mot de passe')
    }
  }
}

export default new AuthService()
