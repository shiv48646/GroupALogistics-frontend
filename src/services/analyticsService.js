import api from './api';

const analyticsService = {
  async getDashboard() {
    return await api.request('/api/analytics/dashboard');
  },
  
  async getRevenueTrends(days = 30) {
    return await api.request(`/api/analytics/revenue-trends?days=${days}`);
  },
  
  async getTopCustomers(limit = 10) {
    return await api.request(`/api/analytics/top-customers?limit=${limit}`);
  },
};

export default analyticsService;