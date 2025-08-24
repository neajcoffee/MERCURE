<template>
  <div class="signup-container">
    <div class="signup-form-container">
      <!-- En-tête -->
      <div>
        <div class="signup-text-center">
          <div class="signup-title">Mercure Theme</div>
          <h2 class="signup-subtitle">
            Créer votre compte
          </h2>
          <p class="signup-description">
            Commencez votre essai gratuit de 7 jours
          </p>
        </div>
      </div>

      <!-- Message de succès -->
      <div 
        v-if="success" 
        class="signup-success-container"
      >
        <div class="signup-success-icon">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="signup-success-title">
          Compte créé avec succès !
        </h3>
        <p class="signup-success-text">
          Redirection vers votre dashboard...
        </p>
      </div>

      <!-- Formulaire d'inscription -->
      <form 
        v-else
        @submit.prevent="handleSubmit" 
        class="signup-card"
      >
        <!-- Indicateur d'étapes -->
        <StepIndicator :current-step="currentStep" />

        <!-- Message d'erreur -->
        <div 
          v-if="error" 
          class="signup-alert signup-alert--error"
        >
          <p>{{ error }}</p>
        </div>

        <!-- Étape 1: Informations de connexion -->
        <div v-if="currentStep === 1" class="signup-space-y-6">
          <div>
            <label for="email" class="signup-label">
              Adresse email *
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              :class="[
                'signup-input',
                currentStep === 1 && !formData.email ? 'signup-input--error' : ''
              ]"
              placeholder="votre@email.com"
            />
            <p v-if="currentStep === 1 && !formData.email" class="signup-error-text">
              L'adresse email est requise
            </p>
          </div>

          <div>
            <label for="password" class="signup-label">
              Mot de passe *
            </label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              :class="[
                'signup-input',
                currentStep === 1 && !formData.password ? 'signup-input--error' : ''
              ]"
              placeholder="••••••••"
            />
            <p v-if="currentStep === 1 && !formData.password" class="signup-error-text">
              Le mot de passe est requis
            </p>
          </div>

          <div>
            <label for="confirmPassword" class="signup-label">
              Confirmer le mot de passe *
            </label>
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              required
              :class="[
                'signup-input',
                currentStep === 1 && (!formData.confirmPassword || formData.password !== formData.confirmPassword) ? 'signup-input--error' : ''
              ]"
              placeholder="••••••••"
            />
            <p v-if="currentStep === 1 && !formData.confirmPassword" class="signup-error-text">
              La confirmation du mot de passe est requise
            </p>
            <p v-if="currentStep === 1 && formData.confirmPassword && formData.password !== formData.confirmPassword" class="signup-error-text">
              Les mots de passe ne correspondent pas
            </p>
          </div>
        </div>

        <!-- Étape 2: Informations du restaurant -->
        <div v-if="currentStep === 2" class="signup-space-y-6">
          <div>
            <label for="restaurantSearch" class="signup-label">
              Rechercher votre établissement (optionnel)
            </label>
            <EstablishmentSearch
              v-model="formData.restaurantName"
              @select="handleEstablishmentSelect"
              placeholder="Recherchez votre restaurant..."
              class="signup-space-y-2"
            />
            <p class="signup-error-text" style="color: var(--signup-gray-500)">
              💡 Recherchez votre restaurant pour remplir automatiquement les informations
            </p>
          </div>

          <div>
            <label for="restaurantName" class="signup-label">
              Nom de votre restaurant *
            </label>
            <input
              id="restaurantName"
              v-model="formData.restaurantName"
              type="text"
              required
              :class="[
                'signup-input',
                currentStep === 2 && !formData.restaurantName ? 'signup-input--error' : ''
              ]"
              placeholder="Le Petit Bistrot"
            />
            <p v-if="currentStep === 2 && !formData.restaurantName" class="signup-error-text">
              Le nom du restaurant est requis
            </p>
          </div>

          <div>
            <label for="restaurantAddress" class="signup-label">
              Adresse complète du restaurant *
            </label>
            <textarea
              id="restaurantAddress"
              v-model="formData.restaurantAddress"
              required
              rows="3"
              :class="[
                'signup-input',
                currentStep === 2 && !formData.restaurantAddress ? 'signup-input--error' : ''
              ]"
              placeholder="123 Rue de la Paix, 75001 Paris, France"
            />
            <p v-if="currentStep === 2 && !formData.restaurantAddress" class="signup-error-text">
              L'adresse du restaurant est requise
            </p>
          </div>

          <div>
            <label for="ownerName" class="signup-label">
              Nom du propriétaire *
            </label>
            <input
              id="ownerName"
              v-model="formData.ownerName"
              type="text"
              required
              :class="[
                'signup-input',
                currentStep === 2 && !formData.ownerName ? 'signup-input--error' : ''
              ]"
              placeholder="Jean Dupont"
            />
            <p v-if="currentStep === 2 && !formData.ownerName" class="signup-error-text">
              Le nom du propriétaire est requis
            </p>
          </div>

          <div>
            <label for="phone" class="signup-label">
              Téléphone *
            </label>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              required
              :class="[
                'signup-input',
                currentStep === 2 && !formData.phone ? 'signup-input--error' : ''
              ]"
              placeholder="01 23 45 67 89"
            />
            <p v-if="currentStep === 2 && !formData.phone" class="signup-error-text">
              Le téléphone est requis
            </p>
          </div>

          <div>
            <label for="city" class="signup-label">
              Ville *
            </label>
            <input
              id="city"
              v-model="formData.city"
              type="text"
              required
              :class="[
                'signup-input',
                currentStep === 2 && !formData.city ? 'signup-input--error' : ''
              ]"
              placeholder="Paris"
            />
            <p v-if="currentStep === 2 && !formData.city" class="signup-error-text">
              La ville est requise
            </p>
          </div>
        </div>

        <!-- Étape 3: Préférences -->
        <div v-if="currentStep === 3" class="signup-space-y-6">
          <div>
            <label for="cuisineType" class="signup-label">
              Type de cuisine
            </label>
            <select
              id="cuisineType"
              v-model="formData.cuisineType"
              class="signup-select"
            >
              <option value="">Sélectionnez un type</option>
              <option value="francaise">Cuisine française</option>
              <option value="italienne">Cuisine italienne</option>
              <option value="japonaise">Cuisine japonaise</option>
              <option value="chinoise">Cuisine chinoise</option>
              <option value="indienne">Cuisine indienne</option>
              <option value="mexicaine">Cuisine mexicaine</option>
              <option value="mediterraneenne">Cuisine méditerranéenne</option>
              <option value="fusion">Cuisine fusion</option>
              <option value="bistrot">Bistrot</option>
              <option value="brasserie">Brasserie</option>
              <option value="gastronomique">Restaurant gastronomique</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div>
            <label for="heardFrom" class="signup-label">
              Comment avez-vous entendu parler de nous ?
            </label>
            <select
              id="heardFrom"
              v-model="formData.heardFrom"
              class="signup-select"
            >
              <option value="">Sélectionnez une source</option>
              <option value="reseau_social">Réseau social</option>
              <option value="amis_proches">Amis/proches</option>
              <option value="publicite_papier">Publicité papier</option>
              <option value="reseau_professionnel">Réseau professionnel</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        </div>

        <!-- Navigation -->
        <div class="signup-flex signup-justify-between" style="margin-top: 2rem;">
          <button
            v-if="currentStep > 1"
            type="button"
            @click="prevStep"
            class="signup-btn signup-btn--secondary signup-flex signup-items-center signup-gap-4"
          >
            <svg style="width: 1rem; height: 1rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Précédent
          </button>

          <button
            v-if="currentStep < totalSteps"
            type="button"
            @click="nextStep"
            :disabled="!canProceedToNext"
            :title="!canProceedToNext ? getMissingFieldsMessage() : ''"
            class="signup-btn signup-btn--primary signup-flex signup-items-center signup-gap-4"
            style="margin-left: auto;"
          >
            Suivant
            <svg style="width: 1rem; height: 1rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            v-else
            type="submit"
            :disabled="isLoading"
            class="signup-btn signup-btn--primary"
            style="margin-left: auto;"
          >
            <span v-if="isLoading" class="signup-flex signup-items-center signup-gap-4">
              <span class="signup-spinner"></span>
              Création en cours...
            </span>
            <span v-else>Créer mon compte</span>
          </button>
        </div>

        <!-- Lien de connexion -->
        <div class="signup-text-center" style="margin-top: 1.5rem;">
          <p style="font-size: 0.875rem; color: var(--signup-gray-600); margin: 0;">
            Déjà un compte ?
            <a href="/auth/login" style="color: var(--signup-primary); text-decoration: underline;">
              Se connecter
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import StepIndicator from './StepIndicator.vue'
import EstablishmentSearch from './EstablishmentSearch.vue'
import authService from '@/services/auth.service'

