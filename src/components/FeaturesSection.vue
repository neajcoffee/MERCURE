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
          <div class="feature-media" v-if="feature.videoUrl">
            <video ref="featureVideo" class="feature-video" muted loop preload="auto" playsinline autoplay
              :poster="feature.videoPoster || defaultVideoPoster" aria-hidden="true">
              <source :src="feature.videoUrl" :type="feature.videoType || 'video/mp4'" />
              Votre navigateur ne supporte pas la lecture de cette vidéo.
            </video>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
          <ul class="feature-list" v-if="feature.benefits && feature.benefits.length">
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
          videoUrl: '/video-features-1.mp4',
          videoPoster: null,
          videoType: 'video/mp4',
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
          videoUrl: '/video-features-2.mp4',
          videoPoster: null,
          videoType: 'video/mp4',
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
          videoUrl: '/video-features-3.mp4',
          videoPoster: null,
          videoType: 'video/mp4',
          // benefits: [
          //   'Partage en temps réel',
          //   'Gestion des permissions',
          //   'Communication intégrée'
          // ]
        },
      ],
      observer: null,
      defaultVideoPoster:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP4DwQACfsD/QduCMIAAAAASUVORK5CYII='
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initializeFeatureVideos()
    })
  },
  beforeUnmount() {
    this.cleanupObserver()
  },
  // Vue 2 fallback
  beforeDestroy() {
    this.cleanupObserver()
  },
  methods: {
    initializeFeatureVideos() {
      const videos = this.getVideoElements()

      if (!videos.length) {
        return
      }

      videos.forEach((video) => {
        video.muted = true
        video.loop = true
        video.playsInline = true
        video.setAttribute('muted', '')
        video.setAttribute('loop', '')
        video.setAttribute('playsinline', '')
        video.autoplay = true
        video.setAttribute('autoplay', '')
        video.preload = 'auto'
        video.load()
      })

      if (typeof window === 'undefined') {
        videos.forEach((video) => {
          video.play().catch(() => { })
        })
        return
      }

      this.cleanupObserver()

      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const video = entry.target

              if (entry.isIntersecting) {
                video.play().catch(() => { })
              } else {
                video.pause()
              }
            })
          },
          {
            threshold: 0.25
          }
        )

        videos.forEach((video) => {
          this.observer.observe(video)
        })
      } else {
        videos.forEach((video) => {
          video.play().catch(() => { })
        })
      }
    },
    getVideoElements() {
      const refs = this.$refs.featureVideo || []
      const list = Array.isArray(refs) ? refs : [refs]

      return list.filter(Boolean)
    },
    cleanupObserver() {
      if (this.observer) {
        this.observer.disconnect()
        this.observer = null
      }
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
  padding: var(--spacing-md);
  padding-top: var(--spacing-xxl);
  border-radius: var(--radius-xxl);
  background: white;
}

.landing-section-title {
  color: var(--landing-color-text);
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
  background: #f8f9fa;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
}

.feature-card {
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--sh-card);
  transition: all 0.3s ease;
}

/* .feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
} */

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

.feature-media {
  margin-bottom: var(--spacing-lg);
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: #fff;
}

.feature-video {
  width: 100%;
  display: block;
  aspect-ratio: 1 / 1;
  object-fit: cover;
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