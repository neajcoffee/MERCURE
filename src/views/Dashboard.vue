<template>
  <div class="dashboard-container">
    <!-- Sidebar avec split-view intégré -->
    <Sidebar :open="sidebarOpen" :isMobile="isMobile" :selectedTab="selectedTab"
      @update:selectedTab="selectedTab = $event" @toggle="toggleSidebar" @close="closeSidebar">
      <template #logo>
        <img src="/mercure-logo.png" alt="Logo" class="sidebar-logo-img" />
      </template>
      <template #navigation>

        <!-- Accueil -->
        <!-- <button class="sidebar-nav-btn" :class="{ 'sidebar-nav-btn--active': selectedTab === 'accueil' }"
          @click="selectedTab = 'accueil'">
          <Home class="sidebar-nav-icon" :size="20" />
          <span class="sidebar-nav-label">Accueil</span>
        </button> -->

        <!-- Tableau de bord -->
        <!-- <button class="sidebar-nav-btn" :class="{ 'sidebar-nav-btn--active': selectedTab === 'dashboard' }"
          @click="selectedTab = 'dashboard'">
          <BarChart3 class="sidebar-nav-icon" :size="20" />
          <span class="sidebar-nav-label">Tableau de bord</span>
        </button> -->

        <!-- Licences -->
        <button class="sidebar-nav-btn" :class="{ 'sidebar-nav-btn--active': selectedTab === 'licences' }"
          @click="selectedTab = 'licences'">
          <Key class="sidebar-nav-icon" :size="20" />
          <span class="sidebar-nav-label">Licences</span>
        </button>

        <!-- Thèmes -->
        <button class="sidebar-nav-btn" :class="{ 'sidebar-nav-btn--active': selectedTab === 'themes' }"
          @click="selectedTab = 'themes'">
          <Palette class="sidebar-nav-icon" :size="20" />
          <span class="sidebar-nav-label">Thème</span>
        </button>

        <!-- Composants -->
        <!-- <button class="sidebar-nav-btn" :class="{ 'sidebar-nav-btn--active': selectedTab === 'composants' }"
          @click="selectedTab = 'composants'">
          <Package class="sidebar-nav-icon" :size="20" />
          <span class="sidebar-nav-label">Composants</span>
        </button> -->

        <!-- Mon abonnement -->
        <button class="sidebar-nav-btn" :class="{ 'sidebar-nav-btn--active': selectedTab === 'subscription' }"
          @click="selectedTab = 'subscription'">
          <Zap class="sidebar-nav-icon" :size="20" />
          <span class="sidebar-nav-label">Abonnement</span>
        </button>

      </template>

      <!-- Links -->
      <template #links>
        <!-- <button class="sidebar-link">Obtenir 1 mois gratuit</button>
        Demande de fonctionnalité -->
      </template>
      
      <!-- Upgrade -->
      <template #upgrade>
        <span class="sidebar-upgrade-label">
          <Zap :size="18" style="vertical-align: middle; margin-right: 6px; color: #323232;" />
          Upgrade Plan
        </span>
      </template>

      <!-- User -->
      <template #user>
        <div class="sidebar-user-avatar">
          {{ currentUser?.first_name?.charAt(0).toUpperCase() || 'U' }}
        </div>
        <div class="sidebar-user-info">
          <div class="sidebar-user-name" style="display: flex; align-items: center; gap: 8px;">
            {{ currentUser?.first_name || 'Utilisateur' }}
            <!-- Bouton 3 points -->
            <button class="user-menu-btn" @click="toggleUserMenu" aria-label="Ouvrir le menu utilisateur">
              <MoreVertical :size="20" />
              <div v-if="userMenuOpen" class="user-menu-dropdown">
                <button class="user-menu-item" @click.stop="openUserProfile()">
                  <UserRoundCog class="user-menu-icon" :size="18" />
                  Profil
                </button>
                <button class="user-menu-item" @click.stop="logout()">
                  <LogOut class="user-menu-icon" :size="18" />
                  Se déconnecter
                </button>
              </div>
            </button>
            <!-- Menu flottant -->
          </div>
          <div class="sidebar-user-email">{{ currentUser?.email || '' }}</div>
        </div>
      </template>

    </Sidebar>


    <!-- Contenu principal ------------------------------------------------------------>
    <div class="main-content" :class="mainContentClasses">
      <!-- <GenericPanel v-if="selectedTab === 'accueil'">
        <template #header>
          <h2 class="generic-panel-title">Dashboard Shopify</h2>
          <p>Vue d'ensemble de vos licences et boutiques Shopify</p>
        </template>

        <div class="stats-grid">
          <GenericCard variant="elevated">
            <template #header>
              <div class="stat-header">
                <span class="stat-icon">🏪</span>
                <h3>Boutiques actives</h3>
              </div>
            </template>
            <div class="stat-content">
              <div class="stat-number">{{ dashboardStats.activeShops }}</div>
              <div class="stat-growth success">+{{ dashboardStats.newShopsThisMonth }} ce mois</div>
            </div>
          </GenericCard>

          <GenericCard variant="elevated">
            <template #header>
              <div class="stat-header">
                <span class="stat-icon">🔑</span>
                <h3>Licences totales</h3>
              </div>
            </template>
            <div class="stat-content">
              <div class="stat-number">{{ dashboardStats.totalLicenses }}</div>
              <div class="stat-growth warning">{{ dashboardStats.expiringLicenses }} expirent bientôt</div>
            </div>
          </GenericCard>

          <GenericCard variant="elevated">
            <template #header>
              <div class="stat-header">
                <span class="stat-icon">💰</span>
                <h3>Revenus mensuels</h3>
              </div>
            </template>
            <div class="stat-content">
              <div class="stat-number">{{ formatCurrency(dashboardStats.monthlyRevenue) }}</div>
              <div class="stat-growth success">+{{ dashboardStats.revenueGrowth }}% vs dernier mois</div>
            </div>
          </GenericCard>

          <GenericCard variant="elevated">
            <template #header>
              <div class="stat-header">
                <span class="stat-icon">📊</span>
                <h3>Taux de conversion</h3>
              </div>
            </template>
            <div class="stat-content">
              <div class="stat-number">{{ dashboardStats.conversionRate }}%</div>
              <div class="stat-growth" :class="dashboardStats.conversionTrend">{{ dashboardStats.conversionChange }}% ce
                mois</div>
            </div>
          </GenericCard>
        </div>

        <div class="alerts-section" v-if="alerts.length > 0">
          <h3>Alertes importantes</h3>
          <GenericAlert v-for="alert in alerts" :key="alert.id" :variant="alert.type" :title="alert.title">
            {{ alert.message }}
          </GenericAlert>
        </div>

        <div class="recent-activity">
          <h3>Activité récente</h3>
          <GenericCard>
            <div class="activity-list">
              <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
                <span class="activity-icon">{{ activity.icon }}</span>
                <div class="activity-content">
                  <div class="activity-text">{{ activity.text }}</div>
                  <div class="activity-time">{{ formatTime(activity.timestamp) }}</div>
                </div>
                <GenericBadge :variant="activity.badgeVariant" size="sm">
                  {{ activity.badge }}
                </GenericBadge>
              </div>
            </div>
          </GenericCard>
        </div>
      </GenericPanel> -->

      <!-- Panel Licences -->
      <GenericPanel v-if="selectedTab === 'licences'">
        <template #header>
          <h2 class="generic-panel-title">Gestion des licences</h2>
          <p>Administration complète des licences Shopify, statuts, renouvellements et configurations.</p>
        </template>

        <!-- Actions rapides -->
        <!-- <div class="license-actions">
          <GenericButton variant="primary" @click="createNewLicense">
            + Nouvelle licence
          </GenericButton>
          <GenericButton variant="outline" @click="refreshLicenses">
            🔄 Actualiser
          </GenericButton>
          <GenericButton variant="outline" @click="exportLicenses">
            📊 Exporter
          </GenericButton>
        </div> -->

        <Licenses />
      </GenericPanel>

      <!-- Panel Composants -->
      <!-- <GenericPanel v-if="selectedTab === 'composants'">
        <template #header>
          <h2 class="generic-panel-title">Showcase des Composants</h2>
        </template>
        <ComponentShowcase />
      </GenericPanel> -->

      <!-- Panel Thèmes -->
      <GenericPanel v-if="selectedTab === 'themes'">
        <template #header>
          <h2 class="generic-panel-title">Thèmes disponibles</h2>
          <p>Parcourez et téléchargez les thèmes pour votre boutique.</p>
        </template>
        <Themes />
      </GenericPanel>

      <!-- Panel Profil -->
      <GenericPanel v-if="selectedTab === 'profil'">
        <template #header>
          <h2 class="generic-panel-title">Mon profil</h2>
          <p>Gérez vos informations personnelles et votre abonnement</p>
        </template>
        <Profile />
      </GenericPanel>

      <!-- Panel Abonnement -->
      <GenericPanel v-if="selectedTab === 'subscription'">
        <template #header>
          <h2 class="generic-panel-title">Mon abonnement</h2>
        </template>
        <Subscription />
      </GenericPanel>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseButton from '../components/base/BaseButton.vue'
