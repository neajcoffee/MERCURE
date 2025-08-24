<template>
  <section class="hero-section">
    <div class="marquee-banner">
      <div class="marquee-text"><span class="marquee-item">AUCUN FRAIS MENSUEL</span><span class="marquee-item">AUCUN
          CODE REQUIS</span><span class="marquee-item">120+ FONCTIONNALITÉS</span><span class="marquee-item">AUCUN
          FRAIS MENSUEL</span><span class="marquee-item">AUCUN CODE REQUIS</span><span class="marquee-item">120+
          FONCTIONNALITÉS</span><span class="marquee-item">AUCUN FRAIS MENSUEL</span><span class="marquee-item">AUCUN
          CODE REQUIS</span><span class="marquee-item">120+ FONCTIONNALITÉS</span><span class="marquee-item">AUCUN
          FRAIS MENSUEL</span><span class="marquee-item">AUCUN CODE REQUIS</span><span class="marquee-item">120+
          FONCTIONNALITÉS</span><span class="marquee-item">AUCUN FRAIS MENSUEL</span><span class="marquee-item">AUCUN
          CODE REQUIS</span><span class="marquee-item">120+ FONCTIONNALITÉS</span><span class="marquee-item">AUCUN
          FRAIS MENSUEL</span><span class="marquee-item">AUCUN CODE REQUIS</span><span class="marquee-item">120+
          FONCTIONNALITÉS</span></div>
    </div>
    <div class="hero-container">
      <div class="hero-content">
        <!-- <div class="hero-badge">
          <span class="badge-icon">✨</span>
          <span class="badge-text">Nouveau : IA intégrée</span>
        </div> -->

        <h1 class="hero-title">
          Créez une boutique Shopify <strong class="hero-title-highlight">qui convertit</strong>
        </h1>

        <!-- <AnimatedTitle 
          fixedText="Créez des boutiques Shopify"
          :changingTexts="['qui convertissent', 'sans frais', 'booste votre CA']"
          :changeInterval="1500"
          animationType="smooth"
        /> -->

        <p class="hero-description">
          Un thème Shopify pour booster votre CA, batir votre image de marque et réduire vos frais
        </p>

        <div class="hero-actions">
          <router-link to="/signup" class="hero-btn hero-btn--primary">
            Commencer gratuitement
            <span class="btn-arrow">→</span>
          </router-link>
          <!-- <button class="hero-btn hero-btn--secondary" @click="playDemo">
            <span class="play-icon">▶</span>
            Voir la démo
          </button> -->
        </div>
      </div>

      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-number" :class="{ 'blur-active': isAnimating }" :style="blurStyle">{{ animatedStats.clients
          }}</div>
          <div class="stat-label">Clients Satisfaits</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" :class="{ 'blur-active': isAnimating }" :style="blurStyle">{{ animatedStats.features
          }}</div>
          <div class="stat-label">Fonctionnalités</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" :class="{ 'blur-active': isAnimating }" :style="blurStyle">{{ animatedStats.support
          }}%</div>
          <div class="stat-label">Rétention</div>
        </div>
      </div>

      <!-- <div class="hero-visual">
        <div class="hero-image-container">
          <div class="hero-image">
            <div class="mockup-screen">
              <div class="mockup-header">
                <div class="mockup-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="mockup-content">
                <div class="mockup-sidebar">
                  <div class="mockup-nav-item active"></div>
                  <div class="mockup-nav-item"></div>
                  <div class="mockup-nav-item"></div>
                </div>
                <div class="mockup-main">
                  <div class="mockup-card"></div>
                  <div class="mockup-card"></div>
                  <div class="mockup-card"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </section>

</template>

<script>
import AnimatedTitle from './AnimatedTitle.vue'

