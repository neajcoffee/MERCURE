/**
 * Configuration des cookies httpOnly pour l'application
 * 
 * Ce fichier documente la configuration nécessaire pour que le frontend
 * puisse recevoir et gérer les cookies httpOnly envoyés par le backend.
 */

export const COOKIE_CONFIG = {
  // Configuration des requêtes fetch pour inclure les cookies
  fetchOptions: {
    credentials: 'include', // ✅ Essentiel pour recevoir les cookies httpOnly
  },
  
  // Types de cookies supportés
  supportedCookies: {
    httpOnly: true,      // ✅ Cookies sécurisés non accessibles via JavaScript
    secure: true,        // ✅ Cookies envoyés uniquement en HTTPS
    sameSite: 'strict',  // ✅ Protection CSRF
  },
  
  // Domaines autorisés pour les cookies
  allowedDomains: [
    'localhost',
    '127.0.0.1',
    // Ajouter vos domaines de production ici
  ],
  
  // Configuration CORS recommandée pour le backend
  backendCORS: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://votre-domaine.com'] 
      : ['http://localhost:8080', 'http://localhost:3000'],
    credentials: true, // ✅ Essentiel pour les cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
}

/**
 * Vérification de la compatibilité des cookies
 */
export const checkCookieSupport = () => {
  const tests = {
    httpOnly: 'Les cookies httpOnly sont supportés',
    secure: 'Les cookies sécurisés sont supportés',
    sameSite: 'L\'attribut SameSite est supporté'
  }
  
  // Test basique de support des cookies
  const hasCookies = navigator.cookieEnabled
  
  if (!hasCookies) {
    console.warn('⚠️ Les cookies sont désactivés dans le navigateur')
    return false
  }
  
  console.log('✅ Support des cookies détecté')
  return true
}

export default COOKIE_CONFIG 