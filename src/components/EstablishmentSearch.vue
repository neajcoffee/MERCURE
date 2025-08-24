<template>
  <div ref="containerRef" :class="`establishment-search ${className}`">
    <div class="establishment-search-input-container">
      <!-- Icône de recherche -->
      <svg 
        class="establishment-search-icon"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      
      <!-- Input de recherche -->
      <input
        type="text"
        :value="modelValue"
        @input="handleInputChange"
        @keypress="handleKeyPress"
        @focus="handleFocus"
        :placeholder="isGooglePlacesEnabled ? placeholder : 'Saisissez le nom de votre établissement...'"
        class="establishment-search-input"
      />
    </div>

    <!-- Message d'information si Google Places est désactivé -->
    <div 
      v-if="!isGooglePlacesEnabled && modelValue.length > 0" 
      class="establishment-search-info"
    >
      <p>
        💡 <strong>Mode manuel activé</strong> : L'API Google Places n'est pas configurée. 
        Vous pouvez saisir le nom de votre établissement manuellement et appuyer sur Entrée.
      </p>
    </div>

    <!-- Suggestions -->
    <div 
      v-if="showSuggestions && isGooglePlacesEnabled" 
      class="establishment-search-suggestions"
    >
      <!-- Loading -->
      <div v-if="isLoading" class="establishment-search-loading">
        <div class="establishment-search-loading-spinner"></div>
        Recherche en cours...
      </div>

      <!-- Erreur -->
      <div v-else-if="error" class="establishment-search-error">
        {{ error }}
      </div>

      <!-- Résultats -->
      <div v-else-if="suggestions.length > 0">
        <button
          v-for="establishment in suggestions.slice(0, 5)"
          :key="establishment.id"
          @click="handleSelect(establishment)"
          class="establishment-search-item"
        >
          <div class="establishment-search-item-content">
            <div class="establishment-search-item-icon">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path 
                  fill-rule="evenodd" 
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
                  clip-rule="evenodd" 
                />
              </svg>
            </div>
            <div class="establishment-search-item-text">
              <h4 class="establishment-search-item-name">
                {{ establishment.name }}
              </h4>
              <p class="establishment-search-item-address">
                {{ establishment.address }}
              </p>
            </div>
          </div>
        </button>
        <div class="establishment-search-attribution">
          Powered by Google
        </div>
      </div>

      <!-- Aucun résultat -->
      <div v-else-if="modelValue.length >= 3" class="establishment-search-no-results">
        Aucun établissement trouvé pour "{{ modelValue }}"
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EstablishmentSearch',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Rechercher un établissement...'
    },
    className: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'select'],
  data() {
    return {
      suggestions: [],
      isLoading: false,
      showSuggestions: false,
      error: null,
      isGooglePlacesEnabled: true,
      searchTimeout: null
    }
  },
  mounted() {
    // Gestion du clic en dehors pour fermer les suggestions
    document.addEventListener('mousedown', this.handleClickOutside)
  },
  beforeUnmount() {
    // Nettoyage des event listeners et timeouts
    document.removeEventListener('mousedown', this.handleClickOutside)
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }
  },
  methods: {
    handleClickOutside(event) {
      if (this.$refs.containerRef && !this.$refs.containerRef.contains(event.target)) {
        this.showSuggestions = false
      }
    },

    handleInputChange(event) {
      const inputValue = event.target.value
      this.$emit('update:modelValue', inputValue)
      
      // Si Google Places est désactivé, on ne fait pas de recherche
      if (!this.isGooglePlacesEnabled) {
        return
      }
      
      // Debounce la recherche
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }
      
      this.searchTimeout = setTimeout(() => {
        this.searchEstablishments(inputValue)
      }, 300)
    },

    handleKeyPress(event) {
      if (event.key === 'Enter') {
        this.handleManualSubmit()
      }
    },

    handleFocus() {
      if (this.modelValue.length >= 3 && this.isGooglePlacesEnabled) {
        this.showSuggestions = true
      }
    },

    async searchEstablishments(query) {
      if (query.length < 3) {
        this.suggestions = []
        this.showSuggestions = false
        return
      }

      this.isLoading = true
      this.error = null
      this.showSuggestions = true

      try {
        const response = await fetch(`/api/google-places/search?query=${encodeURIComponent(query)}`)
        const data = await response.json()

        if (response.ok) {
          this.suggestions = data.establishments || []
          this.isGooglePlacesEnabled = true
        } else {
          // Si l'API Google Places échoue, on désactive l'autocomplétion
          if (data.error && data.error.includes('REQUEST_DENIED')) {
            this.isGooglePlacesEnabled = false
            this.error = 'API Google Places non configurée. Utilisez le champ de saisie libre.'
          } else {
            this.error = data.error || 'Erreur lors de la recherche'
          }
          this.suggestions = []
        }
      } catch (err) {
        this.error = 'Erreur de connexion'
        this.suggestions = []
      } finally {
        this.isLoading = false
      }
    },

    handleSelect(establishment) {
      this.$emit('select', establishment)
      this.showSuggestions = false
    },

    handleManualSubmit() {
      // Si l'utilisateur appuie sur Entrée et qu'il n'y a pas de suggestions,
      // on crée un établissement manuel
      if (this.modelValue.trim() && !this.isGooglePlacesEnabled) {
        const manualEstablishment = {
          id: `manual-${Date.now()}`,
          name: this.modelValue.trim(),
          address: '',
          types: ['restaurant']
        }
        this.$emit('select', manualEstablishment)
      }
    }
  }
})
</script> 