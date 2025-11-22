import api from './api';

const shipmentService = {
  async getShipments() {
    return await api.request('/api/shipments');
  },
  
  async trackShipment(trackingNumber) {
    return await api.request(`/api/shipments/track/${trackingNumber}`);
  },
  
  async updateShipment(id, data) {
    return await api.request(`/api/shipments/${id}`, {
      method: 'PUT',
      body: data,
    });
  },
};

export default shipmentService;