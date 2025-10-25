// services/api/ordersApi.js
import apiClient from './client';

export const ordersApi = {
  // Get all orders
  getOrders: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return await apiClient.get(\/orders?\\);
  },

  // Get single order
  getOrder: async (orderId) => {
    return await apiClient.get(\/orders/\\);
  },

  // Create new order
  createOrder: async (orderData) => {
    return await apiClient.post('/orders', orderData);
  },

  // Update order
  updateOrder: async (orderId, updateData) => {
    return await apiClient.put(\/orders/\\, updateData);
  },

  // Delete order
  deleteOrder: async (orderId) => {
    return await apiClient.delete(\/orders/\\);
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    return await apiClient.patch(\/orders/\/status\, { status });
  },

  // Assign driver to order
  assignDriver: async (orderId, driverId) => {
    return await apiClient.post(\/orders/\/assign\, { driverId });
  },

  // Get order tracking
  getOrderTracking: async (orderId) => {
    return await apiClient.get(\/orders/\/tracking\);
  },
};