import Sidebar from '../components/base/sidebar.vue'
import GenericPanel from '../components/base/GenericPanel.vue'
import GenericCard from '../components/base/GenericCard.vue'
import GenericBadge from '../components/base/GenericBadge.vue'
import GenericAlert from '../components/base/GenericAlert.vue'
import GenericButton from '../components/base/GenericButton.vue'
import ComponentShowcase from '../components/base/ComponentShowcase.vue'
import Licenses from '../components/Licenses.vue'
import Themes from '../components/Themes.vue'
import Subscription from '../components/Subscription.vue'
import Profile from '../components/Profile.vue'
import { Home, BarChart3, Key, Palette, Package, MoreVertical, Settings, LogOut, Zap, UserRoundCog } from 'lucide-vue-next'

// Utilitaire de debounce
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default {
  name: 'Dashboard',
  components: {
    BaseButton,
    Sidebar,
    GenericPanel,
    GenericCard,
    GenericBadge,
    GenericAlert,
    GenericButton,
    ComponentShowcase,
    Licenses,
    Themes,
    Subscription,
    Profile,
    Home,
    BarChart3,
    Key,
    Palette,
    Package,
    MoreVertical,
    Settings,
    LogOut,
    Zap,
    UserRoundCog
  },
  data() {
    return {
      selectedTab: 'licences',
      sidebarOpen: true,
      isMobile: false,

      // Statistiques du dashboard principal
      dashboardStats: {
        activeShops: 127,
        newShopsThisMonth: 12,
        totalLicenses: 89,
        expiringLicenses: 7,
        monthlyRevenue: 24580,
        revenueGrowth: 15.8,
        conversionRate: 8.4,
        conversionChange: 2.3,
        conversionTrend: 'success'
      },

      // Statistiques détaillées pour l'onglet analytics
      detailedStats: {
        uptime: 99.9,
        apiResponseTime: 145,
        customerSatisfaction: 4.7
      },

      // Répartition par plan
      planDistribution: [
        { name: 'Basic', count: 45, percentage: 50.6, color: '#10b981' },
        { name: 'Pro', count: 32, percentage: 36.0, color: '#3b82f6' },
        { name: 'Enterprise', count: 12, percentage: 13.4, color: '#8b5cf6' }
      ],

      // Données pour le graphique
      chartData: {
        newLicenses: 23,
        renewals: 18,
        cancellations: 4
      },

      // Top boutiques
      topShops: [
        { domain: 'boutique-mode.myshopify.com', theme: 'Dawn Premium', status: 'active', revenue: 8420 },
        { domain: 'tech-store.myshopify.com', theme: 'Impulse', status: 'active', revenue: 7280 },
        { domain: 'handmade-crafts.myshopify.com', theme: 'Debut', status: 'active', revenue: 5940 },
        { domain: 'fitness-gear.myshopify.com', theme: 'Brooklyn', status: 'active', revenue: 4650 },
        { domain: 'vintage-books.myshopify.com', theme: 'Narrative', status: 'active', revenue: 3820 }
      ],

      // Alertes importantes
      alerts: [
        {
          id: 1,
          type: 'warning',
          title: 'Licences expirantes',
          message: '7 licences expireront dans les 7 prochains jours. Contactez les clients pour le renouvellement.'
        },
        {
          id: 2,
          type: 'info',
          title: 'Nouvelle version disponible',
          message: 'Une mise à jour du thème Dawn est disponible pour 23 boutiques.'
        }
      ],

      // Alertes système
      systemAlerts: [
        {
          id: 1,
          severity: 'warning',
          title: 'Maintenance programmée',
          message: 'Maintenance des serveurs prévue dimanche de 2h à 4h du matin.'
        }
      ],

      // Activité récente mise à jour
      recentActivity: [
        {
          id: 1,
          icon: '🏪',
          text: 'Nouvelle boutique activée : boutique-mode.myshopify.com',
          timestamp: Date.now() - 300000,
          badge: 'Nouveau',
          badgeVariant: 'success'
        },
        {
          id: 2,
          icon: '🔄',
          text: 'Licence renouvelée pour tech-store.myshopify.com',
          timestamp: Date.now() - 600000,
          badge: 'Renouvelé',
          badgeVariant: 'info'
        },
        {
          id: 3,
          icon: '⚠️',
          text: 'Licence expire bientôt : vintage-books.myshopify.com',
          timestamp: Date.now() - 900000,
          badge: 'Alerte',
          badgeVariant: 'warning'
        },
        {
          id: 4,
          icon: '💰',
          text: 'Paiement reçu : 49€ de handmade-crafts.myshopify.com',
          timestamp: Date.now() - 1200000,
          badge: 'Paiement',
          badgeVariant: 'success'
        }
      ],
      userMenuOpen: false,
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),

    mainContentClasses() {
      return {
        'main-content--with-sidebar': this.sidebarOpen && !this.isMobile,
        'main-content--mobile': this.isMobile
      }
    }
  },

  created() {
    // Debounced resize handler
    this.debouncedHandleResize = debounce(this.handleResize, 150)
  },

  mounted() {
    this.initializeLayout()
    window.addEventListener('resize', this.debouncedHandleResize)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.debouncedHandleResize)
  },

  methods: {
    // Initialisation au montage
    initializeLayout() {
      this.checkIsMobile()
      this.setSidebarInitialState()
    },

    // Vérification mobile
    checkIsMobile() {
      this.isMobile = window.innerWidth < 900
    },

    // État initial de la sidebar
    setSidebarInitialState() {
      // Récupérer l'état sauvegardé ou utiliser la logique par défaut
      const savedState = localStorage.getItem('sidebar-state')
      if (savedState !== null) {
        this.sidebarOpen = JSON.parse(savedState) && !this.isMobile
      } else {
        this.sidebarOpen = !this.isMobile
      }
    },

    // Gestionnaire de resize optimisé
    handleResize() {
      const wasMobile = this.isMobile
      this.checkIsMobile()

      // Ne changer l'état que si on change de mode
      if (wasMobile !== this.isMobile) {
        if (this.isMobile) {
          this.sidebarOpen = false
        } else {
          // Restaurer l'état sauvegardé ou ouvrir par défaut
          const savedState = localStorage.getItem('sidebar-state')
          this.sidebarOpen = savedState !== null ? JSON.parse(savedState) : true
        }
      }
    },

    // Toggle de la sidebar (événement de la sidebar)
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen

      // Sauvegarder l'état seulement sur desktop
      if (!this.isMobile) {
        localStorage.setItem('sidebar-state', JSON.stringify(this.sidebarOpen))
      }
    },

    // Fermeture de la sidebar (événement de la sidebar)
    closeSidebar() {
      this.sidebarOpen = false
    },

    formatCurrency(amount) {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)
    },
    formatTime(timestamp) {
      const now = Date.now()
      const diff = now - timestamp
      const minutes = Math.floor(diff / 60000)
      if (minutes < 1) return 'À l\'instant'
      if (minutes < 60) return `Il y a ${minutes} min`
      const hours = Math.floor(minutes / 60)
      if (hours < 24) return `Il y a ${hours}h`
      const days = Math.floor(hours / 24)
      return `Il y a ${days}j`
    },
    createProject() {
      this.$store.dispatch('showNotification', {
        message: 'Fonctionnalité en développement',
        type: 'warning'
      })
    },
    inviteUser() {
      this.$store.dispatch('showNotification', {
        message: 'Fonctionnalité en développement',
        type: 'warning'
      })
    },
    viewReports() {
      this.$store.dispatch('showNotification', {
        message: 'Fonctionnalité en développement',
        type: 'warning'
      })
    },

    // Actions pour l'onglet licences
    createNewLicense() {
      this.$store.dispatch('showNotification', {
        message: 'Interface de création de licence en développement',
        type: 'info'
      })
    },

    refreshLicenses() {
      this.$store.dispatch('showNotification', {
        message: 'Actualisation des licences...',
        type: 'success'
      })
      // Ici on pourrait rafraîchir les données via le composant Licenses
    },

    exportLicenses() {
      this.$store.dispatch('showNotification', {
        message: 'Export des licences en cours...',
        type: 'info'
      })
      // Ici on pourrait déclencher l'export des licences
    },
    downloadTheme(theme) {
      // Ici, on simule un téléchargement
      alert(`Téléchargement du thème : ${theme.name}`)
    },
    toggleUserMenu() {
      this.userMenuOpen = !this.userMenuOpen
    },
    closeUserMenu() {
      this.userMenuOpen = false
    },
    logout() {
      this.closeUserMenu()
      this.$store.dispatch('auth/logout')
      this.$router.push({ name: 'Login' })
    },
    openUserProfile() {
      this.closeUserMenu()
      this.selectedTab = 'profil'
    },
    changePassword() {
      this.$store.dispatch('showNotification', {
        message: 'Fonctionnalité de changement de mot de passe en développement',
        type: 'info'
      })
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  /* background-color: var(--background-color); */
  display: block;
  position: relative;
  box-sizing: border-box;
  /* padding: var(--spacing-sm); */
  padding: var(--spacing-md);
  padding-right: var(--spacing-sm);
}

