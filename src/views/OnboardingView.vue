<template>
  <div class="onboarding-container">
    <!-- Écran de chargement pendant la vérification -->
    <div v-if="isVerifyingSession" class="loading-screen">
      <div class="loading-spinner"></div>
      <p>Vérification de votre paiement en cours...</p>
    </div>

    <!-- Contenu principal une fois la vérification réussie -->
    <div v-else-if="hasAccess">
      <div class="onboarding-header">
        <div class="success-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#10B981"/>
            <path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1 class="onboarding-title">Paiement réussi !</h1>
        <p class="onboarding-subtitle">
          Créez votre compte pour commencer à utiliser {{ planDetails?.name || 'votre plan' }}
        </p>
      </div>

      <!-- Reste du contenu existant... -->
      <div class="onboarding-content">
        <!-- Informations du plan -->
        <div class="plan-summary" v-if="planDetails">
          <h3>Votre abonnement</h3>
          <div class="plan-info">
            <div class="plan-detail">
              <span class="label">Plan :</span>
              <span class="value">{{ planDetails.name }}</span>
            </div>
            <div class="plan-detail">
              <span class="label">Facturation :</span>
              <span class="value">{{ billingCycle === 'monthly' ? 'Mensuelle' : 'Annuelle' }}</span>
            </div>
            <div class="plan-detail">
              <span class="label">Prix :</span>
              <span class="value">{{ planDetails.price }}€/{{ billingCycle === 'monthly' ? 'mois' : 'an' }}</span>
            </div>
          </div>
        </div>

        <!-- Formulaire de création de compte -->
        <form @submit.prevent="handleAccountCreation" class="onboarding-form">
          <h3>Créer votre compte</h3>
          
          <div class="form-group">
            <label for="email">Email *</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              required
              :class="{ 'error': errors.email }"
              placeholder="votre@email.com"
            >
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>
          
          <div class="form-group">
            <label for="firstName">Prénom *</label>
            <input
              type="text"
              id="firstName"
              v-model="formData.firstName"
              required
              :class="{ 'error': errors.firstName }"
              placeholder="Votre prénom"
            >
            <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
          </div>

          <div class="form-group">
            <label for="lastName">Nom *</label>
            <input
              type="text"
              id="lastName"
              v-model="formData.lastName"
              required
              :class="{ 'error': errors.lastName }"
              placeholder="Votre nom"
            >
            <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
          </div>


          <div class="form-group">
            <label for="password">Mot de passe *</label>
            <input
              type="password"
              id="password"
              v-model="formData.password"
              required
              :class="{ 'error': errors.password }"
              placeholder="Choisissez un mot de passe sécurisé"
              minlength="8"
            >
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
            <small class="password-hint">Minimum 8 caractères</small>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmer le mot de passe *</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="formData.confirmPassword"
              required
              :class="{ 'error': errors.confirmPassword }"
              placeholder="Confirmez votre mot de passe"
            >
            <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
          </div>

          <div class="form-group">
            <label for="company">Entreprise (optionnel)</label>
            <input
              type="text"
              id="company"
              v-model="formData.company"
              placeholder="Nom de votre entreprise"
            >
          </div>

          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="formData.acceptTerms"
                required
              >
              <span class="checkmark"></span>
              J'accepte les <a href="/terms" target="_blank">conditions d'utilisation</a> et la <a href="/privacy" target="_blank">politique de confidentialité</a> *
            </label>
            <span v-if="errors.acceptTerms" class="error-message">{{ errors.acceptTerms }}</span>
          </div>

          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="formData.newsletter"
              >
              <span class="checkmark"></span>
              Je souhaite recevoir les actualités et conseils par email
            </label>
          </div>

          <button
            type="submit"
            class="btn-primary"
            :disabled="isCreatingAccount"
            :class="{ 'loading': isCreatingAccount }"
          >
            <span v-if="isCreatingAccount">Création en cours...</span>
            <span v-else>Créer mon compte et accéder au dashboard</span>
          </button>
        </form>

        <!-- Informations supplémentaires -->
        <div class="onboarding-info">
          <h4>Ce qui vous attend :</h4>
          <ul>
            <li>✅ Accès immédiat à toutes les fonctionnalités de votre plan</li>
            <li>✅ 7 jours d'essai gratuit pour tester sans engagement</li>
            <li>✅ Support client dédié pour vous accompagner</li>
            <li>✅ Configuration guidée de votre workspace</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Message d'erreur si pas d'accès -->
    <div v-else class="error-screen">
      <h2>Accès refusé</h2>
      <p>Vous n'avez pas les autorisations nécessaires pour accéder à cette page.</p>
      <button @click="$router.push('/pricing')" class="btn-primary">
        Retourner aux tarifs
      </button>
    </div>
  </div>