export default {
  name: 'HeroSection',
  components: {
    AnimatedTitle
  },
  data() {
    return {
      animatedStats: {
        clients: 0,
        features: 0,
        support: 0
      },
      finalStats: {
        clients: 2000,
        features: 120,
        support: 98
      },
      isAnimating: true,
      animationProgress: 0
    }
  },
  computed: {
    blurStyle() {
      if (this.animationProgress <= 0.15) {
        const blurIntensity = Math.max(0, 8 - (this.animationProgress * 8) / 0.15)
        return {
          filter: `blur(${blurIntensity}px)`,
          transition: 'filter 0.1s ease-out'
        }
      }
      return {}
    }
  },
  mounted() {
    this.animateStats()
  },
  methods: {
    animateStats() {
      const duration = 1000 // 2 secondes
      const steps = 100
      const stepDuration = duration / steps

      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++
        this.animationProgress = currentStep / steps

        // Animation des chiffres
        this.animatedStats.clients = Math.floor((this.finalStats.clients * currentStep) / steps)
        this.animatedStats.features = Math.floor((this.finalStats.features * currentStep) / steps)
        this.animatedStats.support = Math.floor((this.finalStats.support * currentStep) / steps)

        if (currentStep >= steps) {
          clearInterval(timer)
          // Assurer que les valeurs finales sont exactes
          this.animatedStats.clients = this.finalStats.clients
          this.animatedStats.features = this.finalStats.features
          this.animatedStats.support = this.finalStats.support
          this.isAnimating = false
          this.animationProgress = 1
        }
      }, stepDuration)
    },
    playDemo() {
      // Logique pour lancer la démo
      console.log('Lancement de la démo')
    }
  }
}
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: var(--landing-color-background);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0.1"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="150" fill="url(%23a)"/><circle cx="400" cy="800" r="120" fill="url(%23a)"/></svg>'); */
  opacity: 0.3;
}

/* .hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxl);
  align-items: center;
  position: relative;
  z-index: 1;
} */

.hero-container {
  margin: 0 auto;
  max-width: 1000px;
  /* padding: 0 var(--spacing-xl); */
  padding: var(--spacing-sm);
  display: flex;
  position: relative;
  z-index: 1;
  flex-direction: column;
  align-items: center;
}

.hero-content {
  color: white;

  padding: var(--spacing-xxl);
  /* border: dashed 2px var(--landing-color-primary); */
  /* border-radius: var(--radius-md); */
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-full);
  margin-bottom: var(--spacing-lg);
  font-size: 0.875rem;
  font-weight: 500;
}

.badge-icon {
  font-size: 1rem;
}



.hero-description {
  font-size: var(--font-size-md);
  line-height: 1.6;
  margin-bottom: var(--spacing-xl);
  opacity: 0.9;
  color: var(--landing-color-text);
  text-align: center;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}

.hero-btn {
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
  font-size: var(--font-size-md);
  background-color: var(--landing-color-primary);
  color: white;
}

/* .hero-btn--primary {
  background: white;
  color: var(--primary-color);
} */

/* .hero-btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
} */

.hero-btn--secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-btn--secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.btn-arrow {
  transition: transform 0.2s ease;
}

.hero-btn:hover .btn-arrow {
  transform: translateX(4px);
}

.play-icon {
  font-size: 0.875rem;
}

.hero-stats {
  display: flex;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
  color: var(--landing-color-text);
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  padding: var(--spacing-sm);
  border: dashed 2px #0000000a;
  border-radius: var(--radius-xl);
}

.stat-item {
  transition: transform 0.2s ease-out;
  text-align: center;
  text-align: center;
  box-shadow: var(--shadow-blue), var(--shadow-stroke);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
}

.stat-item:hover {
  transform: scale(1.04);
}

.stat-number {
  font-size: 2rem;
  font-family: 'Inter';
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  color: var(--landing-color-text);
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.8;
}

/* Marquee Banner */
/* .marquee-banner {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  white-space: nowrap;
  background-color: var(--landing-color-primary);
  color: white;
  padding: var(--spacing-sm) 0;
} */

