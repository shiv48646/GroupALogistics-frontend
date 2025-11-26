import api from './api';

export const analyticsService = {
  // Get dashboard data
  getDashboard: async () => {
    try {
      const response = await api.get('/analytics/dashboard');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get revenue analytics
  getRevenue: async (startDate, endDate) => {
    try {
      const response = await api.get('/analytics/revenue', {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get order statistics
  getOrderStats: async (period = '30days') => {
    try {
      const response = await api.get('/analytics/orders', {
        params: { period }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get fleet analytics
  getFleetAnalytics: async () => {
    try {
      const response = await api.get('/analytics/fleet');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default analyticsService;
