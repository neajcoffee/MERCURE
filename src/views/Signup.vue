<template>
  <div class="signup-page">
    <div class="signup-container">
      <div class="signup-header">
        <h1>Créer un compte</h1>
        <p>Rejoignez notre plateforme SaaS</p>
      </div>

      <form @submit.prevent="handleSignup" class="signup-form">
        <div class="form-row">
          <div class="form-group">
            <BaseInput
              v-model="form.first_name"
              placeholder="Prénom"
              required
              :error="errors.first_name"
            />
          </div>
          
          <div class="form-group">
            <BaseInput
              v-model="form.last_name"
              placeholder="Nom"
              required
              :error="errors.last_name"
            />
          </div>
        </div>

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
          <div class="password-strength">
            <div class="strength-bar" :class="passwordStrength.class">
              <div class="strength-fill" :style="{ width: passwordStrength.width }"></div>
            </div>
            <span class="strength-text">{{ passwordStrength.text }}</span>
          </div>
        </div>

        <div class="form-group">
          <BaseInput
            v-model="form.confirmPassword"
            type="password"
            placeholder="Confirmer le mot de passe"
            required
            :error="errors.confirmPassword"
            icon="🔒"
          />
        </div>

        <div class="form-group">
          <BaseInput
            v-model="form.shop_domain"
            placeholder="Nom de boutique (shop domain)"
            required
            :error="errors.shop_domain"
          />
        </div>

        <div class="form-group">
          <label class="checkbox-wrapper">
            <input
              v-model="form.acceptTerms"
              type="checkbox"
              required
              class="checkbox"
            >
            <span class="checkmark"></span>
            J'accepte les
            <a href="#" class="terms-link">conditions d'utilisation</a>
            et la
            <a href="#" class="terms-link">politique de confidentialité</a>
          </label>
        </div>

        <BaseButton
          type="submit"
          variant="primary"
          :loading="isLoading"
          :disabled="isLoading || !form.acceptTerms"
          block
        >
          Créer mon compte
        </BaseButton>
      </form>

      <div class="signup-footer">
        <p>
          Déjà un compte ?
          <router-link to="/login" class="login-link">
            Se connecter
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'
import authService from '../services/auth.service'

export default {
  name: 'Signup',
  components: {
    BaseInput,
    BaseButton
  },
  
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        shop_domain: '',
        acceptTerms: false
      },
      errors: {}
    }
  },
  
  computed: {
    ...mapGetters(['isLoading']),
    
    passwordStrength() {
      const password = this.form.password
      if (!password) return { width: '0%', class: '', text: '' }
      
      let score = 0
      if (password.length >= 8) score++
      if (/[a-z]/.test(password)) score++
      if (/[A-Z]/.test(password)) score++
      if (/[0-9]/.test(password)) score++
      if (/[^A-Za-z0-9]/.test(password)) score++
      
      const levels = [
        { width: '20%', class: 'very-weak', text: 'Très faible' },
        { width: '40%', class: 'weak', text: 'Faible' },
        { width: '60%', class: 'medium', text: 'Moyen' },
        { width: '80%', class: 'strong', text: 'Fort' },
        { width: '100%', class: 'very-strong', text: 'Très fort' }
      ]
      
      return levels[score - 1] || levels[0]
    }
  },
  
  methods: {
    // ...mapActions('auth', ['signup']),
    
    async handleSignup() {
      this.errors = {}
      
      if (!this.validateForm()) {
        return
      }
      
      try {
        await authService.signup({
          email: this.form.email,
          password: this.form.password,
          first_name: this.form.first_name,
          last_name: this.form.last_name,
          shop_domain: this.form.shop_domain
        })
        
        // Redirection vers login après inscription réussie
        this.$router.push('/login')
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error)
      }
    },
    
    validateForm() {
      let isValid = true
      
      if (!this.form.first_name.trim()) {
        this.errors.first_name = 'Le prénom est requis'
        isValid = false
      }
      
      if (!this.form.last_name.trim()) {
        this.errors.last_name = 'Le nom est requis'
        isValid = false
      }
      
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
      } else if (this.form.password.length < 8) {
        this.errors.password = 'Le mot de passe doit contenir au moins 8 caractères'
        isValid = false
      }
      
      if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = 'Les mots de passe ne correspondent pas'
        isValid = false
      }
      
      if (!this.form.shop_domain.trim()) {
        this.errors.shop_domain = 'Le nom de boutique est requis'
        isValid = false
      }
      
      return isValid
    },
    
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  }
}
</script>

<style scoped>
.signup-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.signup-container {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.signup-header {
  text-align: center;
  margin-bottom: 2rem;
}

.signup-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.signup-header p {
  color: #718096;
  margin: 0;
}

.signup-form {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.password-strength {
  margin-top: 0.5rem;
}

.strength-bar {
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.strength-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.very-weak .strength-fill { background: #f56565; }
.weak .strength-fill { background: #ed8936; }
.medium .strength-fill { background: #ecc94b; }
.strong .strength-fill { background: #48bb78; }
.very-strong .strength-fill { background: #38a169; }

.strength-text {
  font-size: 0.75rem;
  color: #718096;
}

.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  color: #4a5568;
  font-size: 0.875rem;
  line-height: 1.4;
}

.checkbox {
  margin-right: 0.5rem;
  margin-top: 0.125rem;
  flex-shrink: 0;
}

.terms-link {
  color: #4299e1;
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
}

.signup-footer {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.signup-footer p {
  color: #718096;
  margin: 0;
}

.login-link {
  color: #4299e1;
  text-decoration: none;
  font-weight: 500;
}

.login-link:hover {
  text-decoration: underline;
}

@media (max-width: 520px) {
  .signup-container {
    padding: 1.5rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
