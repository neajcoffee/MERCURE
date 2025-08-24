<template>
  <div class="component-showcase">
    <h1>Showcase des Composants Génériques</h1>
    
    <!-- Buttons Section -->
    <section class="showcase-section">
      <h2>Boutons (GenericButton)</h2>
      <div class="showcase-grid">
        <div class="showcase-item">
          <h4>Variantes</h4>
          <div class="showcase-buttons">
            <GenericButton variant="primary">Primary</GenericButton>
            <GenericButton variant="secondary">Secondary</GenericButton>
            <GenericButton variant="outline">Outline</GenericButton>
            <GenericButton variant="danger">Danger</GenericButton>
            <GenericButton variant="success">Success</GenericButton>
          </div>
        </div>
        <div class="showcase-item">
          <h4>Tailles</h4>
          <div class="showcase-buttons">
            <GenericButton size="sm">Small</GenericButton>
            <GenericButton size="md">Medium</GenericButton>
            <GenericButton size="lg">Large</GenericButton>
          </div>
        </div>
        <div class="showcase-item">
          <h4>États</h4>
          <div class="showcase-buttons">
            <GenericButton :loading="true">Loading</GenericButton>
            <GenericButton :disabled="true">Disabled</GenericButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Inputs Section -->
    <section class="showcase-section">
      <h2>Champs de saisie (GenericInput)</h2>
      <div class="showcase-grid">
        <div class="showcase-item">
          <GenericInput 
            v-model="inputValue1"
            label="Nom d'utilisateur"
            placeholder="Entrez votre nom"
            hint="Ce champ est obligatoire"
            :required="true"
          />
        </div>
        <div class="showcase-item">
          <GenericInput 
            v-model="inputValue2"
            type="email"
            label="Email"
            placeholder="exemple@email.com"
          />
        </div>
        <div class="showcase-item">
          <GenericInput 
            v-model="inputValue3"
            label="Champ avec erreur"
            placeholder="Champ invalide"
            error="Ce champ contient une erreur"
          />
        </div>
        <div class="showcase-item">
          <GenericInput 
            v-model="inputValue4"
            label="Champ désactivé"
            placeholder="Champ désactivé"
            :disabled="true"
          />
        </div>
      </div>
    </section>

    <!-- Cards Section -->
    <section class="showcase-section">
      <h2>Cartes (GenericCard)</h2>
      <div class="showcase-grid">
        <GenericCard variant="default">
          <template #header>
            <h3>Carte par défaut</h3>
          </template>
          <p>Contenu de la carte avec un style par défaut.</p>
          <template #footer>
            <GenericButton size="sm">Action</GenericButton>
          </template>
        </GenericCard>
        
        <GenericCard variant="elevated">
          <template #header>
            <h3>Carte élevée</h3>
          </template>
          <p>Cette carte a une ombre plus prononcée et un effet hover.</p>
        </GenericCard>
        
        <GenericCard variant="outlined">
          <template #header>
            <h3>Carte avec bordure</h3>
          </template>
          <p>Cette carte a une bordure mais pas d'ombre.</p>
        </GenericCard>
      </div>
    </section>

    <!-- Badges Section -->
    <section class="showcase-section">
      <h2>Badges (GenericBadge)</h2>
      <div class="showcase-grid">
        <div class="showcase-item">
          <h4>Variantes</h4>
          <div class="showcase-badges">
            <GenericBadge variant="primary">Primary</GenericBadge>
            <GenericBadge variant="secondary">Secondary</GenericBadge>
            <GenericBadge variant="success">Success</GenericBadge>
            <GenericBadge variant="warning">Warning</GenericBadge>
            <GenericBadge variant="danger">Danger</GenericBadge>
            <GenericBadge variant="info">Info</GenericBadge>
          </div>
        </div>
        <div class="showcase-item">
          <h4>Tailles</h4>
          <div class="showcase-badges">
            <GenericBadge size="sm">Small</GenericBadge>
            <GenericBadge size="md">Medium</GenericBadge>
            <GenericBadge size="lg">Large</GenericBadge>
          </div>
        </div>
      </div>
    </section>

    <!-- Alerts Section -->
    <section class="showcase-section">
      <h2>Alertes (GenericAlert)</h2>
      <div class="showcase-grid">
        <GenericAlert variant="info" title="Information" :dismissible="true">
          Ceci est une alerte d'information avec un titre et un bouton de fermeture.
        </GenericAlert>
        
        <GenericAlert variant="success" title="Succès">
          Opération réalisée avec succès !
        </GenericAlert>
        
        <GenericAlert variant="warning" title="Attention">
          Attention, cette action nécessite une confirmation.
        </GenericAlert>
        
        <GenericAlert variant="danger" title="Erreur">
          Une erreur s'est produite lors du traitement.
        </GenericAlert>
      </div>
    </section>

    <!-- Tables Section -->
    <section class="showcase-section">
      <h2>Tableaux (GenericTable)</h2>
      <div class="showcase-grid">
        <div class="showcase-item showcase-item--full">
          <h4>Tableau avec tri et pagination</h4>
          <GenericTable
            title="Liste des utilisateurs"
            :columns="tableColumns"
            :data="tableData"
            :loading="tableLoading"
            :striped="true"
            :pagination="true"
            :items-per-page="5"
          >
            <template #actions>
              <GenericButton size="sm" @click="refreshTable">
                Actualiser
              </GenericButton>
              <GenericButton size="sm" variant="outline">
                Exporter
              </GenericButton>
            </template>
            
            <template #cell-status="{ value }">
              <GenericBadge 
                :variant="value === 'actif' ? 'success' : 'secondary'"
                size="sm"
              >
                {{ value }}
              </GenericBadge>
            </template>
            
            <template #row-actions="{ row }">
              <GenericButton size="sm" variant="outline">
                Modifier
              </GenericButton>
              <GenericButton size="sm" variant="danger">
                Supprimer
              </GenericButton>
            </template>
          </GenericTable>
        </div>
        
        <div class="showcase-item showcase-item--full">
          <h4>Tableau vide</h4>
          <GenericTable
            title="Aucune donnée"
            :columns="tableColumns"
            :data="[]"
            :pagination="false"
          >
            <template #empty>
              <div style="text-align: center; padding: 2rem;">
                <span style="font-size: 3rem;">🔍</span>
                <p>Aucun utilisateur trouvé</p>
                <GenericButton size="sm">Ajouter un utilisateur</GenericButton>
              </div>
            </template>
          </GenericTable>
        </div>
      </div>
    </section>

    <!-- Pricing Plans Section -->
    <section class="showcase-section">
      <h2>Plans d'abonnement (GenericPricingPlan)</h2>
      <div class="showcase-grid">
        <div class="showcase-item showcase-item--full">
          <h4>Plans par défaut</h4>
          <GenericPricingPlan 
            title="Choisissez votre formule"
            subtitle="Des plans adaptés à tous vos besoins"
            @plan-selected="handlePlanSelection"
          />
        </div>
        
        <div class="showcase-item showcase-item--full">
          <h4>Plans personnalisés</h4>
          <GenericPricingPlan 
            title="Nos offres SaaS"
            subtitle="Solutions flexibles pour votre entreprise"
            :plans="customPlans"
            @plan-selected="handlePlanSelection"
          >
            <template #footer>
              <div style="margin-top: 2rem;">
                <h3>Questions fréquentes</h3>
                <p>🔒 Paiement sécurisé • 📞 Support 24/7 • 💯 Garantie satisfait ou remboursé</p>
              </div>
            </template>
          </GenericPricingPlan>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import GenericButton from './GenericButton.vue'
