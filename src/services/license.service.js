import api from './ApiService';

const createLicense = async (payload) => {
  // Nécessite le scope "write_licenses"
  return await api.post('/api/admin/licenses', payload);
};

const createClientLicense = async (payload) => {
  // Route pour les clients
  return await api.post('/api/client/licenses', payload);
};

const getAllLicenses = async () => {
  // Nécessite le scope "read_licenses"
  return await api.get('/api/client/licenses');
};

const getLicenseById = async (id) => {
  // Nécessite le scope "read_licenses"
  return await api.get(`/api/admin/licenses/${id}`);
};

const updateLicense = async (id, payload) => {
  // Nécessite le scope "write_licenses"
  return await api.put(`/api/client/licenses/${id}`, payload);
};

const deleteLicense = async (id) => {
  // Nécessite le scope "super_admin"
  return await api.delete(`/api/admin/licenses/${id}`);
};

const deleteClientLicense = async (id) => {
  // Route pour les clients
  return await api.delete(`/api/client/licenses/${id}`);
};

export const licenseService = {
  createLicense,
  createClientLicense,
  getAllLicenses,
  getLicenseById,
  updateLicense,
  deleteLicense,
  deleteClientLicense,
};