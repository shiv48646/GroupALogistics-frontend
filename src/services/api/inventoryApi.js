import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class InventoryApi {
  constructor() {
    this.baseURL = `${API_BASE_URL}/inventory`;
  }

  // Get all inventory items
  async getAllItems(params = {}) {
    try {
      const response = await axios.get(this.baseURL, { params });
      return {
        success: true,
        data: response.data,
        message: 'Inventory items fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch inventory items'
      };
    }
  }

  // Get item by ID
  async getItemById(itemId) {
    try {
      const response = await axios.get(`${this.baseURL}/${itemId}`);
      return {
        success: true,
        data: response.data,
        message: 'Inventory item fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch inventory item'
      };
    }
  }

  // Search inventory items
  async searchItems(searchTerm, params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/search`, {
        params: { q: searchTerm, ...params }
      });
      return {
        success: true,
        data: response.data,
        message: 'Inventory search completed successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to search inventory'
      };
    }
  }

  // Get items by category
  async getItemsByCategory(categoryId, params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/category/${categoryId}`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Category items fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch category items'
      };
    }
  }

  // Create new inventory item
  async createItem(itemData) {
    try {
      const response = await axios.post(this.baseURL, itemData);
      return {
        success: true,
        data: response.data,
        message: 'Inventory item created successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to create inventory item'
      };
    }
  }

  // Update inventory item
  async updateItem(itemId, updateData) {
    try {
      const response = await axios.put(`${this.baseURL}/${itemId}`, updateData);
      return {
        success: true,
        data: response.data,
        message: 'Inventory item updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to update inventory item'
      };
    }
  }

  // Update item stock
  async updateStock(itemId, stockData) {
    try {
      const response = await axios.patch(`${this.baseURL}/${itemId}/stock`, stockData);
      return {
        success: true,
        data: response.data,
        message: 'Stock updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to update stock'
      };
    }
  }

  // Adjust stock (add/remove)
  async adjustStock(itemId, adjustmentData) {
    try {
      const response = await axios.post(`${this.baseURL}/${itemId}/adjust`, adjustmentData);
      return {
        success: true,
        data: response.data,
        message: 'Stock adjusted successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to adjust stock'
      };
    }
  }

  // Delete inventory item
  async deleteItem(itemId) {
    try {
      const response = await axios.delete(`${this.baseURL}/${itemId}`);
      return {
        success: true,
        data: response.data,
        message: 'Inventory item deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to delete inventory item'
      };
    }
  }

  // Get low stock items
  async getLowStockItems(params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/low-stock`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Low stock items fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch low stock items'
      };
    }
  }

  // Get out of stock items
  async getOutOfStockItems(params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/out-of-stock`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Out of stock items fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch out of stock items'
      };
    }
  }

  // Get stock history
  async getStockHistory(itemId, params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/${itemId}/history`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Stock history fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch stock history'
      };
    }
  }

  // Bulk stock update
  async bulkUpdateStock(stockUpdates) {
    try {
      const response = await axios.patch(`${this.baseURL}/bulk-stock`, { stockUpdates });
      return {
        success: true,
        data: response.data,
        message: 'Bulk stock update completed successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to update stock in bulk'
      };
    }
  }

  // Generate inventory report
  async generateReport(params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/report`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Inventory report generated successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to generate inventory report'
      };
    }
  }

  // Export inventory data
  async exportInventory(params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/export`, {
        params,
        responseType: 'blob'
      });
      return {
        success: true,
        data: response.data,
        message: 'Inventory exported successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to export inventory'
      };
    }
  }

  // Import inventory data
  async importInventory(formData) {
    try {
      const response = await axios.post(`${this.baseURL}/import`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return {
        success: true,
        data: response.data,
        message: 'Inventory imported successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to import inventory'
      };
    }
  }

  // Get inventory statistics
  async getInventoryStats(params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/stats`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Inventory statistics fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch inventory statistics'
      };
    }
  }

  // Set reorder point
  async setReorderPoint(itemId, reorderData) {
    try {
      const response = await axios.patch(`${this.baseURL}/${itemId}/reorder-point`, reorderData);
      return {
        success: true,
        data: response.data,
        message: 'Reorder point set successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to set reorder point'
      };
    }
  }
}

export default new InventoryApi();