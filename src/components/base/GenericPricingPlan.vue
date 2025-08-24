<template>
  <div class="pricing-plans">
    <div v-if="title" class="pricing-header">
      <h2 class="pricing-title">{{ title }}</h2>
      <p v-if="subtitle" class="pricing-subtitle">{{ subtitle }}</p>
    </div>

    <div class="pricing-grid">
      <div v-for="(plan, index) in plans" :key="plan.id || index" :class="[
        'pricing-card',
        { 'pricing-card--popular': plan.popular },
        { 'pricing-card--current': plan.isCurrentPlan }
      ]">
        <!-- Badge populaire -->
        <div v-if="plan.popular && !plan.isCurrentPlan" class="pricing-badge">
          {{ plan.popularText || 'Le plus populaire' }}
        </div>

        <!-- Badge plan actuel -->
        <div v-if="plan.isCurrentPlan" class="pricing-badge pricing-badge--current">
          Plan actuel
        </div>

        <!-- En-tête du plan -->
        <div class="pricing-card-header">
          <div v-if="plan.icon" class="pricing-icon">
            <component :is="plan.icon" :size="48" />
          </div>
          <h3 class="pricing-plan-name">{{ plan.name }}</h3>
          <p v-if="plan.description" class="pricing-plan-description">
            {{ plan.description }}
          </p>
        </div>

        <!-- Prix -->
        <div class="pricing-price">
          <div class="pricing-price-main">
            <span class="pricing-currency">{{ plan.currency || '€' }}</span>
            <span class="pricing-amount">{{ plan.price }}</span>
            <span v-if="plan.period" class="pricing-period">/ {{ plan.period }}</span>
          </div>
          <div v-if="plan.originalPrice" class="pricing-original-price">
            {{ plan.currency || '€' }}{{ plan.originalPrice }}
          </div>
        </div>

        <!-- Fonctionnalités -->
        <div class="pricing-features">
          <ul class="pricing-features-list">
            <li v-for="(feature, featureIndex) in plan.features" :key="featureIndex" class="pricing-feature">
              <span class="pricing-feature-icon">
                <Check v-if="feature.included !== false" :size="16" />
                <X v-else :size="16" />
              </span>
              <span class="pricing-feature-text">{{ feature.text || feature }}</span>
            </li>
          </ul>
        </div>

        <!-- Bouton d'action -->
        <div class="pricing-action">
          <GenericButton :variant="getButtonVariant(plan)" size="lg" class="pricing-button"
            @click="handlePlanSelect(plan)">
            {{ plan.buttonText || getButtonText(plan) }}
          </GenericButton>
        </div>

        <!-- Informations supplémentaires -->
        <div v-if="plan.note" class="pricing-note">
          {{ plan.note }}
        </div>
      </div>
    </div>

    <!-- Section FAQ ou informations -->
    <div v-if="$slots.footer" class="pricing-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import GenericButton from './GenericButton.vue'
import { Check, X, Rocket, Star, Crown } from 'lucide-vue-next'

export default {
  name: 'GenericPricingPlan',
  components: {
    GenericButton,
    Check,
    X,
    Rocket,
    Star,
    Crown
  },
  emits: ['plan-selected'],
  props: {
    title: {
      type: String,
      default: 'Choisissez votre plan'
    },
    subtitle: {
      type: String,
      default: ''
    },
    themeColor: {
      type: String,
      default: '#3b82f6' // Couleur par défaut (bleu)
    },
    plans: {
      type: Array,
      default: () => [
        {
          id: 'basic',
          name: 'Basic',
          description: 'Parfait pour commencer',
          icon: 'Rocket',
          price: '9',
          period: 'mois',
          currency: '€',
          features: [
            'Jusqu\'à 5 projets',
            '10 GB de stockage',
            'Support par email',
            'Tableau de bord basique'
          ],
          buttonText: 'Commencer gratuitement',
          note: 'Aucune carte de crédit requise'
        },
        {
          id: 'pro',
          name: 'Pro',
          description: 'Pour les équipes en croissance',
          icon: 'Star',
          price: '29',
          originalPrice: '39',
          period: 'mois',
          currency: '€',
          popular: true,
          popularText: 'Le plus populaire',
          features: [
            'Projets illimités',
            '100 GB de stockage',
            'Support prioritaire',
            'Analyses avancées',
            'Intégrations API',
            'Collaboration d\'équipe'
          ],
          buttonText: 'Essayer Pro',
          note: '14 jours d\'essai gratuit'
        },
        {
          id: 'premium',
          name: 'Premium',
          description: 'Pour les grandes entreprises',
          icon: 'Crown',
          price: '99',
          period: 'mois',
          currency: '€',
          features: [
            'Tout du plan Pro',
            'Stockage illimité',
            'Support dédié 24/7',
            'Sécurité avancée',
            'Rapports personnalisés',
            'Formation incluse',
            'SLA garanti'
          ],
          buttonText: 'Contacter les ventes',
          note: 'Tarifs personnalisés disponibles'
        }
      ]
    }
  },
  methods: {
    handlePlanSelect(plan) {
      this.$emit('plan-selected', plan)
    },
    getButtonVariant(plan) {
      if (plan.isCurrentPlan) {
        return 'primary';
      }
      return plan.popular ? 'custom' : 'outline';
    },
    getButtonText(plan) {
      if (plan.isCurrentPlan) {
        return 'Gérer mon abonnement';
      }
      return 'Choisir ce plan';
    }
  }
}
</script>

