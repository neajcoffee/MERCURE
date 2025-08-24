<template>
  <div class="step-indicator">
    <div class="step-indicator-container">
      <div 
        v-for="step in totalSteps" 
        :key="step" 
        class="step-indicator-item"
      >
        <div
          :class="[
            'step-indicator-circle',
            step <= currentStep
              ? 'step-indicator-circle--active'
              : 'step-indicator-circle--inactive'
          ]"
        >
          <!-- Icône de validation pour les étapes complétées -->
          <svg 
            v-if="step < currentStep" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <!-- Numéro de l'étape -->
          <span v-else>{{ step }}</span>
        </div>
        
        <!-- Ligne de connexion entre les étapes -->
        <div
          v-if="step < totalSteps"
          :class="[
            'step-indicator-line',
            step < currentStep ? 'step-indicator-line--active' : 'step-indicator-line--inactive'
          ]"
        />
      </div>
    </div>
    
    <!-- Labels des étapes -->
    <div class="step-indicator-labels">
      <span 
        v-for="(label, index) in stepLabels" 
        :key="index"
        :class="[
          'step-indicator-label',
          index + 1 <= currentStep ? 'step-indicator-label--active' : 'step-indicator-label--inactive'
        ]"
      >
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StepIndicator',
  props: {
    currentStep: {
      type: Number,
      required: true,
      validator: (value) => value >= 1
    },
    totalSteps: {
      type: Number,
      default: 3,
      validator: (value) => value >= 1
    },
    stepLabels: {
      type: Array,
      default: () => ['Informations', 'Restaurant', 'Préférences']
    }
  },
  computed: {
    // Génère un tableau avec les numéros d'étapes
    steps() {
      return Array.from({ length: this.totalSteps }, (_, i) => i + 1)
    }
  }
})
</script>

<style scoped>
/* Styles spécifiques au composant si nécessaire */
.step-indicator {
  /* Styles personnalisés */
}
</style> 