</template>

<script>
import authService from '../services/auth.service'
import { stripeService } from '../services/stripe.service'

export default {
  name: 'OnboardingView',
  data() {
    return {
      isCreatingAccount: false,
      isVerifyingSession: true,
      hasAccess: false,
      planDetails: null,
      billingCycle: 'monthly',
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        company: '',
        acceptTerms: false,
        newsletter: false
      },
      errors: {}
    }
  },
  mounted() {
    this.verifyStripeSession()
  },
  methods: {
    async verifyStripeSession() {
      try {
        this.isVerifyingSession = true
        
        // Récupérer le session_id depuis l'URL
        const urlParams = new URLSearchParams(window.location.search)
        const sessionId = urlParams.get('session_id')
        
        if (!sessionId) {
          this.$router.push('/pricing?error=Session de paiement manquante')
        return
        }


        // Vérifier la session Stripe via le service
        const response = await stripeService.verifyOnboardingSession(sessionId)
        console.log(response)
        
        
        if (response.success) {
          this.hasAccess = true
          this.planDetails = response.planDetails
          this.billingCycle = response.billingCycle
          this.extractPlanInfo()
        } else {
          this.$router.push('/pricing?error=Session de paiement invalide ou expirée')
        }

      } catch (error) {
        console.error('Erreur lors de la vérification de la session Stripe:', error)
        this.$router.push('/pricing?error=Erreur lors de la vérification du paiement')
      } finally {
        this.isVerifyingSession = false
      }
    },

    extractPlanInfo() {
      // Cette méthode n'est plus nécessaire car les données viennent du serveur
      // Garder pour compatibilité si besoin
    },

    validateForm() {
      let isValid = true
      
      if (!this.formData.firstName.trim()) {
        this.errors.firstName = 'Le prénom est requis'
        isValid = false
      }
      
      if (!this.formData.lastName.trim()) {
        this.errors.lastName = 'Le nom est requis'
        isValid = false
      }
      
      if (!this.formData.email) {
        this.errors.email = 'L\'email est requis'
        isValid = false
      } else if (!this.isValidEmail(this.formData.email)) {
        this.errors.email = 'Format d\'email invalide'
        isValid = false
      }
      
      if (!this.formData.password) {
        this.errors.password = 'Le mot de passe est requis'
        isValid = false
      } else if (this.formData.password.length < 8) {
        this.errors.password = 'Le mot de passe doit contenir au moins 8 caractères'
        isValid = false
      }
      
      if (this.formData.password !== this.formData.confirmPassword) {
        this.errors.confirmPassword = 'Les mots de passe ne correspondent pas'
        isValid = false
      }
      
      if (!this.formData.acceptTerms) {
        this.errors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation'
        isValid = false
      }
      
      return isValid
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },

    async handleAccountCreation() {
      this.errors = {}
      
      if (!this.validateForm()) {
        return
      }
      
      try {
        this.isCreatingAccount = true

        // Préparer les données pour l'API
        const accountData = {
          email: this.formData.email,
          password: this.formData.password,
          first_name: this.formData.firstName,
          last_name: this.formData.lastName,
          company: this.formData.company,
          newsletter: this.formData.newsletter,
          planId: this.planDetails?.id,
          billingCycle: this.billingCycle
        }

        // Créer le compte via le service d'authentification
        const response = await authService.finishOnboarding(accountData)
        console.log(response)

        // Si la création réussit, connecter automatiquement l'utilisateur
        if (response.tokens) {
          // Les tokens sont déjà stockés par le service
          // Rediriger vers le dashboard
          this.$router.push('/dashboard')
        } else {
          // Si pas de tokens, rediriger vers la page de login
          this.$router.push('/login')
        }

      } catch (error) {
        console.error('Erreur lors de la création du compte:', error)
        
        // Gestion des erreurs spécifiques
        if (error.message.toLowerCase().includes('email') || error.message.toLowerCase().includes('existe')) {
          this.errors.email = 'Cet email est déjà utilisé'
        } else if (error.message.toLowerCase().includes('password') || error.message.toLowerCase().includes('mot de passe')) {
          this.errors.password = 'Le mot de passe ne respecte pas les critères requis'
        } else {
          alert('Une erreur est survenue lors de la création du compte. Veuillez réessayer.')
        }
      } finally {
        this.isCreatingAccount = false
      }
    }
  }
}
</script>

