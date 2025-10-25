import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class CustomersApi {
  constructor() {
    this.baseURL = `${API_BASE_URL}/customers`;
  }

  // Get all customers
  async getAllCustomers(params = {}) {
    try {
      const response = await axios.get(this.baseURL, { params });
      return {
        success: true,
        data: response.data,
        message: 'Customers fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch customers'
      };
    }
  }

  // Get customer by ID
  async getCustomerById(customerId) {
    try {
      const response = await axios.get(`${this.baseURL}/${customerId}`);
      return {
        success: true,
        data: response.data,
        message: 'Customer fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch customer'
      };
    }
  }

  // Search customers
  async searchCustomers(searchTerm, params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/search`, {
        params: { q: searchTerm, ...params }
      });
      return {
        success: true,
        data: response.data,
        message: 'Customer search completed successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to search customers'
      };
    }
  }

  // Create new customer
  async createCustomer(customerData) {
    try {
      const response = await axios.post(this.baseURL, customerData);
      return {
        success: true,
        data: response.data,
        message: 'Customer created successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to create customer'
      };
    }
  }

  // Update customer
  async updateCustomer(customerId, updateData) {
    try {
      const response = await axios.put(`${this.baseURL}/${customerId}`, updateData);
      return {
        success: true,
        data: response.data,
        message: 'Customer updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to update customer'
      };
    }
  }

  // Partially update customer
  async patchCustomer(customerId, patchData) {
    try {
      const response = await axios.patch(`${this.baseURL}/${customerId}`, patchData);
      return {
        success: true,
        data: response.data,
        message: 'Customer updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to update customer'
      };
    }
  }

  // Delete customer
  async deleteCustomer(customerId) {
    try {
      const response = await axios.delete(`${this.baseURL}/${customerId}`);
      return {
        success: true,
        data: response.data,
        message: 'Customer deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to delete customer'
      };
    }
  }

  // Get customer orders
  async getCustomerOrders(customerId, params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/${customerId}/orders`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Customer orders fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch customer orders'
      };
    }
  }

  // Get customer analytics
  async getCustomerAnalytics(customerId, params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/${customerId}/analytics`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Customer analytics fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch customer analytics'
      };
    }
  }

  // Add customer note
  async addCustomerNote(customerId, noteData) {
    try {
      const response = await axios.post(`${this.baseURL}/${customerId}/notes`, noteData);
      return {
        success: true,
        data: response.data,
        message: 'Customer note added successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to add customer note'
      };
    }
  }

  // Get customer notes
  async getCustomerNotes(customerId, params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/${customerId}/notes`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Customer notes fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch customer notes'
      };
    }
  }

  // Update customer status
  async updateCustomerStatus(customerId, status) {
    try {
      const response = await axios.patch(`${this.baseURL}/${customerId}/status`, { status });
      return {
        success: true,
        data: response.data,
        message: 'Customer status updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to update customer status'
      };
    }
  }

  // Bulk operations
  async bulkUpdateCustomers(customerIds, updateData) {
    try {
      const response = await axios.patch(`${this.baseURL}/bulk`, {
        customerIds,
        updateData
      });
      return {
        success: true,
        data: response.data,
        message: 'Customers updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to update customers'
      };
    }
  }

  // Export customers
  async exportCustomers(params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/export`, {
        params,
        responseType: 'blob'
      });
      return {
        success: true,
        data: response.data,
        message: 'Customers exported successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to export customers'
      };
    }
  }
}

export default new CustomersApi();