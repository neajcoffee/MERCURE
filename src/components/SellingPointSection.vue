<template>
  <section id="selling-points" class="selling-points-section">
    <div class="selling-points-container">
      <div class="landing-header-section">
        <h2 class="landing-section-title">
          Pourquoi choisir le <span class="landing-section-title-highlight">thème Mercure</span> ?
        </h2>
        <p class="selling-points-subtitle">
          Comparez notre proposition à celle des autres thèmes disponibles sur le marché.
        </p>
      </div>

      <div class="selling-points-grid">
        <!-- <ArgumentCard
          class="selling-point-card"
          :title="comparison.title"
          :subtitle="comparison.subtitle"
          :description="comparison.description"
          :icon="comparison.icon"
          :eyebrow="comparison.eyebrow"
          :variant="comparison.variant"
          :pros-title="comparison.prosTitle"
          :cons-title="comparison.consTitle"
          :pros="comparison.pros"
          :cons="comparison.cons"
        /> -->
        <ArgumentCard
          class="selling-point-card"
          :variant="comparison.variant"
          :pros-title="comparison.prosTitle"
          :cons-title="comparison.consTitle"
          :pros="comparison.pros"
          :cons="comparison.cons"
        />
      </div>
    </div>
  </section>
  <!-- <section class="selling-points-cta-section">
    <div class="selling-points-cta-container">
        <h3 class="selling-points-cta-title">
          Donner à votre marque les ventes qu'elle mérite ?
        </h3>
        <p class="selling-points-cta-description">
          Construisez une image de marque forte et engageante avec Mercure.
        </p>
        <BtnStar @click="scrollToPricing">Commencer</BtnStar>
    </div>
  </section> -->
</template>

<script>

import ArgumentCard from './base/ArgumentCard.vue'
import BtnStar from './BtnStar.vue'

export default {
  name: 'SellingPointSection',
  components: {
    ArgumentCard,
    BtnStar
  },
  methods: {
    scrollToPricing() {
      this.$router.push('/pricing')
    }
  },
  data() {
    return {
      comparison: {
        // eyebrow: 'Choix stratégique',
        // title: 'Mercure vs autres thèmes',
        // subtitle: 'Deux approches, deux résultats',
        // description: 'Nous avons pensé Mercure pour accélérer la conversion et la mise en ligne, tandis que les autres thèmes nécessitent plus de temps et de ressources.',
        // icon: '⚡',
        variant: 'flat',
        prosTitle: 'Mercure',
        consTitle: 'Les autres thèmes',
        pros: [
          '+ 120 apps et fonctionnalités incluses',
          'Une image de marque forte et engageante',
          'Onboarding ultra simple',
          'Rendu de boutique de marque',
          'Mise à jour régulière',
          'Thème adaptable à toute les niches',
          'Idéal pour du multi ou du mono produit'

        ],
        cons: [
          'Apps payantes pour couvrir les besoins',
          'Votre Shop ressemble à celui des autres',
          'Complexe d’utilisation',
          'Look de boutique “Dropshipping”',
          'Pas de mise à jour régulière',
          'Non adaptable à toute les niches',
          'Rigide dans le cas de besoins spécifiques'

        ]
      }
    }
  }
}
</script>

<style scoped>
.selling-points-section {
  padding: var(--spacing-xs);
  background: linear-gradient(180deg, #00000063, transparent);
}

.selling-points-container {
  margin: 0 auto;
  padding-top: var(--spacing-xxl);
}

.selling-points-subtitle {
  padding: 0 var(--spacing-md);
  color: #b7b7b7;
}

.selling-points-grid {
  max-width: 1100px;
  margin: auto;
  padding: var(--spacing-md);
}

.selling-point-card {
  transition: transform 0.3s ease;
}

.selling-point-card:hover {
  transform: translateY(-4px);
}
</style>
