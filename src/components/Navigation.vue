<template>
  <nav class="navigation">
    <div class="navigation-container">
      <!-- Logo -->
      <div class="navigation-logo">
        <router-link to="/" class="logo-link">
          <span class="logo-text">Mercure Theme</span>

        </router-link>
      </div>

      <!-- Navigation Links -->
      <div class="navigation-links" :class="{ 'navigation-links--open': isMobileMenuOpen }">
        <router-link to="/" class="nav-link">Accueil</router-link>
        <a href="#features" class="nav-link">Fonctionnalités</a>
        <a href="#pricing" class="nav-link">Tarifs</a>
        <a href="#testimonials" class="nav-link">Témoignages</a>
        <a href="#faq" class="nav-link">FAQ</a>
      </div>

      <!-- CTA Buttons -->
      <!-- <div class="navigation-actions">
        <router-link to="/login" class="btn btn--outline">Connexion</router-link>
        <router-link to="/signup" class="btn btn--primary">Commencer</router-link>
      </div> -->

      <!-- Mobile Menu Toggle -->
      <button class="mobile-menu-toggle" @click="toggleMobileMenu"
        :aria-label="isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'">
        <div class="dots-menu" :class="{ 'dots-menu--active': isMobileMenuOpen }">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      isMobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    }
  },
  mounted() {
    // Fermer le menu mobile quand on clique sur un lien
    const links = document.querySelectorAll('.nav-link')
    links.forEach(link => {
      link.addEventListener('click', () => {
        this.isMobileMenuOpen = false
      })
    })
  }
}
</script>

<style scoped>
.navigation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  /* background: rgba(255, 255, 255, 0.95); */
  /* background: var(--landing-color-primary); */
  /* backdrop-filter: blur(10px); */
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
  transition: all 0.3s ease;
}

.navigation-container {
  margin: 0 auto;
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
  /* background-color: var(--landing-color-primary); */
  /* background-color: #ffffff05; */
}

.navigation-logo {
  flex-shrink: 0;
}

.logo-container {
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #9333ea, #a855f7);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.logo-inner {
  width: 1.5rem;
  height: 1.5rem;
  background: linear-gradient(135deg, #a855f7, #c084fc);
  border-radius: 9999px;
  position: relative;
}

.crater {
  position: absolute;
  background-color: #7c3aed;
  border-radius: 9999px;
  opacity: 0.6;
}

.crater-1 {
  top: 0.25rem;
  left: 0.25rem;
  width: 0.25rem;
  height: 0.25rem;
}

.crater-2 {
  top: 0.75rem;
  right: 0.5rem;
  width: 0.125rem;
  height: 0.125rem;
  opacity: 0.4;
}

.crater-3 {
  bottom: 0.5rem;
  left: 0.75rem;
  width: 0.125rem;
  height: 0.125rem;
  opacity: 0.5;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  color: var(--landing-color-text-white);
  font-weight: 700;
  font-size: 1.5rem;
}

.logo-icon {
  font-size: 2rem;
}

.logo-text {
  font-size: var(--font-size-md);
  font-weight: 700;
}

.navigation-links {
  display: flex;
  align-items: center;
  /* gap: var(--spacing-xl); */
}

.nav-link {
  color: var(--landing-color-text-white);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-xs);
  font-size: var(--font-size-sm);

}

.nav-link:hover {
  /* color: var(--landing-color-accent-light); */
  color: var(--landing-color-accent);
    /* background-color: #ffffff29; */
    /* background-color: 
 color-mix(in srgb, var(--landing-color-accent) 10%, transparent);
  /* background-color: #ffffff29; */
  /* background-color: 
  color-mix(in srgb, var(--landing-color-accent) 10%, transparent); */
}

/* .nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--landing-color-accent-light);
  transition: width 0.2s ease;
} */

.nav-link:hover::after {
  width: 100%;
}

.navigation-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn--outline {
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  background: transparent;
}

.btn--outline:hover {
  background: var(--primary-color);
  color: white;
}

.btn--primary {
  background: var(--primary-color);
  color: white;
  border: 2px solid var(--primary-color);
}

.btn--primary:hover {
  background: var(--secondary-color);
  border-color: var(--secondary-color);
  transform: translateY(-2px);
}

.mobile-menu-toggle {
  display: none;
  /* background: none; */
  background-color: rgba(255, 255, 255, 0.1);
  /* background-color: 
  color-mix(in srgb, var(--landing-color-accent) 10%, transparent); */
  border: none;
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: var(--radius-xs);
  transition: all 0.3s ease;
}

/* .mobile-menu-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
} */

.dots-menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.dot {
  width: 4px;
  height: 4px;
  background: var(--landing-color-text-white);
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dots-menu--active .dot:nth-child(1) {
  transform: translateY(8px) scale(0.8);
  opacity: 0.6;
}

.dots-menu--active .dot:nth-child(2) {
  /* transform: scale(1.2); */
  /* background: var(--landing-color-accent-light, #ffffff); */
  transform: scale(4);

}

.dots-menu--active .dot:nth-child(3) {
  transform: translateY(-8px) scale(0.8);
  opacity: 0.6;
}

/* Suppression des aniens styles hamburger */
.hamburger-line {
  display: none;
}

.hamburger-line--active:nth-child(1),
.hamburger-line--active:nth-child(2),
.hamburger-line--active:nth-child(3) {
  display: none;
}

@media (max-width: 768px) {

  .navigation-links {
    z-index: 1;
    position: fixed;
    top: 11vh;
    left: 0;
    right: 0;
    background: var(--landing-color-primary);
    flex-direction: column;
    padding: var(--spacing-md);
    gap: var(--spacing-lg);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 var(--radius-md) var(--radius-md);
  }

  .navigation-links--open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-link {
    color: var(--landing-color-text-white);
    padding: var(--spacing-md);
    border-radius: var(--radius-sm);
    text-align: center;
  }

  .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .navigation-actions {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .navigation-container {
    position: absolute;
    top: 5vh;
    width: 100%;
    height: 6vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 var(--spacing-md);
  }
}
</style>