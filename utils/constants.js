// utils/constants.js
export const API_ENDPOINTS = {
  AUTH: '/auth',
  ORDERS: '/orders',
  SHIPMENTS: '/shipments',
  FLEET: '/fleet',
  DRIVERS: '/drivers',
  CUSTOMERS: '/customers',
  INVENTORY: '/inventory',
  ANALYTICS: '/analytics',
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const VEHICLE_STATUS = {
  AVAILABLE: 'available',
  IN_TRANSIT: 'in_transit',
  MAINTENANCE: 'maintenance',
  OFFLINE: 'offline',
};

export const DRIVER_STATUS = {
  AVAILABLE: 'available',
  ON_DUTY: 'on_duty',
  OFF_DUTY: 'off_duty',
  ON_BREAK: 'on_break',
};

export const SHIPMENT_STATUS = {
  CREATED: 'created',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  FAILED_DELIVERY: 'failed_delivery',
};

export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

export const SCREEN_NAMES = {
  DASHBOARD: 'Dashboard',
  ORDERS: 'Orders',
  FLEET: 'Fleet',
  SHIPMENTS: 'Shipments',
  DRIVERS: 'Drivers',
  CUSTOMERS: 'Customers',
  INVENTORY: 'Inventory',
  ANALYTICS: 'Analytics',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
};

export const PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  MANAGE_ORDERS: 'manage_orders',
  MANAGE_FLEET: 'manage_fleet',
  MANAGE_DRIVERS: 'manage_drivers',
  MANAGE_CUSTOMERS: 'manage_customers',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_SETTINGS: 'manage_settings',
};

export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  APP_SETTINGS: 'app_settings',
  OFFLINE_DATA: 'offline_data',
};
