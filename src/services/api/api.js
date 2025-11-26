import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚡ IMPORTANT: Replace with your computer's IP address
const API_URL = 'https://groupalogistics-backend.onrender.com';

const api = {
  baseURL: API_URL,
  
  async getToken() {
    return await AsyncStorage.getItem('token');
  },
  
  async setToken(token) {
    await AsyncStorage.setItem('token', token);
  },
  
  async removeToken() {
    await AsyncStorage.removeItem('token');
  },
  
  async request(endpoint, options = {}) {
    const token = await this.getToken();
    
    const config = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...(options.body && { body: JSON.stringify(options.body) }),
    };
    
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
};

export default api;