import GenericInput from './GenericInput.vue'
import GenericCard from './GenericCard.vue'
import GenericBadge from './GenericBadge.vue'
import GenericAlert from './GenericAlert.vue'
import GenericPricingPlan from './GenericPricingPlan.vue'
import GenericTable from './GenericTable.vue'
import { Sprout, Rocket, Building2 } from 'lucide-vue-next'

export default {
  name: 'ComponentShowcase',
  components: {
    GenericButton,
    GenericInput,
    GenericCard,
    GenericBadge,
    GenericAlert,
    GenericPricingPlan,
    GenericTable,
    Sprout,
    Rocket,
    Building2
  },
  data() {
    return {
      inputValue1: '',
      inputValue2: '',
      inputValue3: 'Valeur incorrecte',
      inputValue4: 'Valeur désactivée',
      tableLoading: false,
      tableColumns: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Nom', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'status', label: 'Statut', sortable: false },
        { key: 'createdAt', label: 'Date création', sortable: true, format: 'date' },
        { key: 'revenue', label: 'Revenus', sortable: true, format: 'currency' }
      ],
      tableData: [
        {
          id: 1,
          name: 'Marie Dupont',
          email: 'marie@example.com',
          status: 'actif',
          createdAt: '2024-01-15',
          revenue: 1250.50
        },
        {
          id: 2,
          name: 'Pierre Martin',
          email: 'pierre@example.com',
          status: 'inactif',
          createdAt: '2024-01-20',
          revenue: 890.25
        },
        {
          id: 3,
          name: 'Sophie Bernard',
          email: 'sophie@example.com',
          status: 'actif',
          createdAt: '2024-02-01',
          revenue: 2150.75
        },
        {
          id: 4,
          name: 'Jean Dubois',
          email: 'jean@example.com',
          status: 'actif',
          createdAt: '2024-02-10',
          revenue: 675.00
        },
        {
          id: 5,
          name: 'Alice Moreau',
          email: 'alice@example.com',
          status: 'inactif',
          createdAt: '2024-02-15',
          revenue: 1890.30
        },
        {
          id: 6,
          name: 'Paul Leroy',
          email: 'paul@example.com',
          status: 'actif',
          createdAt: '2024-02-20',
          revenue: 3200.80
        }
      ],
      customPlans: [
        {
          id: 'starter',
          name: 'Starter',
          description: 'Idéal pour les freelances',
          icon: 'Sprout',
          price: '15',
          period: 'mois',
          currency: '€',
          features: [
            '3 projets actifs',
            '5 GB de stockage',
            'Support par email',
            'Exports PDF'
          ],
          buttonText: 'Commencer',
          note: '7 jours gratuits'
        },
        {
          id: 'business',
          name: 'Business',
          description: 'Pour les équipes performantes',
          icon: 'Rocket',
          price: '49',
          originalPrice: '69',
          period: 'mois',
          currency: '€',
          popular: true,
          popularText: 'Recommandé',
          features: [
            'Projets illimités',
            '50 GB de stockage',
            'Support prioritaire',
            'API complète',
            'Analytics avancées',
            { text: 'Intégrations Slack/Teams', included: true },
            { text: 'White-label', included: false }
          ],
          buttonText: 'Essayer Business',
          note: '30 jours d\'essai gratuit'
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          description: 'Solutions sur mesure',
          icon: 'Building2',
          price: 'Sur devis',
          currency: '',
          features: [
            'Tout du plan Business',
            'Stockage illimité',
            'Support dédié',
            'Sécurité renforcée',
            'Formations incluses',
            'SLA personnalisé',
            'Déploiement on-premise'
          ],
          buttonText: 'Nous contacter',
          note: 'Devis personnalisé sous 24h'
        }
      ]
    }
  },
  methods: {
    refreshTable() {
      this.tableLoading = true
      setTimeout(() => {
        this.tableLoading = false
      }, 1500)
    },
    handlePlanSelection(plan) {
      alert(`Plan sélectionné: ${plan.name} (${plan.id})`)
    }
  }
}
</script>

<style scoped>
.component-showcase {
  padding: var(--spacing-lg, 1.5rem);
  max-width: 1200px;
  margin: 0 auto;
}

.component-showcase h1 {
  text-align: center;
  margin-bottom: var(--spacing-xl, 2rem);
  color: #1f2937;
}

.showcase-section {
  margin-bottom: var(--spacing-xxl, 3rem);
}

.showcase-section h2 {
  margin-bottom: var(--spacing-lg, 1.5rem);
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: var(--spacing-sm, 0.75rem);
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg, 1.5rem);
  margin-bottom: var(--spacing-lg, 1.5rem);
}

.showcase-item {
  padding: var(--spacing-md, 1rem);
  border: 1px solid #e5e7eb;
  border-radius: var(--radius-xs, 8px);
  background: #f9fafb;
}

.showcase-item h4 {
  margin: 0 0 var(--spacing-md, 1rem) 0;
  color: #4b5563;
}

.showcase-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm, 0.75rem);
}

.showcase-badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm, 0.75rem);
}

@media (max-width: 768px) {
  .showcase-grid {
    grid-template-columns: 1fr;
  }
  
  .showcase-buttons {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style> 