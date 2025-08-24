<template>
  <div class="payment-cancel">
    <div class="cancel-container">
      <div class="cancel-icon">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#EF4444"/>
          <path d="M15 9l-6 6M9 9l6 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <h1 class="cancel-title">Paiement annulé</h1>
      <p class="cancel-subtitle">
        Votre paiement a été annulé. Aucun montant n'a été débité de votre compte.
      </p>

      <div class="cancel-message">
        <p>
          Nous comprenons que vous puissiez avoir des questions ou des préoccupations. 
          N'hésitez pas à nous contacter si vous avez besoin d'aide pour choisir le plan qui vous convient le mieux.
        </p>
      </div>

      <div class="cancel-actions">
        <button @click="retryPayment" class="btn-primary">
          Réessayer le paiement
        </button>
        <button @click="goToPricing" class="btn-secondary">
          Voir les plans
        </button>
        <button @click="contactSupport" class="btn-outline">
          Contacter le support
        </button>
      </div>

      <div class="help-section">
        <h4>Besoin d'aide ?</h4>
        <div class="help-options">
          <div class="help-item">
            <strong>Questions sur les plans</strong>
            <p>Consultez notre FAQ ou comparez nos différentes offres</p>
            <a href="/faq" class="help-link">Voir la FAQ</a>
          </div>
          <div class="help-item">
            <strong>Support technique</strong>
            <p>Notre équipe est là pour vous aider avec toute question technique</p>
            <a href="/support" class="help-link">Contacter le support</a>
          </div>
          <div class="help-item">
            <strong>Essai gratuit</strong>
            <p>Essayez notre service gratuitement pendant 7 jours</p>
            <a href="/signup" class="help-link">Commencer l'essai</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentCancel',
  data() {
    return {
      planId: null,
      billingCycle: null
    }
  },
  mounted() {
    // Récupérer les paramètres de l'URL pour un éventuel retry
    const urlParams = new URLSearchParams(window.location.search)
    this.planId = urlParams.get('plan')
    this.billingCycle = urlParams.get('billing')
  },
  methods: {
    retryPayment() {
      // Rediriger vers la section pricing avec le plan pré-sélectionné si disponible
      if (this.planId) {
        this.$router.push({
          path: '/',
          hash: '#pricing',
          query: { 
            plan: this.planId,
            billing: this.billingCycle 
          }
        })
      } else {
        this.goToPricing()
      }
    },

    goToPricing() {
      this.$router.push({
        path: '/',
        hash: '#pricing'
      })
    },

    contactSupport() {
      this.$router.push('/contact')
    },

    goToHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.payment-cancel {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  padding: var(--spacing-lg);
}

.cancel-container {
  background: white;
  padding: var(--spacing-xxl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  text-align: center;
  max-width: 700px;
  width: 100%;
}

.cancel-icon {
  margin-bottom: var(--spacing-xl);
}

.cancel-title {
  font-size: 2.5rem;
  font-weight: var(--font-weight-black);
  color: var(--landing-color-text);
  margin-bottom: var(--spacing-md);
}

.cancel-subtitle {
  font-size: 1.25rem;
  color: var(--text-color);
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
}

.cancel-message {
  background: #f8f9fa;
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-xl);
  text-align: left;
}

.cancel-message p {
  color: var(--text-color);
  line-height: 1.6;
  margin: 0;
}

.cancel-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary, .btn-outline {
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  border: none;
  font-size: 1rem;
}

.btn-primary {
  background: var(--landing-color-primary);
  color: white;
}

.btn-primary:hover {
  background: color-mix(in srgb, var(--landing-color-primary) 90%, #000000);
  transform: translateY(-2px);
}

.btn-secondary {
  background: #6B7280;
  color: white;
}

.btn-secondary:hover {
  background: #4B5563;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: var(--landing-color-text);
  border: 2px solid #e9ecef;
}

.btn-outline:hover {
  border-color: var(--landing-color-primary);
  color: var(--landing-color-primary);
}

.help-section {
  text-align: left;
  background: #f0f9ff;
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
}

.help-section h4 {
  color: var(--landing-color-text);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.help-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.help-item {
  background: white;
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
  border: 1px solid #e5e7eb;
}

.help-item strong {
  color: var(--landing-color-text);
  display: block;
  margin-bottom: var(--spacing-xs);
}

.help-item p {
  color: var(--text-color);
  font-size: 0.875rem;
  margin: var(--spacing-xs) 0;
  line-height: 1.5;
}

.help-link {
  color: var(--landing-color-primary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
}

.help-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .cancel-container {
    padding: var(--spacing-lg);
  }
  
  .cancel-title {
    font-size: 2rem;
  }
  
  .cancel-actions {
    flex-direction: column;
  }
  
  .btn-primary, .btn-secondary, .btn-outline {
    width: 100%;
  }

  .help-options {
    grid-template-columns: 1fr;
  }
}
</style> 