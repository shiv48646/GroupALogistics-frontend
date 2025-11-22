import api from './api';

const orderService = {
  async getOrders(page = 1, limit = 10) {
    return await api.request(`/api/orders?page=${page}&limit=${limit}`);
  },
  
  async getOrder(id) {
    return await api.request(`/api/orders/${id}`);
  },
  
  async createOrder(orderData) {
    return await api.request('/api/orders', {
      method: 'POST',
      body: orderData,
    });
  },
  
  async updateOrder(id, orderData) {
    return await api.request(`/api/orders/${id}`, {
      method: 'PUT',
      body: orderData,
    });
  },
};

export default orderService;