import ApiService from './ApiService'

/**
 * Service pour gérer les paiements Stripe
 */
export const stripeService = {
  /**
   * Créer un client Stripe
   * @param {Object} customerData - Données du client
   * @returns {Promise} Réponse de l'API
   */
  async createCustomer(customerData) {
    try {
      const response = await ApiService.post('/api/stripe/customers', customerData)
      return response
    } catch (error) {
      console.error('Erreur lors de la création du client Stripe:', error)
      throw error
    }
  },

  /**
   * Récupérer un client Stripe par son ID
   * @param {string} customerId - ID du client Stripe
   * @returns {Promise} Réponse de l'API
   */
  async getCustomer(customerId) {
    try {
      const response = await ApiService.get(`/api/stripe/customers/${customerId}`)
      return response
    } catch (error) {
      console.error('Erreur lors de la récupération du client Stripe:', error)
      throw error
    }
  },

  /**
   * Créer une session de checkout Stripe
   * @param {Object} checkoutData - Données pour la session de checkout
   * @param {string} checkoutData.customerId - ID du client Stripe
   * @param {string} checkoutData.plan_id - ID du plan
   * @param {string} checkoutData.prod_id - ID du produit du plan
   * @param {string} checkoutData.billingCycle - Cycle de facturation
   * @param {string} checkoutData.successUrl - URL de redirection en cas de succès
   * @param {string} checkoutData.cancelUrl - URL de redirection en cas d'annulation
   * @returns {Promise} Réponse de l'API avec l'URL de checkout
   */
  async createCheckoutSession(checkoutData) {
    try {
      const { plan_id, prod_id, billingCycle, successUrl, cancelUrl } = checkoutData
      
      if (!successUrl || !cancelUrl) {
        throw new Error('Les paramètres sont requis: successUrl, cancelUrl')
      }

      const response = await ApiService.post('/api/stripe/checkout-sessions', {
        plan_id,
        prod_id,
        billingCycle,
        successUrl,
        cancelUrl
      })

      return response
    } catch (error) {
      console.error('Erreur lors de la création de la session de checkout:', error)
      throw error
    }
  },

  /**
   * Récupérer les détails d'une session de checkout
   * @param {string} sessionId - ID de la session de checkout
   * @returns {Promise} Réponse de l'API
   */
  async getCheckoutSession(sessionId) {
    try {
      const response = await ApiService.get(`/api/stripe/checkout-sessions/${sessionId}`)
      return response
    } catch (error) {
      console.error('Erreur lors de la récupération de la session de checkout:', error)
      throw error
    }
  },

  /**
   * Récupérer les plans de prix disponibles
   * @returns {Promise} Réponse de l'API avec la liste des prix
   */
  async getAvailablePrices() {
    try {
      const response = await ApiService.get('/api/stripe/prices')
      return response
    } catch (error) {
      console.error('Erreur lors de la récupération des prix:', error)
      throw error
    }
  },

  /**
   * Récupérer un prix spécifique par son ID
   * @param {string} priceId - ID du prix
   * @returns {Promise} Réponse de l'API
   */
  async getPrice(priceId) {
    try {
      const response = await ApiService.get(`/api/stripe/prices/${priceId}`)
      return response
    } catch (error) {
      console.error('Erreur lors de la récupération du prix:', error)
      throw error
    }
  },

  /**
   * Récupérer l'abonnement actuel d'un client
   * @param {string} customerId - ID du client Stripe
   * @returns {Promise} Réponse de l'API
   */
  async getCustomerSubscription(customerId) {
    try {
      const response = await ApiService.get(`/api/stripe/customers/${customerId}/subscription`)
      return response
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'abonnement:', error)
      throw error
    }
  },

  /**
   * Annuler un abonnement
   * @param {string} subscriptionId - ID de l'abonnement à annuler
   * @returns {Promise} Réponse de l'API
   */
  async cancelSubscription(subscriptionId) {
    try {
      const response = await ApiService.delete(`/api/stripe/subscriptions/${subscriptionId}`)
      return response
    } catch (error) {
      console.error('Erreur lors de l\'annulation de l\'abonnement:', error)
      throw error
    }
  },

  /**
   * Mettre à jour un abonnement (changer de plan)
   * @param {string} subscriptionId - ID de l'abonnement
   * @param {string} newPriceId - ID du nouveau prix
   * @returns {Promise} Réponse de l'API
   */
  async updateSubscription(subscriptionId, newPriceId) {
    try {
      const response = await ApiService.put(`/api/stripe/subscriptions/${subscriptionId}`, {
        priceId: newPriceId
      })
      return response
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'abonnement:', error)
      throw error
    }
  },

  /**
   * Créer un portail client Stripe pour gérer l'abonnement
   * @param {string} customerId - ID du client Stripe
   * @param {string} returnUrl - URL de retour après utilisation du portail
   * @returns {Promise} Réponse de l'API avec l'URL du portail
   */
  async createBillingPortalSession(customerId, returnUrl) {
    try {
      const response = await ApiService.post('/api/stripe/billing-portal', {
        customerId,
        returnUrl
      })
      return response
    } catch (error) {
      console.error('Erreur lors de la création du portail de facturation:', error)
      throw error
    }
  },

  /**
   * Rediriger vers le portail client Stripe
   * @param {string} stripe_customer_id - ID du client Stripe
   * @param {string} returnUrl - URL de retour après utilisation du portail
   * @returns {Promise} Réponse de l'API avec l'URL du portail
   */
  async redirectToCustomerPortal(stripe_customer_id, returnUrl) {
    try {
      const response = await ApiService.post('/api/stripe/customer-portal', {
        stripe_customer_id,
        returnUrl
      })
      return response
    } catch (error) {
      console.error('Erreur lors de la redirection vers le portail client:', error)
      throw error
    }
  },

  /**
   * Vérifier une session Stripe pour l'onboarding
   * @param {string} sessionId - ID de la session Stripe
   * @returns {Promise} Réponse de l'API avec les détails du plan et l'autorisation
   */
  async verifyOnboardingSession(sessionId) {
    try {
      const response = await ApiService.post('/api/onboarding/register/start', {
        session_id: sessionId,
      })
      
      // Stocker le token d'invitation dans le localStorage s'il est présent
      const inviteToken = response?.data?.invite_token
      if (inviteToken) {
        try {
          localStorage.setItem('invite_token', inviteToken)
        } catch (e) {
          console.warn('Impossible de stocker invite_token dans le localStorage:', e)
        }
      }

      return response
    } catch (error) {
      console.error('Erreur lors de la vérification de la session d\'onboarding:', error)
      throw error
    }
  },

  /**
   * Traiter le paiement d'un plan spécifique
   * @param {Object} plan - Plan sélectionné depuis PricingSection
   * @param {Object} customer - Informations du client
   * @param {Object} urls - URLs de succès et d'annulation
   * @returns {Promise} URL de redirection vers Stripe Checkout
   */
  async processPayment(plan, customer, urls = {}) {
    try {
      const { successUrl = `${window.location.origin}/success`, cancelUrl = `${window.location.origin}/cancel` } = urls

      // Créer ou récupérer le client Stripe
      let stripeCustomer
      if (customer.stripeCustomerId) {
        stripeCustomer = await this.getCustomer(customer.stripeCustomerId)
      } else {
        stripeCustomer = await this.createCustomer({
          email: customer.email,
          name: customer.name,
          metadata: {
            userId: customer.id
          }
        })
      }

      // Récupérer le prix du plan
      const priceResponse = await this.getPrice(plan.stripePriceId)
      
      // Créer la session de checkout
      const session = await this.createCheckoutSession({
        customerId: stripeCustomer.data.id,
        priceId: priceResponse.data.price.id,
        successUrl,
        cancelUrl
      })

      return session.data.url
    } catch (error) {
      console.error('Erreur lors du traitement du paiement:', error)
      throw error
    }
  }
}

export default stripeService 