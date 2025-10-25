// utils/helpers.js
import { ORDER_STATUS, VEHICLE_STATUS, DRIVER_STATUS } from './constants';

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDistance = (meters) => {
  if (meters < 1000) {
    return \\ m\;
  }
  return \\ km\;
};

export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return \\h \m\;
  }
  return \\m\;
};

export const getStatusColor = (status, type = 'order') => {
  const statusColors = {
    order: {
      [ORDER_STATUS.PENDING]: '#f39c12',
      [ORDER_STATUS.CONFIRMED]: '#3498db',
      [ORDER_STATUS.IN_TRANSIT]: '#9b59b6',
      [ORDER_STATUS.DELIVERED]: '#27ae60',
      [ORDER_STATUS.CANCELLED]: '#e74c3c',
    },
    vehicle: {
      [VEHICLE_STATUS.AVAILABLE]: '#27ae60',
      [VEHICLE_STATUS.IN_TRANSIT]: '#3498db',
      [VEHICLE_STATUS.MAINTENANCE]: '#f39c12',
      [VEHICLE_STATUS.OFFLINE]: '#95a5a6',
    },
    driver: {
      [DRIVER_STATUS.AVAILABLE]: '#27ae60',
      [DRIVER_STATUS.ON_DUTY]: '#3498db',
      [DRIVER_STATUS.OFF_DUTY]: '#95a5a6',
      [DRIVER_STATUS.ON_BREAK]: '#f39c12',
    },
  };
  
  return statusColors[type]?.[status] || '#7f8c8d';
};

export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateOrderNumber = () => {
  const prefix = 'ORD';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return \\\\\;
};

export const calculateDeliveryTime = (distance, trafficFactor = 1.2) => {
  // Assuming average speed of 50 km/h in city, 80 km/h on highway
  const averageSpeed = 50; // km/h
  const timeInHours = (distance / 1000 / averageSpeed) * trafficFactor;
  return Math.ceil(timeInHours * 60); // Return in minutes
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
