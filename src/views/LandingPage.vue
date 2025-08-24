<template>
  <div id="landing-layout" class="min-h-screen">
    <!-- Navigation -->
    <Navigation />
    
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Features Section -->
    <FeaturesSection />
    
    <!-- Pricing Section -->
    <PricingSection />
    
    <!-- Testimonials Section -->
    <TestimonialsSection />
    
    <!-- FAQ Section -->
    <FAQSection />
    
    <!-- CTA Section -->
    <!-- <CTASection /> -->
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navigation from '../components/Navigation.vue'
import HeroSection from '../components/HeroSection.vue'
import FeaturesSection from '../components/FeaturesSection.vue'
import PricingSection from '../components/PricingSection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import FAQSection from '../components/FAQSection.vue'
import CTASection from '../components/CTASection.vue'
import Footer from '../components/Footer.vue'

const route = useRoute()

onMounted(() => {
  // Si on arrive sur la page avec un paramètre de scroll
  if (route.params.scrollTo) {
    setTimeout(() => {
      const element = document.getElementById(route.params.scrollTo)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }
})
</script>

<style>
/* Variables CSS dédiées au composant LandingPage et ses enfants */
#landing-layout {
  /* Couleurs principales */
  /* --landing-color-primary: #ff4f5f; */
  --landing-color-primary: #8b4fff;
  --landing-color-primary-dark: #1d4ed8;
  --landing-color-primary-light: #3b82f6;
  
  /* Couleurs secondaires */
  --landing-color-secondary: #64748b;
  --landing-color-secondary-light: #94a3b8;
  
  /* Couleurs d'accent */
  --landing-color-accent: #f59e0b;
  --landing-color-accent-light: #fbbf24;
  
  /* Couleurs de fond */
  /* --landing-color-background: #ffffff; */
  --landing-color-background: #ffffff;
  --landing-color-background-alt: #f8fafc;
  --landing-color-background-dark: #1e243a;
  
  /* Couleurs de texte */
  --landing-color-text: #1e243a;
  --landing-color-text-light: #64748b;
  --landing-color-text-white: #ffffff;
  
  /* Couleurs d'état */
  --landing-color-success: #10b981;
  --landing-color-warning: #f59e0b;
  --landing-color-error: #ef4444;
  --landing-color-info: #3b82f6;
  
  /* Couleurs de bordure */
  --landing-color-border: #e2e8f0;
  --landing-color-border-light: #f1f5f9;
  --landing-color-border-dark: #cbd5e1;
  
}

.landing-header-section{
  text-align: center;
  margin-bottom: var(--spacing-xxl);
}

.landing-section-title{
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--font-weight-black);
  color: var(--landing-color-text);
  margin-bottom: var(--spacing-md);
}

.landing-section-title-highlight{
  background: linear-gradient(to right, var(--landing-color-primary),
      color-mix(in srgb, var(--landing-color-primary) 80%, #000000));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.landing-section-subtitle{ 
  font-size: 1.25rem;
  color: var(--text-color);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

</style>