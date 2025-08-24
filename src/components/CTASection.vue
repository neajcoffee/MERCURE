<template>
  <section class="cta-section">
    <div class="cta-container">
      <div class="cta-content">
        <h2 class="cta-title">
          Prêt à transformer votre <span class="cta-title-highlight">productivité</span> ?
        </h2>
        <p class="cta-description">
          Rejoignez des milliers d'équipes qui utilisent déjà Stella pour 
          automatiser leurs tâches et booster leur efficacité.
        </p>
        
        <div class="cta-actions">
          <router-link to="/signup" class="cta-btn cta-btn--primary">
            Commencer gratuitement
            <span class="btn-arrow">→</span>
          </router-link>
          <button class="cta-btn cta-btn--secondary" @click="scheduleDemo">
            <span class="calendar-icon">📅</span>
            Programmer une démo
          </button>
        </div>
        
        <div class="cta-features">
          <div class="cta-feature">
            <span class="feature-icon">✓</span>
            <span class="feature-text">Essai gratuit de 7 jours</span>
          </div>
          <div class="cta-feature">
            <span class="feature-icon">✓</span>
            <span class="feature-text">Aucune carte de crédit requise</span>
          </div>
          <div class="cta-feature">
            <span class="feature-icon">✓</span>
            <span class="feature-text">Annulation à tout moment</span>
          </div>
        </div>
      </div>
      
      <div class="cta-visual">
        <div class="cta-image">
          <div class="floating-card floating-card--1">
            <div class="card-icon">🚀</div>
            <div class="card-text">Productivité +40%</div>
          </div>
          <div class="floating-card floating-card--2">
            <div class="card-icon">⚡</div>
            <div class="card-text">Temps gagné</div>
          </div>
          <div class="floating-card floating-card--3">
            <div class="card-icon">🎯</div>
            <div class="card-text">Objectifs atteints</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CTASection',
  methods: {
    scheduleDemo() {
      // Logique pour programmer une démo
      console.log('Programmer une démo')
    }
  }
}
</script>

<style scoped>
.cta-section {
  padding: var(--spacing-xxl) 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0.1"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="150" fill="url(%23a)"/><circle cx="400" cy="800" r="120" fill="url(%23a)"/></svg>');
  opacity: 0.3;
}

.cta-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxl);
  align-items: center;
  position: relative;
  z-index: 1;
}

.cta-content {
  color: white;
}

.cta-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
}

.cta-title-highlight {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta-description {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: var(--spacing-xl);
  opacity: 0.9;
}

.cta-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.cta-btn--primary {
  background: white;
  color: var(--primary-color);
}

.cta-btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.cta-btn--secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.cta-btn--secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.btn-arrow {
  transition: transform 0.2s ease;
}

.cta-btn:hover .btn-arrow {
  transform: translateX(4px);
}

.calendar-icon {
  font-size: 1rem;
}

.cta-features {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.cta-feature {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 1rem;
  opacity: 0.9;
}

.feature-icon {
  color: #10b981;
  font-weight: bold;
  font-size: 1.125rem;
}

.cta-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.cta-image {
  position: relative;
  width: 300px;
  height: 300px;
}

.floating-card {
  position: absolute;
  background: white;
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  animation: float 3s ease-in-out infinite;
}

.floating-card--1 {
  top: 20px;
  left: 20px;
  animation-delay: 0s;
}

.floating-card--2 {
  top: 120px;
  right: 20px;
  animation-delay: 1s;
}

.floating-card--3 {
  bottom: 20px;
  left: 50px;
  animation-delay: 2s;
}

.card-icon {
  font-size: 1.5rem;
}

.card-text {
  font-weight: 600;
  color: var(--primary-color);
  font-size: 0.875rem;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 768px) {
  .cta-container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: var(--spacing-lg);
  }

  .cta-actions {
    justify-content: center;
  }

  .cta-features {
    align-items: center;
  }

  .cta-visual {
    display: none;
  }
}
</style> 