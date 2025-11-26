import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5000/api'  // Development (use your computer's IP for real device testing)
  : 'https://groupalogistics-backend.onrender.com/api';  // Production

console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds (important for Render free tier)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        
        if (refreshToken) {
          const response = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            { refreshToken }
          );

          const { accessToken } = response.data.data;
          await AsyncStorage.setItem('accessToken', accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
        // You can emit an event here to redirect to login
        console.error('Session expired, please login again');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
