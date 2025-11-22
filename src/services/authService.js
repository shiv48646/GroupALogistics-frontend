import api from './api';

const authService = {
  async login(email, password) {
    const data = await api.request('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    
    if (data.success && data.data.accessToken) {
      await api.setToken(data.data.accessToken);
      return data.data;
    }
    throw new Error('Login failed');
  },
  
  async register(userData) {
    const data = await api.request('/api/auth/register', {
      method: 'POST',
      body: userData,
    });
    
    if (data.success) {
      await api.setToken(data.data.accessToken);
      return data.data;
    }
    throw new Error('Registration failed');
  },
  
  async getCurrentUser() {
    return await api.request('/api/auth/me');
  },
  
  async logout() {
    await api.removeToken();
  },
};

export default authService;