<style scoped>
.onboarding-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: var(--spacing-xl) var(--spacing-lg);
}

.loading-screen, .error-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh; /* Ensure it takes up some height */
  text-align: center;
  padding: var(--spacing-xl);
}

.loading-spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-lg);
}

.loading-screen p, .error-screen p {
  color: var(--text-color-light);
  font-size: 1.125rem;
  margin-top: var(--spacing-sm);
}

.onboarding-header {
  text-align: center;
  margin-bottom: var(--spacing-xxl);
}

.success-icon {
  margin: 0 auto var(--spacing-lg);
}

.onboarding-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: var(--font-weight-black);
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
}

.onboarding-subtitle {
  font-size: 1.125rem;
  color: var(--text-color-light);
  max-width: 600px;
  margin: 0 auto;
}

.onboarding-content {
  max-width: 600px;
  margin: 0 auto;
}

.plan-summary {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-soft);
}

.plan-summary h3 {
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-color);
  margin-bottom: var(--spacing-lg);
}

.plan-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.plan-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.plan-detail .label {
  color: var(--text-color-light);
  font-weight: var(--font-weight-medium);
}

.plan-detail .value {
  color: var(--text-color);
  font-weight: var(--font-weight-semibold);
}

.onboarding-form {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-soft);
}

.onboarding-form h3 {
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-color);
  margin-bottom: var(--spacing-xl);
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group label {
  display: block;
  font-weight: var(--font-weight-medium);
  color: var(--text-color);
  margin-bottom: var(--spacing-xs);
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"] {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 1rem;
  transition: all 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group input.error {
  border-color: var(--error-color);
}

.error-message {
  display: block;
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: var(--spacing-xs);
}

.password-hint {
  display: block;
  color: var(--text-color-light);
  font-size: 0.875rem;
  margin-top: var(--spacing-xs);
}

.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1.5;
}

.checkbox-label input[type="checkbox"] {
  margin: 0;
}

.checkbox-label a {
  color: var(--primary-color);
  text-decoration: none;
}

.checkbox-label a:hover {
  text-decoration: underline;
}

.btn-primary {
  width: 100%;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: var(--spacing-lg);
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-color-dark);
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-primary.loading {
  position: relative;
}

.onboarding-info {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-soft);
}

.onboarding-info h4 {
  font-size: 1.125rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-color);
  margin-bottom: var(--spacing-lg);
}

.onboarding-info ul {
  list-style: none;
  padding: 0;
}

.onboarding-info li {
  padding: var(--spacing-xs) 0;
  color: var(--text-color);
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .onboarding-container {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .plan-detail {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: var(--spacing-xl);
}

.error-screen h2 {
  color: var(--error-color);
  margin-bottom: var(--spacing-lg);
}

.error-screen p {
  color: var(--text-color-light);
  margin-bottom: var(--spacing-xl);
  max-width: 500px;
}
</style> 