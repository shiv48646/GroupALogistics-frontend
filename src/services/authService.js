import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { accessToken, refreshToken, user } = response.data.data;

      // Store tokens and user data
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { accessToken, refreshToken, user } = response.data.data;

      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await api.post('/auth/logout');
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
    } catch (error) {
      // Clear local data even if API call fails
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
      throw error.response?.data || error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      return !!token;
    } catch (error) {
      return false;
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const response = await api.post('/auth/refresh', { refreshToken });
      const { accessToken } = response.data.data;

      await AsyncStorage.setItem('accessToken', accessToken);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default authService;
