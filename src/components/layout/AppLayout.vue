<template>
  <div class="app-layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'is-collapsed': sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo">
          <span class="logo-icon">🚀</span>
          <span v-if="!sidebarCollapsed" class="logo-text">SaaS App</span>
        </div>
        <button
          @click="toggleSidebar"
          class="sidebar-toggle"
          :class="{ 'is-collapsed': sidebarCollapsed }"
        >
          {{ sidebarCollapsed ? '→' : '←' }}
        </button>
      </div>

      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li>
            <router-link to="/dashboard" class="nav-link">
              <span class="nav-icon">📊</span>
              <span v-if="!sidebarCollapsed" class="nav-text">Tableau de bord</span>
            </router-link>
          </li>
          <li>
            <a href="#" class="nav-link" @click.prevent="showNotImplemented">
              <span class="nav-icon">👥</span>
              <span v-if="!sidebarCollapsed" class="nav-text">Utilisateurs</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-link" @click.prevent="showNotImplemented">
              <span class="nav-icon">📁</span>
              <span v-if="!sidebarCollapsed" class="nav-text">Projets</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-link" @click.prevent="showNotImplemented">
              <span class="nav-icon">📈</span>
              <span v-if="!sidebarCollapsed" class="nav-text">Analytics</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-link" @click.prevent="showNotImplemented">
              <span class="nav-icon">⚙️</span>
              <span v-if="!sidebarCollapsed" class="nav-text">Paramètres</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="main-content">
      <!-- Top header -->
      <header class="top-header">
        <!-- <div class="header-left">
          <h2 class="page-title">{{ pageTitle }}</h2>
        </div> -->
        
        <div class="header-right">
          <!-- <div class="search-bar">
            <input
              type="text"
              placeholder="Rechercher..."
              class="search-input"
            >
            <span class="search-icon">🔍</span>
          </div> -->

          <!-- Notifications -->
          <!-- <div class="notifications">
            <button class="notification-btn">
              <span class="notification-icon">🔔</span>
              <span class="notification-badge">3</span>
            </button>
          </div> -->

          <!-- User menu -->
          <!-- <div class="user-menu" @click="toggleUserMenu" ref="userMenu">
            <div class="user-avatar">
              {{ userInitials }}
            </div>
            <div v-if="showUserMenu" class="user-dropdown">
              <div class="user-info">
                <p class="user-name">{{ currentUser?.firstName }} {{ currentUser?.lastName }}</p>
                <p class="user-email">{{ currentUser?.email }}</p>
              </div>
              <div class="dropdown-divider"></div>
              <ul class="dropdown-menu">
                <li>
                  <a href="#" @click.prevent="showNotImplemented">
                    <span class="menu-icon">👤</span>
                    Mon profil
                  </a>
                </li>
                <li>
                  <a href="#" @click.prevent="showNotImplemented">
                    <span class="menu-icon">⚙️</span>
                    Paramètres
                  </a>
                </li>
                <li>
                  <a href="#" @click.prevent="logout">
                    <span class="menu-icon">🚪</span>
                    Déconnexion
                  </a>
                </li>
              </ul>
            </div>
          </div> -->
        </div>
      </header>

      <!-- Page content -->
      <main class="page-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppLayout',
  
  data() {
    return {
      sidebarCollapsed: false,
      showUserMenu: false
    }
  },
  
  computed: {
    ...mapGetters('auth', ['currentUser']),
    
    pageTitle() {
      const routeName = this.$route.name
      const titles = {
        Dashboard: 'Tableau de bord',
        Users: 'Utilisateurs',
        Projects: 'Projets',
        Analytics: 'Analytics',
        Settings: 'Paramètres'
      }
      return titles[routeName] || routeName || 'SaaS App'
    },
    
    userInitials() {
      if (!this.currentUser) return '?'
      const firstName = this.currentUser.firstName || ''
      const lastName = this.currentUser.lastName || ''
      return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
    }
  },
  
  mounted() {
    // Fermer le menu utilisateur si on clique ailleurs
    document.addEventListener('click', this.handleClickOutside)
  },
  
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions(['showNotification']),
    
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    
    handleClickOutside(event) {
      if (this.$refs.userMenu && !this.$refs.userMenu.contains(event.target)) {
        this.showUserMenu = false
      }
    },
    
    async logout() {
      try {
        await this.logout()
        this.$router.push('/login')
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
      }
    },
    
    showNotImplemented() {
      this.showNotification({
        message: 'Fonctionnalité en développement',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
/* .app-layout {
  display: flex;
  min-height: 100vh;
  background: #f7fafc;
}

.sidebar {
  width: 260px;
  background: #2d3748;
  color: white;
  transition: width 0.3s ease;
  position: relative;
  z-index: 10;
}

.sidebar.is-collapsed {
  width: 80px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #4a5568;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
}

.sidebar-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.sidebar-toggle:hover {
  background: #4a5568;
}

.sidebar-nav {
  padding: 1rem 0;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #cbd5e0;
  text-decoration: none;
  transition: all 0.2s ease;
  margin: 0.25rem 0;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: #4a5568;
  color: white;
}

.nav-icon {
  font-size: 1.125rem;
  width: 1.5rem;
  text-align: center;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.top-header {
  background: white;
  padding: 0 2rem;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 5;
}

.page-title {
  margin: 0;
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.search-bar {
  position: relative;
}

.search-input {
  width: 300px;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
}

.search-input:focus {
  outline: none;
  border-color: #4299e1;
}

.search-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

.notifications {
  position: relative;
}

.notification-btn {
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 1.25rem;
}

.notification-btn:hover {
  background: #f7fafc;
}

.notification-badge {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: #f56565;
  color: white;
  font-size: 0.75rem;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-menu {
  position: relative;
  cursor: pointer;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4299e1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 20;
}

.user-info {
  padding: 1rem;
}

.user-name {
  margin: 0;
  font-weight: 600;
  color: #2d3748;
}

.user-email {
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  color: #718096;
}

.dropdown-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 0;
}

.dropdown-menu {
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
}

.dropdown-menu a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #4a5568;
  text-decoration: none;
  font-size: 0.875rem;
}

.dropdown-menu a:hover {
  background: #f7fafc;
}

.menu-icon {
  font-size: 1rem;
}

.page-content {
  flex: 1;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -260px;
    height: 100vh;
    z-index: 100;
  }
  
  .sidebar.is-open {
    left: 0;
  }
  
  .search-input {
    width: 200px;
  }
  
  .header-right {
    gap: 1rem;
  }
} */
</style>
