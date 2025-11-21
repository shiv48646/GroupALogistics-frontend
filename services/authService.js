// services/authService.js
import apiService from './api';
import { API_CONFIG } from '../config/api';

export const authService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await apiService.post(API_CONFIG.ENDPOINTS.LOGIN, {
        email,
        password,
      });

      if (response.success && response.data) {
        // Save tokens
        await apiService.saveTokens(
          response.data.accessToken,
          response.data.refreshToken
        );
        return response.data;
      }

      throw new Error(response.message || 'Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await apiService.post(API_CONFIG.ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await apiService.clearTokens();
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_ME);
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await apiService.post(API_CONFIG.ENDPOINTS.REGISTER, userData);
      
      if (response.success && response.data) {
        await apiService.saveTokens(
          response.data.accessToken,
          response.data.refreshToken
        );
        return response.data;
      }

      throw new Error(response.message || 'Registration failed');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
};
