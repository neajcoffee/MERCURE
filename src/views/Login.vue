<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h1>Connexion</h1>
        <p>Connectez-vous à votre compte SaaS</p>
      </div>

      <!-- Message d'erreur global -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <BaseInput
            v-model="form.email"
            type="email"
            placeholder="Adresse e-mail"
            required
            :error="errors.email"
            icon="✉️"
          />
        </div>

        <div class="form-group">
          <BaseInput
            v-model="form.password"
            type="password"
            placeholder="Mot de passe"
            required
            :error="errors.password"
            icon="🔒"
          />
        </div>

        <div class="form-options">
          <label class="checkbox-wrapper">
            <input
              v-model="form.rememberMe"
              type="checkbox"
              class="checkbox"
            >
            <span class="checkmark"></span>
            Se souvenir de moi
          </label>

          <router-link to="/forgot-password" class="forgot-link">
            Mot de passe oublié ?
          </router-link>
        </div>

        <BaseButton
          type="submit"
          variant="primary"
          :loading="isLoading"
          :disabled="isLoading"
          block
        >
          Se connecter
        </BaseButton>
      </form>

      <div class="login-footer">
        <p>
          Pas encore de compte ?
          <router-link to="/signup" class="signup-link">
            Créer un compte
          </router-link>
        </p>
      </div>

      <!-- Demo credentials -->
      <div class="demo-section">
        <h3>Compte de démonstration</h3>
        <p>Email: madoudbj@gmail.com</p>
        <p>Mot de passe: azazazaz</p>
        <BaseButton
          @click="fillDemoCredentials"
          variant="outline"
          size="small"
        >
          Utiliser les identifiants de démo
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'

export default {
  name: 'Login',
  components: {
    BaseInput,
    BaseButton
  },
  
  data() {
    return {
      form: {
        email: '',
        password: '',
        rememberMe: false
      },
      errors: {},
      errorMessage: ''
    }
  },
  
  computed: {
    ...mapGetters(['isLoading'])
  },
  
  methods: {
    ...mapActions('auth', ['login']),
    
    async handleLogin() {
      // Réinitialiser les erreurs
      this.errors = {}
      this.errorMessage = ''
      
      // Validation côté client
      if (!this.validateForm()) {
        return
      }
      
      try {
        await this.login({
          email: this.form.email,
          password: this.form.password,
          rememberMe: this.form.rememberMe
        })
        
        // Redirection vers le tableau de bord
        this.$router.push('/dashboard')
      } catch (error) {
        // Afficher l'erreur à l'utilisateur
        this.errorMessage = error.message || 'Erreur de connexion'
        console.error('Erreur de connexion:', error)
      }
    },
    
    validateForm() {
      let isValid = true
      
      if (!this.form.email) {
        this.errors.email = 'L\'email est requis'
        isValid = false
      } else if (!this.isValidEmail(this.form.email)) {
        this.errors.email = 'Format d\'email invalide'
        isValid = false
      }
      
      if (!this.form.password) {
        this.errors.password = 'Le mot de passe est requis'
        isValid = false
      } else if (this.form.password.length < 6) {
        this.errors.password = 'Le mot de passe doit contenir au moins 6 caractères'
        isValid = false
      }
      
      return isValid
    },
    
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    
    fillDemoCredentials() {
      this.form.email = 'madoudbj@gmail.com'
      this.form.password = 'azazazaz'
      this.errorMessage = ''
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.login-container {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #718096;
  margin: 0;
}

.error-message {
  background: #fed7d7;
  color: #c53030;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.875rem;
}

.login-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #4a5568;
}

.checkbox {
  margin-right: 0.5rem;
}

.forgot-link {
  color: #4299e1;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

.login-footer {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.login-footer p {
  color: #718096;
  margin: 0;
}

.signup-link {
  color: #4299e1;
  text-decoration: none;
  font-weight: 500;
}

.signup-link:hover {
  text-decoration: underline;
}

.demo-section {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 8px;
  text-align: center;
}

.demo-section h3 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: #4a5568;
  font-weight: 600;
}

.demo-section p {
  margin: 0.25rem 0;
  font-size: 0.75rem;
  color: #718096;
  font-family: 'Courier New', monospace;
}

@media (max-width: 480px) {
  .login-container {
    padding: 1.5rem;
  }
  
  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}
</style>