.sidebar-user {
  position: relative;

}

.sidebar-upgrade-label {
  color: #323232;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
}

.sidebar-upgrade-label svg {
  vertical-align: middle;
  margin-right: 6px;
  color: #facc15; /* jaune vif */
}


.sidebar-user-name {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  justify-content: space-between;
}

.main-content {
  height: 100%;
  background-color: #f7fafc;
  border-radius: var(--radius-xl);
  min-width: 0;
  overflow-x: auto;
  position: relative;
  z-index: 1;
  transition: margin-left 0.3s cubic-bezier(.4, 0, .2, 1);
  padding: var(--spacing-sm);
  box-sizing: border-box;
  margin-left: 0;
}

/* Classes CSS plutôt que styles inline */
.main-content--with-sidebar {
  margin-left: 256px;
}

.main-content--mobile {
  margin-left: 0;
}

@media (max-width: 900px) {

  /* Force margin-left à 0 sur mobile */
  .main-content--with-sidebar {
    margin-left: 0;
  }
}

/* Styles pour le Dashboard Shopify */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.stat-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.stat-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-surface);
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-content {
  padding: var(--spacing-md) 0;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: var(--spacing-xs);
}

.stat-growth {
  font-size: 0.875rem;
  font-weight: 500;
}

.stat-growth.success {
  color: #10b981;
}

