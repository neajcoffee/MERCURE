<template>
    <div class="subscription-container">

        <!-- Plans disponibles -->
        <div class="subscription-content">
            <div v-if="loading" class="subscription-loading">
                <div class="loading-spinner"></div>
                <p>Chargement des offres...</p>
            </div>
            <div v-else-if="error" class="subscription-error">
                <p>{{ error }}</p>
            </div>
            <div v-else class="subscription-available-plans">
                <GenericPricingPlan 
                    :plans="formattedPlans" title="Les Abonnements" subtitle="Changez votre abonnement en quelques clics"
                    @plan-selected="handlePlanSelection"
                />
            </div>
        </div>
    </div>
</template>

<script>
import GenericPricingPlan from './base/GenericPricingPlan.vue'
import { subscriptionService } from '@/services/subscription.service'

export default {
    name: 'Subscription',
    components: { GenericPricingPlan },
    data() {
        return {
            availableSubscriptions: [],
            currentSubscription: null,
            loading: false,
            error: null
        }
    },
    computed: {
        formattedPlans() {
            return this.availableSubscriptions.map(sub => {
                // Vérifier si c'est le plan actuel de l'utilisateur
                const isCurrentPlan = this.currentSubscription && 
                    this.currentSubscription.hasSubscription && 
                    this.currentSubscription.subscription.name === sub.name;
                
                return {
                    id: sub._id || sub.id,
                    name: sub.name,
                    description: sub.description || `Plan ${sub.name}`,
                    price: sub.price,
                    currency: '€',
                    period: 'mois',
                    popular: sub.popular || false,
                    popularText: sub.popularText || 'Le plus populaire',
                    features: sub.features,
                    buttonText: isCurrentPlan ? 'Gérer mon abonnement' : 'Choisir ce plan',
                    isCurrentPlan: isCurrentPlan,
                    max_licenses: sub.max_licenses,
                    duration_months: sub.duration_months
                };
            });
        }
    },
    methods: {
        handlePlanSelection(plan) {
            if (plan.isCurrentPlan) {
                console.log('Gestion de l\'abonnement actuel:', plan)
                // Ici tu peux ajouter la logique pour gérer l'abonnement actuel
                // Par exemple, ouvrir une modale de gestion ou rediriger vers une page de gestion
            } else {
                console.log('Plan sélectionné:', plan)
                // Ici tu peux ajouter la logique pour gérer la sélection d'un nouveau plan
                // Par exemple, rediriger vers une page de paiement ou ouvrir une modale
            }
        }
    },
    async mounted() {
        this.loading = true
        try {
            // Récupérer l'abonnement actuel et les abonnements disponibles en parallèle
            const [currentSub, availableSubs] = await Promise.all([
                subscriptionService.getCurrentSubscription(),
                subscriptionService.getAvailablePlans()
            ])
            this.currentSubscription = currentSub
            this.availableSubscriptions = availableSubs.plans
        } catch (e) {
            this.error = e?.message || 'Erreur lors du chargement des abonnements.'
        } finally {
            this.loading = false
        }
    },
}
</script>

<style scoped>
.subscription-container {
    max-width: 1200px;
    margin: 0 auto;
}

.subscription-header {
    text-align: center;
    margin-bottom: var(--spacing-xl);
}

.subscription-title {
    font-size: 2rem;
    font-weight: 800;
    color: var(--primary-color);
    margin-bottom: var(--spacing-sm);
}

.subscription-subtitle {
    font-size: var(--font-size-lg);
    color: var(--text-surface);
    margin: 0;
}

.subscription-content {
    display: flex;
    justify-content: center;
}

.subscription-available-plans {
    width: 100%;
}

.subscription-loading {
    text-align: center;
    padding: var(--spacing-xl);
    color: var(--primary-color);
}

.loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: var(--primary-color);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto var(--spacing-sm);
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.subscription-error {
    text-align: center;
    padding: var(--spacing-xl);
    color: #ef4444;
    background: #fef2f2;
    border-radius: var(--radius-md);
    border: 1px solid #fecaca;
}

/* Responsive */
@media (max-width: 768px) {
    .subscription-container {
        padding: var(--spacing-md);
    }
    
    .subscription-title {
        font-size: 1.5rem;
    }
    
    .subscription-subtitle {
        font-size: var(--font-size-md);
    }
}
</style>