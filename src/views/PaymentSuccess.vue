<template>
  <div class="payment-success">
    <div class="success-container">
      <div class="success-icon">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#10B981"/>
          <path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <h1 class="success-title">Paiement réussi !</h1>
      <p class="success-subtitle">
        Merci pour votre abonnement. Votre compte a été activé avec succès.
      </p>

      <div class="payment-details" v-if="paymentDetails">
        <h3>Détails de votre abonnement</h3>
        <div class="detail-item">
          <span class="label">Plan :</span>
          <span class="value">{{ paymentDetails.planName }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Facturation :</span>
          <span class="value">{{ paymentDetails.billing === 'monthly' ? 'Mensuelle' : 'Annuelle' }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Montant :</span>
          <span class="value">{{ paymentDetails.amount }}€</span>
        </div>
      </div>

      <div class="success-actions">
        <button @click="goToDashboard" class="btn-primary">
          Accéder au tableau de bord
        </button>
        <button @click="goToHome" class="btn-secondary">
          Retour à l'accueil
        </button>
      </div>

      <div class="next-steps">
        <h4>Prochaines étapes :</h4>
        <ul>
          <li>Consultez votre email pour la confirmation de paiement</li>
          <li>Explorez toutes les fonctionnalités de votre plan</li>
          <li>Configurez votre profil et vos préférences</li>
          <li>Invitez vos collègues si votre plan le permet</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import stripeService from '../services/stripe.service'

export default {
  name: 'PaymentSuccess',
  data() {
    return {
      paymentDetails: null,
      isLoading: true
    }
  },
  async mounted() {
    await this.loadPaymentDetails()
  },
  methods: {
    async loadPaymentDetails() {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const sessionId = urlParams.get('session_id')
        const planId = urlParams.get('plan')
        const billing = urlParams.get('billing')

        if (sessionId) {
          // Récupérer les détails de la session Stripe
          const session = await stripeService.getCheckoutSession(sessionId)
          this.paymentDetails = {
            planName: this.getPlanName(planId),
            billing: billing,
            amount: session.data.amount_total / 100, // Stripe retourne en centimes
            sessionId: sessionId
          }
        } else {
          // Fallback si pas de session_id
          this.paymentDetails = {
            planName: this.getPlanName(planId),
            billing: billing,
            amount: 'N/A'
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement des détails de paiement:', error)
      } finally {
        this.isLoading = false
      }
    },

    getPlanName(planId) {
      const plans = {
        '1': 'Starter',
        '2': 'Professional', 
        '3': 'Enterprise'
      }
      return plans[planId] || 'Plan sélectionné'
    },

    goToDashboard() {
      this.$router.push('/dashboard')
    },

    goToHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.payment-success {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: var(--spacing-lg);
}

.success-container {
  background: white;
  padding: var(--spacing-xxl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.success-icon {
  margin-bottom: var(--spacing-xl);
}

.success-title {
  font-size: 2.5rem;
  font-weight: var(--font-weight-black);
  color: var(--landing-color-text);
  margin-bottom: var(--spacing-md);
}

.success-subtitle {
  font-size: 1.25rem;
  color: var(--text-color);
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
}

.payment-details {
  background: #f8f9fa;
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-xl);
  text-align: left;
}

.payment-details h3 {
  margin-bottom: var(--spacing-md);
  color: var(--landing-color-text);
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid #e9ecef;
}

.detail-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: 500;
  color: var(--text-color);
}

.value {
  font-weight: 600;
  color: var(--landing-color-text);
}

.success-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
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
  background: transparent;
  color: var(--landing-color-text);
  border: 2px solid #e9ecef;
}

.btn-secondary:hover {
  border-color: var(--landing-color-primary);
  color: var(--landing-color-primary);
}

.next-steps {
  text-align: left;
  background: #f0f9ff;
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
}

.next-steps h4 {
  color: var(--landing-color-text);
  margin-bottom: var(--spacing-md);
}

.next-steps ul {
  list-style: none;
  padding: 0;
}

.next-steps li {
  padding: var(--spacing-xs) 0;
  position: relative;
  padding-left: var(--spacing-lg);
}

.next-steps li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--landing-color-primary);
  font-weight: bold;
}

@media (max-width: 768px) {
  .success-container {
    padding: var(--spacing-lg);
  }
  
  .success-title {
    font-size: 2rem;
  }
  
  .success-actions {
    flex-direction: column;
  }
  
  .btn-primary, .btn-secondary {
    width: 100%;
  }
}
</style> 