.marquee-banner {
  z-index: 9000;
  position: absolute;
  bottom: 5vh;
  left: -5vw;
  right: -5vh;
  overflow: hidden;
  white-space: nowrap;
  background-color: var(--landing-color-primary);
  color: white;
  padding: var(--spacing-sm) 0;
  transform: rotate(357deg);
  box-shadow: 0px 8px 20px #00034938, -4px 5px 8px #0100341f;
  border: 2px solid white;
}

.marquee-text {
  display: inline-block;
  animation: marquee 30s linear infinite;
  /* Assure que l'animation se répète parfaitement */
  will-change: transform;
}

.marquee-item {
  display: inline-block;
  font-family: var(--font-family-base);
  margin-right: var(--spacing-md);
  font-weight: var(--font-weight-black);
  font-size: var(--font-size-lg);
  font-style: italic;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-50%);
  }
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image-container {
  position: relative;
}

.hero-image {
  position: relative;
  z-index: 2;
}

.mockup-screen {
  width: 400px;
  height: 300px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;
}

.mockup-header {
  height: 40px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-md);
  border-bottom: 1px solid #e9ecef;
}

.mockup-dots {
  display: flex;
  gap: var(--spacing-xs);
}

.mockup-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #dee2e6;
}

.mockup-dots span:nth-child(1) {
  background: #ff5f57;
}

.mockup-dots span:nth-child(2) {
  background: #ffbd2e;
}

.mockup-dots span:nth-child(3) {
  background: #28ca42;
}

.mockup-content {
  display: flex;
  height: calc(100% - 40px);
}

.mockup-sidebar {
  width: 80px;
  background: #f8f9fa;
  padding: var(--spacing-md) var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.mockup-nav-item {
  height: 40px;
  background: #e9ecef;
  border-radius: var(--radius-xs);
}

.mockup-nav-item.active {
  background: var(--primary-color);
}

.mockup-main {
  flex: 1;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.mockup-card {
  height: 60px;
  background: #f8f9fa;
  border-radius: var(--radius-xs);
  border: 1px solid #e9ecef;
}

.hero-title {
  font-size: clamp(4rem, 5vw, 6rem);
  font-weight: 900;
  line-height: 1.1;
  margin: 0px auto;
  margin-bottom: var(--spacing-md);
  color: var(--landing-color-text);
  /* display: inline-flex
; */
  /* flex-wrap: wrap; */
  /* gap: 0.2em; */
  /* align-items: center; */
  /* text-align: center; */
  /* margin: 0px auto; */
  width: 100%;
  max-width: 100rem;
  text-align: center;
}

.hero-title-highlight {
  color: var(--landing-color-primary);
  font-weight: 1000;
  letter-spacing: -0.02em;
}


@media (max-width: 768px) {
  .hero-title {
    font-size: clamp(2.5rem, 9vw, 4rem);
    text-align: center;
  }

  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: var(--spacing-lg);
    margin-top: 10vh;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-stats {
    justify-content: center;
    width: 100%;
    gap: var(--spacing-xs);
    flex-direction: column;
  }

  .mockup-screen {
    width: 300px;
    height: 225px;
  }

  .marquee-banner {
    transform: none;
    top: 0;
    bottom: inherit;
    border: none;
    box-shadow: none;
    padding: 0;
    height: 5vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
  }

  .marquee-item {
    font-size: var(--font-size-sm);
    color: var(--landing-color-primary);
  }
}

.stat-number {
  transition: all 0.3s ease-out;
  font-weight: bold;
}

.stat-number.blur-active {
  /* text-shadow: 0 0 8px var(--landing-color-primary); */
  /* color: var(--landing-color-primary); */
  transform: scale(1.05);
}

.stat-number:not(.blur-active) {
  text-shadow: none;
  color: inherit;
  transform: scale(1);
}
</style>