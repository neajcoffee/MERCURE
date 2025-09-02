<template>
  <section id="pricing" class="pricing-section">
    <div class="pricing-container">
      <div class="landing-header-section">
        <h2 class="landing-section-title">
          Plans <span class="landing-section-title-highlight">tarifaires</span> simples
        </h2>
        <p class="landing-section-subtitle">
          Choisissez le plan qui correspond le mieux à vos besoins
        </p>
      </div>

      <div class="pricing-toggle-container">
        <h4 class="toggle-label">Facturation</h4>
        <div class="pricing-toggle">
          <button class="toggle-btn" :class="{ 'toggle-btn--active': billingCycle === 'monthly' }"
            @click="billingCycle = 'monthly'">
            Mensuel
          </button>
          <button class="toggle-btn" :class="{ 'toggle-btn--active': billingCycle === 'yearly' }"
            @click="billingCycle = 'yearly'">
            Annuel
            <span class="discount-badge">-20%</span>
          </button>
        </div>
      </div>

      <GenericPricingPlan class="pricing-plans" title="" subtitle="" :plans="formattedPlans" theme-color="var(--landing-color-primary)"
        @plan-selected="handlePlanSelection">
        <!-- <template #footer> -->
          <!-- <div class="pricing-note">
            <p>
              * Faut trouver un truc à dire ici.
            </p>
          </div> -->
        <!-- </template> -->
      </GenericPricingPlan>

      <!-- Loader overlay -->
      <div v-if="isProcessingPayment" class="checkout-loader-overlay">
        <div class="checkout-loader">
          <div class="spinner"></div>
          <p>Préparation de votre paiement...</p>
          <small>Redirection vers Stripe dans quelques secondes</small>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GenericPricingPlan from './base/GenericPricingPlan.vue'
import stripeService from '../services/stripe.service'
import { subscriptionService } from '../services/subscription.service'

export default {
  name: 'PricingSection',
  components: {
    GenericPricingPlan
  },
  data() {
    return {
      billingCycle: 'monthly',
      isProcessingPayment: false,
      plans: [
        {
          "_id": "68a986b8f0b2d383c9fbf990",
          "name": "Mercure Basic",
          "description": "Abonnement au thème Mercure pour 1 boutiques Shopify.",
          "active": true,
          "createdAt": "2025-08-03T11:55:07.120Z",
          "updatedAt": "2025-08-03T14:54:18.996Z",
          "__v": 0,
          "features": [
            "1 licence",
            "Toutes les fonctionnalités incluses",
            "Mises à jour du thème",
            "10% sur Trendtrack",
            "Lancez votre boutique pour 1€/mois",
            "To-do list pour démarrer l'e-commerce"
          ],
          "max_licenses": 1,
          "popular": false,
          "popularText": "Populaire",
          // "stripe_product_id": "prod_SgvgSKQA6ZVNwh",
          "stripe_product_id": "prod_SgvhBRsZwHf0kH",
          "monthlyPrice": 19.99,
          "yearlyPrice": 203.89,
          "ctaText": "Commencez",
          "note": "Sans engagement"
        },
        {
          "_id": "68a986def0b2d383c9fbf992",
          "name": "Mercure Scale",
          "description": "Abonnement au thème Mercure pour 3 licenses.",
          "active": true,
          "createdAt": "2025-08-03T11:55:11.823Z",
          "updatedAt": "2025-08-03T14:54:29.199Z",
          "__v": 0,
          "max_licenses": 3,
          "popular": true,
          "popularText": "Le plus populaire",
          "features": [
            "3 licences",
            "Toutes les fonctionnalités incluses",
            "10% sur Trendtrack",
            "Lancez votre boutique pour 1€/mois",
            "To-do list pour démarrer l'e-commerce",
            "Top boutique du moment"
          ],
          "stripe_product_id": "prod_SgvhBRsZwHf0kH",
          "monthlyPrice": 39.99,
          "yearlyPrice": 407.89,
          "ctaText": "Commencez",
          "note": "Sans engagement"
        },
        {
          "_id": "68a98700f0b2d383c9fbf994",
          "name": "Mercure Business",
          "description": "abonnement mensuel au thème Mercure. licenses illimitées",
          "active": true,
          "createdAt": "2025-08-03T11:55:14.163Z",
          "updatedAt": "2025-08-03T14:54:39.037Z",
          "__v": 0,
          "max_licenses": 10,
          "features": [
            "10 licences",
            "Toutes les fonctionnalités incluses",
            "Mises à jour du thème",
            "10% sur Trendtrack",
            "Lancez votre boutique pour 1€/mois",
            "To-do list pour démarrer l'e-commerce",
            "Top boutique du moment",
            "SAV prioritaire"
          ],
          "popular": false,
          "popularText": "Populaire",
          "yearlyPrice": 815.89,
          "ctaText": "Commencez",
          "note": "Sans engagement",
          "monthlyPrice": 79.99,
          "stripe_product_id": "prod_Sgvh8QqnVOoktx"
        }
      ]
    }
  },
  created() {
    this.fetchPlans()
  },
  computed: {
    formattedPlans() {
      return this.plans.map(plan => ({
        id: plan._id,
        prod_id: plan.stripe_product_id,
        name: plan.name,
        description: plan.description,
        price: this.billingCycle === 'monthly'
          ? String(plan.monthlyPrice)
          : String(plan.yearlyPrice),
        period: this.billingCycle === 'monthly' ? 'mois' : 'an',
        currency: '€',
        popular: plan.popular,
        popularText: plan.popularText || 'Recommandé',
        features: plan.features || [],
        buttonText: plan.ctaText || 'Choisir ce plan',
        note: plan.note,
      }))
    }
  },
  methods: {
    async fetchPlans() {
      try {
        const response = await subscriptionService.getAvailablePlans()
        const plans = Array.isArray(response) ? response : (response?.plans || response?.data || [])
        console.log(plans)
        this.plans = plans
      } catch (err) {
        console.error(err)
        if (this.$toast) {
          this.$toast.error('Impossible de charger les plans pour le moment.')
        }
      }
    },
    async handlePlanSelection(plan) {
      try {
        this.isProcessingPayment = true;

        // Envoie seulement l'intention: planId + billingCycle (pas le priceId)
        const session = await stripeService.createCheckoutSession({
          plan_id: plan.id || plan._id,
          prod_id: plan.prod_id || plan.stripe_product_id,
          billingCycle: this.billingCycle, // 'monthly' | 'yearly'
          successUrl: `${window.location.origin}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/payment/cancel`,
        });

        window.location.href = session.data.url;
      } catch (err) {
        console.error(err);
        this.handlePaymentError(err);
      } finally {
        this.isProcessingPayment = false;
      }
    },
    handlePaymentError(error) {
      // Gestion des erreurs de paiement
      let errorMessage = 'Une erreur est survenue lors du traitement du paiement.'

      if (error.message) {
        errorMessage = error.message
      }

      // Afficher une notification d'erreur (à adapter selon votre système de notifications)
      if (this.$toast) {
        this.$toast.error(errorMessage)
      } else {
        alert(errorMessage)
      }
    }
  }
}
</script>