.stat-growth.warning {
  color: #f59e0b;
}

.stat-growth.danger {
  color: #ef4444;
}

.alerts-section {
  margin: var(--spacing-lg) 0;
}

.alerts-section h3 {
  margin-bottom: var(--spacing-md);
  color: var(--text-surface);
}

.recent-activity h3 {
  margin-bottom: var(--spacing-md);
  color: var(--text-surface);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.activity-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: background-color 0.2s ease;
}

.activity-item:hover {
  background-color: var(--background-color);
}

.activity-icon {
  font-size: 1.5rem;
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-weight: 500;
  color: var(--text-surface);
  margin-bottom: var(--spacing-xs);
}

.activity-time {
  font-size: 0.875rem;
  color: var(--text-color);
}

/* Styles pour l'onglet Analytics */
.metrics-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.metrics-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.performance-metrics {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-value-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.metric-label {
  color: var(--text-color);
  font-size: 0.875rem;
}

.metric-value {
  font-weight: 600;
  color: var(--text-surface);
}

.plan-distribution {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.plan-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.plan-info {
  min-width: 120px;
}

.plan-name {
  font-weight: 600;
  color: var(--text-surface);
  display: block;
}

.plan-count {
  font-size: 0.875rem;
  color: var(--text-color);
}

.plan-progress {
  flex: 1;
  height: 8px;
  background-color: var(--border-color);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  transition: width 0.3s ease;
}

.plan-percentage {
  font-weight: 600;
  color: var(--text-surface);
  min-width: 50px;
  text-align: right;
}

.chart-container {
  padding: var(--spacing-lg);
}

.chart-placeholder {
  text-align: center;
  padding: var(--spacing-xl);
  background-color: var(--background-color);
  border-radius: var(--radius-md);
}

.chart-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  display: block;
}

.trend-summary {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.trend-item {
  text-align: center;
}

.trend-label {
  display: block;
  font-size: 0.875rem;
  color: var(--text-color);
  margin-bottom: var(--spacing-xs);
}

.trend-value {
  font-weight: 600;
  font-size: 1.125rem;
}

.trend-value.success {
  color: #10b981;
}

.trend-value.danger {
  color: #ef4444;
}

.top-shops {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.shop-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: background-color 0.2s ease;
}

.shop-item:hover {
  background-color: var(--background-color);
}

.shop-rank {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.shop-info {
  flex: 1;
}

.shop-domain {
  font-weight: 600;
  color: var(--text-surface);
  margin-bottom: var(--spacing-xs);
}

.shop-theme {
  font-size: 0.875rem;
  color: var(--text-color);
}

.shop-metrics {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.shop-revenue {
  font-weight: 600;
  color: var(--text-surface);
}

.system-alerts {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.no-alerts {
  text-align: center;
  padding: var(--spacing-lg);
  color: var(--text-color);
}

.success-icon {
  font-size: 2rem;
  margin-bottom: var(--spacing-sm);
  display: block;
}

/* Styles pour l'onglet licences */
.license-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
}

/* Responsive design */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .metrics-row {
    grid-template-columns: 1fr;
  }

  .trend-summary {
    flex-direction: column;
    gap: var(--spacing-md);
  }
}

.user-menu-btn {
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: var(--radius-xs);
  transition: background 0.2s;
  color: white;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.user-menu-btn:hover {
  background: #ffffff1c;
}

.user-menu-dropdown {
  position: absolute;
  display: flex;
  left: 0;
  bottom: 90px;
  background: white;
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-stroke);
  z-index: 100;
  width: 100%;
  min-width: 170px;
  padding: var(--spacing-xs) 0;
  flex-direction: column;
  align-items: center;
}

.user-menu-item {
  width: 95%;
  background: none;
  border: none;
  text-align: left;
  padding: var(--spacing-xs) var(--spacing-sm);
  cursor: pointer;
  color: var(--text-color, #333);
  font-size: var(--font-size-sm);
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.user-menu-item:hover {
  border-radius: var(--spacing-xs);
  background: #d4d4d4;
}

.user-menu-icon {
  font-size: 20px;
  color: var(--text-color, #333);
}

.user-profile-content {
  padding: var(--spacing-lg);
  max-width: 400px;
  margin: 0 auto;
}

.user-profile-row {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.user-profile-label {
  font-weight: 600;
  min-width: 100px;
  color: var(--text-surface);
}

.user-profile-value {
  margin-left: var(--spacing-sm);
  color: var(--text-color);
}
</style>
