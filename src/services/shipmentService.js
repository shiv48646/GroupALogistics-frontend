import api from './api';

export const shipmentService = {
  // Get all shipments
  getShipments: async (params = {}) => {
    try {
      const response = await api.get('/shipments', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get single shipment
  getShipment: async (shipmentId) => {
    try {
      const response = await api.get(`/shipments/${shipmentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create shipment
  createShipment: async (shipmentData) => {
    try {
      const response = await api.post('/shipments', shipmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update shipment
  updateShipment: async (shipmentId, shipmentData) => {
    try {
      const response = await api.put(`/shipments/${shipmentId}`, shipmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Track shipment
  trackShipment: async (trackingNumber) => {
    try {
      const response = await api.get(`/shipments/track/${trackingNumber}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update shipment location
  updateLocation: async (shipmentId, location) => {
    try {
      const response = await api.patch(`/shipments/${shipmentId}/location`, location);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default shipmentService;
