import store from '@/store';
import api from './ApiService.js';

const login = async (credentials) => {
  const response = await api.post('/admin/auth/login', credentials);
  
  // Stocker les tokens via l'ApiService qui gère déjà le localStorage
  if (response.accessToken) {
    api.setTokens(response.accessToken, response.refreshToken);
  }
  
  return {
    user: response.user || response.admin,
    token: response.accessToken,
    refreshToken: response.refreshToken
  };
};

const logout = async () => {
  try {
    await api.post('/admin/auth/logout');
  } catch (error) {
    console.error('Erreur lors de la déconnexion', error);
  } finally {
    // Nettoyer les tokens
    api.clearTokens();
  }
};

const getCurrentUser = async () => {
  const response = await api.get('/admin/auth/profile');
  return response.user || response.admin || response;
};

export const userService = {
  login,
  logout,
  getCurrentUser,
};