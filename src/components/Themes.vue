<template>
  <div v-if="downloadStatus" class="download-popup" :class="downloadStatus">
    <span>{{ downloadMessage }}</span>
    <button @click="downloadStatus = null">Fermer</button>
  </div>
  <div class="themes-grid">
    <GenericCard v-for="theme in themes" :key="theme.id" variant="outlined">
      <template #header>
        <div class="theme-header">
          <span class="theme-icon">🎨</span>
          <h3>{{ theme.name }}</h3>
        </div>
      </template>
      <div class="theme-description">{{ theme.description }}</div>
      <div class="theme-footer">
        <GenericButton variant="primary" size="sm" @click="downloadTheme(theme)">
          Télécharger
        </GenericButton>
      </div>
    </GenericCard>
  </div>
</template>

<script>
import GenericCard from './base/GenericCard.vue'
import GenericButton from './base/GenericButton.vue'
import { themeService } from '@/services/theme.service.js'

export default {
  name: 'Themes',
  components: {
    GenericCard,
    GenericButton
  },
  data() {
    return {
      themes: [
        {
          id: 1,
          name: 'Mercure',
          description: 'Un thème élégant et performant pour Shopify.',
          filename: '1681234567890-Mercure.zip'
        },

      ],
      downloadStatus: null, // null | 'pending' | 'success' | 'error'
      downloadMessage: '',  // Message à afficher dans la popup
    }
  },
  methods: {
    downloadTheme: async function (theme) {
      this.downloadStatus = 'pending'
      this.downloadMessage = `Téléchargement du thème ${theme.name} en cours...`
      try {
        const filename = theme.filename
        const blob = await themeService.downloadThemeZip(filename)
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
        this.downloadStatus = 'success'
        this.downloadMessage = `Le thème ${theme.name} a bien été téléchargé !`
      } catch (error) {
        this.downloadStatus = 'error'
        this.downloadMessage = `Erreur lors du téléchargement du thème`
      }
    }
  }
}
</script>

<style scoped>
.themes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-md, 1.5rem);
  margin-top: var(--spacing-lg, 2rem);
}

.theme-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.theme-icon {
  font-size: var(--font-size-lg);
}

.theme-description {
  margin: var(--spacing-sm) 0;
  color: #374151;
}

.theme-footer {
  text-align: right;
}

.download-popup {
  position: fixed;
  top: 5vh;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #ddd;
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-blue);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.download-popup.pending {
  background-color: #fbbf24ba;
  backdrop-filter: blur(4px);
}

.download-popup.success {
  background-color: #22c55e;
  backdrop-filter: blur(4px);
}

.download-popup.error {
  background-color: #ef4444;
  backdrop-filter: blur(4px);
}
</style>