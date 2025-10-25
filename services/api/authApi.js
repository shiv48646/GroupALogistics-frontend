// services/api/authApi.js
import apiClient from './client';

export const authApi = {
  login: async (email, password) => {
    return await apiClient.post('/auth/login', { email, password });
  },

  logout: async () => {
    return await apiClient.post('/auth/logout');
  },

  getProfile: async () => {
    return await apiClient.get('/auth/profile');
  },

  updateProfile: async (profileData) => {
    return await apiClient.put('/auth/profile', profileData);
  },
};
