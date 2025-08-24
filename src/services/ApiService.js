// Service de base pour les appels API avec gestion JWT automatique
class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
    this.timeout = parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000
    this.isRefreshing = false
    this.failedQueue = []
    
    // Clés pour le stockage des tokens
    this.accessToken = import.meta.env.VITE_TOKEN_STORAGE_KEY || 'access_token'
    this.refreshTokenKey = import.meta.env.VITE_REFRESH_TOKEN_KEY || 'refresh_token'
  }

  // Configuration des headers par défaut
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    }

    const accessToken = this.getAccessToken()
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }
    return headers
  }

  // Récupérer le token d'accès
  getAccessToken() {
    return localStorage.getItem(this.accessToken)
  }

  // Récupérer le refresh token
  getRefreshToken() {
    return localStorage.getItem(this.refreshTokenKey)
  }

  // Stocker les tokens
  setTokens(accessToken, refreshToken = null) {
    localStorage.setItem(this.accessToken, accessToken)
    if (refreshToken) {
      localStorage.setItem(this.refreshToken, refreshToken)
    }
  }

  // Supprimer les tokens
  clearTokens() {
    localStorage.removeItem(this.accessToken)
    localStorage.removeItem(this.refreshTokenKey)
  }

  // Vérifier si le token est expiré
  isTokenExpired(token) {
    if (!token) return true
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000
      return payload.exp < currentTime
    } catch {
      return true
    }
  }

  // Traiter la queue des requêtes en attente
  processQueue(error, token = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })
    
    this.failedQueue = []
  }

  // Rafraîchir le token
  async refreshAccessToken() {
    const refreshToken = this.getRefreshToken()
    
    if (!refreshToken) {
      throw new Error('Aucun refresh token disponible')
    }

    if (this.isRefreshing) {
      // Si un refresh est déjà en cours, mettre en queue
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject })
      })
    }

    this.isRefreshing = true

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ Active la réception des cookies httpOnly
        body: JSON.stringify({ refreshToken })
      })

      if (!response.ok) {
        throw new Error('Impossible de rafraîchir le token')
      }

      const data = await response.json()
      
      // Stocker les nouveaux tokens
      this.setTokens(data.accessToken, data.refreshToken)
      
      // Traiter la queue avec le nouveau token
      this.processQueue(null, data.accessToken)
      
      return data.accessToken
    } catch (error) {
      // En cas d'erreur, nettoyer les tokens et traiter la queue
      this.clearTokens()
      this.processQueue(error, null)
      
      // Rediriger vers la page de connexion
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
      
      throw error
    } finally {
      this.isRefreshing = false
    }
  }

  // Méthode générique pour les requêtes avec gestion automatique des tokens
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    // Debug logging
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${options.method || 'GET'} ${url}`)
    }
    
    // Vérifier et rafraîchir le token si nécessaire
    let token = this.getAccessToken()
    if (token && this.isTokenExpired(token) && !this.isRefreshing) {
      try {
        token = await this.refreshAccessToken()
      } catch (error) {
        // Si le refresh échoue, continuer avec la requête originale
        // qui échouera probablement et sera gérée par handleError
      }
    }
    
    const config = {
      headers: this.getHeaders(),
      credentials: 'include', // ✅ Active la réception des cookies httpOnly
      ...options,
      signal: AbortSignal.timeout(this.timeout)
    }

    try {
      const response = await fetch(url, config)
      
      // Intercepteur de réponse : gestion automatique du 401
      if (response.status === 401 && !endpoint.includes('/auth/refresh')) {
        // Token invalide/expiré, essayer de le rafraîchir
        try {
          const newToken = await this.refreshAccessToken()
          
          // Relancer la requête avec le nouveau token
          config.headers.Authorization = `Bearer ${newToken}`
          const retryResponse = await fetch(url, config)
          
          if (!retryResponse.ok) {
            const error = await this.handleError(retryResponse)
            throw error
          }
          
          return this.parseResponse(retryResponse)
        } catch (refreshError) {
          // Si le refresh échoue, traiter l'erreur 401 normalement
          const error = await this.handleError(response)
          throw error
        }
      }
      
      // Vérifier le statut de la réponse
      if (!response.ok) {
        const error = await this.handleError(response)
        throw error
      }

             const result = await this.parseResponse(response)
       
       // Debug logging
       if (import.meta.env.DEV) {
         console.log(`✅ API Response: ${response.status}`, result)
       }
       
       return result
     } catch (error) {
       // Debug logging pour les erreurs
       if (import.meta.env.DEV) {
         console.error(`❌ API Error: ${url}`, error)
       }
       
       if (error.name === 'TimeoutError') {
         throw new Error('Timeout de la requête dépassé')
       }
       throw error
     }
   }

  // Parser la réponse
  async parseResponse(response) {
    const contentType = response.headers.get('content-type')
    
    // Vérifier si la réponse a du contenu
    if (response.status === 204) {
      // No Content - retourner null
      return null
    }
    
    if (contentType && contentType.includes('application/json')) {
      const text = await response.text()
      if (!text) return null
      try {
        return JSON.parse(text)
      } catch (error) {
        console.warn('Impossible de parser le JSON:', text)
        return text
      }
    }
    
    if (contentType && contentType.includes('text/')) {
      return await response.text()
    }
    
    // Pour les autres types de contenu, retourner le blob
    return await response.blob()
  }

  // Gestion des erreurs améliorée
  async handleError(response) {
    let errorMessage = `Erreur HTTP ${response.status}`
    let errorData = null
    
    try {
      const text = await response.text()
      if (text) {
        try {
          errorData = JSON.parse(text)
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          // Si ce n'est pas du JSON, utiliser le texte comme message
          errorMessage = text || errorMessage
        }
      }
    } catch {
      // Si on ne peut pas lire la réponse, garder le message par défaut
    }

    // Gestion spécifique selon le code de statut
    switch (response.status) {
      case 401:
        // Token expiré ou invalide - sera géré par l'intercepteur
        errorMessage = 'Session expirée, veuillez vous reconnecter'
        this.clearTokens()
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          window.location.href = '/login'
        }
        break
      case 403:
        errorMessage = 'Accès refusé - permissions insuffisantes'
        break
      case 404:
        errorMessage = 'Ressource non trouvée'
        break
      case 422:
        errorMessage = 'Données invalides'
        break
      case 429:
        errorMessage = 'Trop de requêtes - veuillez patienter'
        break
      case 500:
        errorMessage = 'Erreur serveur interne'
        break
      case 503:
        errorMessage = 'Service temporairement indisponible'
        break
    }

    const error = new Error(errorMessage)
    error.status = response.status
    error.data = errorData
    return error
  }

  // Méthodes HTTP avec intercepteurs automatiques
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `${endpoint}?${queryString}` : endpoint
    return this.request(url, { method: 'GET' })
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }

  // Méthode pour upload de fichiers
  async upload(endpoint, formData) {
    const accessToken = this.getAccessToken()
    
    const headers = {}
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }
    // Ne pas définir Content-Type pour FormData, le navigateur le fera

    return this.request(endpoint, {
      method: 'POST',
      headers,
      body: formData
    })
  }

  // Méthode pour annuler toutes les requêtes en cours
  cancelAllRequests() {
    // Cette méthode pourrait être étendue pour gérer l'annulation
    // des requêtes en cours avec AbortController
  }

  // Méthode utilitaire pour vérifier si l'utilisateur est connecté
  isAuthenticated() {
    const accessToken = this.getAccessToken()
    return accessToken && !this.isTokenExpired(accessToken)
  }
}

export default new ApiService()