<style scoped>
.pricing-section {
  padding: var(--spacing-xxl) 0;
  /* background: white; */
}

.pricing-container {
  max-width: 1200px;
  margin: 0 auto;
  /* padding: 0 var(--spacing-lg); */
}

.pricing-header {
  text-align: center;
  margin-bottom: var(--spacing-xxl);
}

.pricing-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--font-weight-black);
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.pricing-title-highlight {
  /* background: linear-gradient(135deg, #667eea, #764ba2); */
  background: linear-gradient(to right, var(--landing-color-primary),
      color-mix(in srgb, var(--landing-color-primary) 80%, #000000));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pricing-subtitle {
  font-size: 1.25rem;
  color: var(--text-color);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.pricing-toggle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  background-color: #ffffff12;
  /* border: dashed 1px var(--landing-color-accent); */
  width: max-content;
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  margin: auto;
  margin-bottom: var(--spacing-xl);
}

.pricing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffffc7;
  padding: var(--spacing-xs);
  border-radius: var(--radius-xs);
}

.pricing-plans {
  background-color: #ffffff12;
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
}


.toggle-label {
  font-weight: 500;
  color: var(--landing-color-accent);
  margin-right: var(--spacing-md);
}

.toggle-btn {
  padding: var(--spacing-xs) var(--spacing-xl);
  border: none;
  background: transparent;
  border-radius: var(--radius-xs);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
}

.toggle-btn--active {
  background: white;
  color: var(--landing-color-text);
  box-shadow: var(--shadow-soft);
}

.discount-badge {
  position: absolute;
  top: -12px;
  right: -17px;
  background: var(--landing-color-primary);
  color: white;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: var(--radius-xs);
  font-weight: 600;
}

.pricing-note {
  text-align: center;
  color: var(--text-color);
  font-size: 0.875rem;
}

/* Styles pour le titre avec highlight */
:deep(.pricing-title) {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--font-weight-black);
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

:deep(.pricing-title-highlight) {
  background: linear-gradient(to right, var(--landing-color-primary),
      color-mix(in srgb, var(--landing-color-primary) 80%, #000000));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Styles pour le loader de checkout */
.checkout-loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.checkout-loader {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--spacing-xxl);
  text-align: center;
  box-shadow: var(--shadow-large);
  max-width: 400px;
  width: 90%;
}

.checkout-loader .spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--landing-color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto var(--spacing-lg);
}

.checkout-loader p {
  font-size: 1.125rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
}

.checkout-loader small {
  color: var(--text-color-light);
  font-size: 0.875rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    background-color: #ffffff12;
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
  }

  .pricing-toggle {
    flex-direction: row;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
  }

  .checkout-loader {
    padding: var(--spacing-xl);
    margin: var(--spacing-lg);
  }

  .checkout-loader .spinner {
    width: 50px;
    height: 50px;
  }
}
</style>