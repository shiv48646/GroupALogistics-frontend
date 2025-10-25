// services/api/fleetApi.js
import apiClient from './client';

export const fleetApi = {
  // Vehicles
  getVehicles: async () => {
    return await apiClient.get('/fleet/vehicles');
  },

  getVehicle: async (vehicleId) => {
    return await apiClient.get(\/fleet/vehicles/\\);
  },

  createVehicle: async (vehicleData) => {
    return await apiClient.post('/fleet/vehicles', vehicleData);
  },

  updateVehicle: async (vehicleId, updateData) => {
    return await apiClient.put(\/fleet/vehicles/\\, updateData);
  },

  // Drivers
  getDrivers: async () => {
    return await apiClient.get('/fleet/drivers');
  },

  getDriver: async (driverId) => {
    return await apiClient.get(\/fleet/drivers/\\);
  },

  createDriver: async (driverData) => {
    return await apiClient.post('/fleet/drivers', driverData);
  },

  updateDriver: async (driverId, updateData) => {
    return await apiClient.put(\/fleet/drivers/\\, updateData);
  },

  // Tracking
  getVehicleLocation: async (vehicleId) => {
    return await apiClient.get(\/fleet/vehicles/\/location\);
  },

  updateVehicleLocation: async (vehicleId, locationData) => {
    return await apiClient.post(\/fleet/vehicles/\/location\, locationData);
  },

  // Maintenance
  getMaintenanceSchedule: async (vehicleId) => {
    return await apiClient.get(\/fleet/vehicles/\/maintenance\);
  },

  createMaintenanceRecord: async (vehicleId, maintenanceData) => {
    return await apiClient.post(\/fleet/vehicles/\/maintenance\, maintenanceData);
  },
};
