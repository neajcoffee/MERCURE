<template>
  <section id="features" class="features-section">
    <div class="features-container">
      <div class="landing-header-section">
        <h2 class="landing-section-title">

          Plus de <span class="landing-section-title-highlight">400€/mois économisés</span>
        </h2>
        <p class="features-subtitle">
          Réduisez vos frais mensuels en regroupant toutes vos applications dans un seul thème Shopify.
        </p>
      </div>

      <div class="features-grid">
        <div class="feature-card" v-for="feature in features" :key="feature.id">
          <div class="feature-icon">
            <span class="icon">{{ feature.icon }}</span>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
          <ul class="feature-list">
            <li v-for="benefit in feature.benefits" :key="benefit">{{ benefit }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturesSection',
  data() {
    return {
      features: [
        {
          id: 1,
          icon: '',
          title: 'Conçu pour Convertir',
          description: 'Une boutique élégante et performante avec des boosters de confiance et d\'engagement intégrés. Aucun code requis.',
          // benefits: [
          //   'Automatisation intelligente',
          //   'Suggestions contextuelles',
          //   'Analyse prédictive'
          // ]
        },
        {
          id: 2,
          icon: '',
          title: 'Fonctionnalités de Panier Intégrées',
          description: 'Augmenter la valeur de chaque commande - sans applications supplémentaires.',
          benefits: [
            'compte-à-rebours',
            'ventes additionnelles',
            'outils d\'urgence'
          ]
        },
        {
          id: 3,
          icon: '',
          title: 'Multipliez Chaque Vente',
          description: 'Augmentez les ventes avec des lots en un clic et des remises sur quantité - aucun plugin supplémentaire requis.',
          // benefits: [
          //   'Partage en temps réel',
          //   'Gestion des permissions',
          //   'Communication intégrée'
          // ]
        },
      ]
    }
  }
}
</script>

<style scoped>
.features-section {
  padding: var(--spacing-xs);
  background: linear-gradient(180deg, #00000063, transparent);
}

.features-container {
  margin: 0 auto;
  padding-top: var(--spacing-xxl);
  border-radius: var(--radius-xxl);
  background: linear-gradient(180deg, #ffffff05 0%, transparent 30%);
}

.features-subtitle {
  padding: 0 var(--spacing-md);
  color: #b7b7b7;

}

.features-grid {
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  border-radius: var(--radius-xl);
  background: #f8f9fa;
  border-radius: var(--radius-xxl);
  margin: auto;



}

.feature-card {
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 80px;
  height: 80px;
  background-color: var(--landing-color-primary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-bottom: var(--spacing-lg);
  display: none;
}

.icon {
  font-size: 2rem;
}

.feature-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-black);
  color: var(--landing-color-text);
  margin-bottom: var(--spacing-md);
}

.feature-description {
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  position: relative;
  padding-left: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
  color: var(--text-color);
}

.feature-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--landing-color-primary);
  font-weight: bold;
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .feature-card {
    padding: var(--spacing-lg);
  }
}
</style>