import api from './ApiService.js'

/**
 * Télécharge un thème au format zip depuis l'API
 * @param {string} filename - Le nom du fichier zip à télécharger
 * @returns {Promise<Blob>} - Le blob du fichier zip
 */
const downloadThemeZip = async (filename) => {
  if (!filename) throw new Error('Le nom du fichier est requis')
  // On utilise l'endpoint tel que demandé
  const endpoint = `/api/client/download-zip/${encodeURIComponent(filename)}`
  // On force le parsing en blob (ApiService gère déjà le parseResponse)
  return await api.request(endpoint, { method: 'GET' })
}

export const themeService = {
  downloadThemeZip,
} 