<template>
  <div id="app">
    <!-- Layout conditionnel basé sur l'authentification ET la route -->
    <AppLayout v-if="isAuthenticated && !isLandingPage" />
    <router-view v-else />
    
    <!-- Toast notifications (optionnel) -->
    <div v-if="notification" class="notification" :class="notification.type">
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppLayout from './components/layout/AppLayout.vue'

export default {
  name: 'App',
  components: {
    AppLayout
  },
  
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters(['notification']),
    
    isLandingPage() {
      return this.$route.name === 'LandingPage'
    }
  },
  
  async created() {
    // Vérifier le token au démarrage de l'application
    await this.initializeAuth()
  },
  
  methods: {
    ...mapActions('auth', ['initializeAuth'])
  }
}
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px 20px;
  border-radius: 6px;
  color: white;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

.notification.success { background-color: #10b981; }
.notification.error { background-color: #ef4444; }
.notification.warning { background-color: #f59e0b; }

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
