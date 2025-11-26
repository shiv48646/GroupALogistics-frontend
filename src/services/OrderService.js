import api from './api';

export const orderService = {
  getOrders: async (page = 1, limit = 20, params = {}) => {
    try {
      const response = await api.get('/orders', { 
        params: { page, limit, ...params }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getOrder: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateOrder: async (orderId, orderData) => {
    try {
      const response = await api.put(`/orders/${orderId}`, orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await api.patch(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteOrder: async (orderId) => {
    try {
      const response = await api.delete(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default orderService;