export default defineComponent({
  name: 'SignupPage',
  components: {
    StepIndicator,
    EstablishmentSearch
  },
  data() {
    return {
      currentStep: 1,
      totalSteps: 3,
      error: '',
      success: false,
      selectedEstablishment: null,
      formData: {
        email: '',
        password: '',
        confirmPassword: '',
        restaurantName: '',
        restaurantAddress: '',
        ownerName: '',
        phone: '',
        cuisineType: '',
        city: '',
        heardFrom: ''
      }
    }
  },
  computed: {
    ...mapGetters(['isLoading']),
    
    canProceedToNext() {
      switch (this.currentStep) {
        case 1:
          return !!(
            this.formData.email && 
            this.formData.password && 
            this.formData.confirmPassword && 
            this.formData.password === this.formData.confirmPassword
          )
        case 2:
          return !!(
            this.formData.restaurantName && 
            this.formData.ownerName && 
            this.formData.phone && 
            this.formData.city && 
            this.formData.restaurantAddress
          )
        case 3:
          return true // Étape optionnelle
        default:
          return false
      }
    }
  },
  methods: {
    ...mapActions(['showNotification', 'setLoading']),
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++
        this.error = ''
      }
    },

    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
        this.error = ''
      }
    },

    handleEstablishmentSelect(establishment) {
      this.selectedEstablishment = establishment
      this.formData.restaurantName = establishment.name
      this.formData.restaurantAddress = establishment.address
      
      if (establishment.phone) {
        this.formData.phone = establishment.phone
      }
      
      // Extraire la ville de l'adresse si possible
      if (establishment.address) {
        const addressParts = establishment.address.split(',')
        if (addressParts.length > 0) {
          const lastPart = addressParts[addressParts.length - 1].trim()
          if (lastPart && !lastPart.match(/^\d/)) {
            this.formData.city = lastPart
          }
        }
      }
    },

    getMissingFieldsMessage() {
      let message = 'Veuillez remplir les champs suivants pour continuer :'
      let missingFields = []

      switch (this.currentStep) {
        case 1:
          if (!this.formData.email) missingFields.push('Adresse email')
          if (!this.formData.password) missingFields.push('Mot de passe')
          if (!this.formData.confirmPassword) missingFields.push('Confirmation du mot de passe')
          if (this.formData.password !== this.formData.confirmPassword) missingFields.push('Les mots de passe ne correspondent pas')
          break
        case 2:
          if (!this.formData.restaurantName) missingFields.push('Nom de votre restaurant')
          if (!this.formData.restaurantAddress) missingFields.push('Adresse du restaurant')
          if (!this.formData.ownerName) missingFields.push('Nom du propriétaire')
          if (!this.formData.phone) missingFields.push('Téléphone')
          if (!this.formData.city) missingFields.push('Ville')
          break
        case 3:
          // Étape optionnelle
          break
      }

      if (missingFields.length > 0) {
        message += ' ' + missingFields.join(', ')
      }
      return message
    },

    async handleSubmit() {
      this.setLoading(true)
      this.error = ''

      // Validation finale
      if (!this.formData.email || !this.formData.password || !this.formData.confirmPassword || this.formData.password !== this.formData.confirmPassword) {
        this.error = 'Veuillez remplir tous les champs de l\'étape 1 correctement.'
        this.setLoading(false)
        return
      }

      if (!this.formData.restaurantName || !this.formData.ownerName || !this.formData.phone || !this.formData.city || !this.formData.restaurantAddress) {
        this.error = 'Veuillez remplir tous les champs obligatoires de l\'étape 2.'
        this.setLoading(false)
        return
      }

      if (this.formData.password !== this.formData.confirmPassword) {
        this.error = 'Les mots de passe ne correspondent pas.'
        this.setLoading(false)
        return
      }

      try {
        console.log('🚀 Tentative de création de compte...')
        console.log('📧 Email:', this.formData.email)
        console.log('🏪 Restaurant:', this.formData.restaurantName)
        console.log('👤 Propriétaire:', this.formData.ownerName)

        // Préparer les données pour l'API
        const ownerNameParts = this.formData.ownerName.trim().split(' ')
        const userData = {
          email: this.formData.email,
          password: this.formData.password,
          first_name: ownerNameParts[0] || '',
          last_name: ownerNameParts.slice(1).join(' ') || ownerNameParts[0] || '',
          shop_domain: this.formData.restaurantName.toLowerCase().replace(/[^a-z0-9]/g, '')
        }

        console.log('📤 Données envoyées:', userData)

        const response = await authService.signup(userData)
        
        console.log('✅ Compte créé avec succès!')
        
        this.success = true
        
        // Afficher notification de succès
        this.showNotification({
          message: 'Compte créé avec succès ! Redirection vers la page de connexion...',
          type: 'success'
        })
        
        // Émission d'un événement pour la redirection (à gérer par le parent)
        this.$emit('signup-success', response)
        
        // Redirection vers login après inscription réussie
        setTimeout(() => {
          if (this.$router) {
            this.$router.push('/login')
          } else {
            // Fallback pour redirection manuelle
            window.location.href = '/login'
          }
        }, 2000)
        
      } catch (error) {
        console.error('💥 Erreur lors de l\'inscription:', error)
        this.error = error.message || 'Erreur lors de la création du compte'
        
        // Afficher notification d'erreur
        this.showNotification({
          message: this.error,
          type: 'error'
        })
      } finally {
        this.setLoading(false)
      }
    }
  }
})
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style> 