<style scoped>
.pricing-card--popular .generic-btn--lg {
  background: var(--landing-color-primary);
  color: white;
}

.pricing-plans {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.pricing-header {
  text-align: center;
  margin-bottom: var(--spacing-xxl);
}

.pricing-title {
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-extrabold);
  color: var(--text-surface);
  /* margin-bottom: var(--spacing-sm); */
}

.pricing-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-color);
  margin: 0;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.pricing-card {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: var(--spacing-xl);
  padding-bottom: var(--spacing-xs);
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-soft);
}

.pricing-card--popular {
  border-color: v-bind(themeColor);
  border-width: 2px;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15);
}

.pricing-card--current {
  border-color: #10b981;
  border-width: 2px;
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.15);
  background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
}

.pricing-card--current .pricing-action button {
  background-color: #10b981;
}

.pricing-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: v-bind(themeColor);
  color: white;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-xs);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  white-space: nowrap;
}

.pricing-badge--current {
  background: #10b981;
  color: white;
}

.pricing-card-header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.pricing-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--spacing-sm);
  color: v-bind(themeColor);
}

.pricing-plan-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-extrabold);
  color: var(--text-surface);
  margin: 0 0 var(--spacing-xs) 0;
}

.pricing-plan-description {
  color: var(--text-color);
  margin: 0;
  font-size: var(--font-size-md);
}

.pricing-price {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.pricing-price-main {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}

.pricing-currency {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-surface);
}

.pricing-amount {
  font-size: 3rem;
  font-weight: var(--font-weight-extrabold);
  color: var(--text-surface);
  line-height: 1;
}

.pricing-period {
  font-size: var(--font-size-md);
  color: var(--text-color);
  font-weight: var(--font-weight-medium);
}

.pricing-original-price {
  text-decoration: line-through;
  color: var(--text-color);
  font-size: var(--font-size-sm);
}

.pricing-features {
  flex: 1;
  margin-bottom: var(--spacing-lg);
}

.pricing-features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pricing-feature {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.pricing-feature:last-child {
  margin-bottom: 0;
}

.pricing-feature-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  /* color: #10b981; */
}

.pricing-feature-icon svg {
  color: inherit;
}

.pricing-feature-text {
  color: var(--text-surface);
  line-height: 1.5;
}

.pricing-action {
  margin-bottom: var(--spacing-md);
}

.pricing-button {
  width: 100%;
  justify-content: center;
  font-size: var(--font-size-md);
}

/* Styles pour le bouton personnalisé avec la couleur du thème */
:deep(.pricing-button.btn--custom) {
  background-color: v-bind(themeColor);
  border-color: v-bind(themeColor);
  color: white;
}

:deep(.pricing-button.btn--custom:hover) {
  background-color: v-bind('`${themeColor}dd`');
  border-color: v-bind('`${themeColor}dd`');
  transform: translateY(-2px);
}

.pricing-note {
  text-align: center;
  font-size: var(--font-size-xs);
  color: var(--text-color);
  font-style: italic;
  margin-bottom: var(--spacing-sm);
}

.pricing-footer {
  text-align: center;
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--border-color);
}

/* Responsive */
@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }

  .pricing-card {
    padding: var(--spacing-lg);
  }

  .pricing-amount {
    font-size: 2.5rem;
  }

  .pricing-plans {
    padding: var(--spacing-md);
  }
}

/* Desktop: 3 plans sur la même ligne */
@media (min-width: 1024px) {
  .pricing-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .pricing-card--popular {
    transform: scale(1.04);
  }

  .pricing-card--popular:hover {
    transform: scale(1.05) translateY(-4px);
  }

  .pricing-card--current {
    transform: scale(1.02);
  }

  .pricing-card--current:hover {
    transform: scale(1.03) translateY(-2px);
  }
}

/* Tablette: 2 plans par ligne */
@media (min-width: 769px) and (max-width: 1023px) {
  .pricing-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>