// config/api.js
import environment from './environment';

export const apiConfig = {
  baseURL: environment.API_BASE_URL,
  timeout: environment.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  endpoints: {
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      register: '/auth/register',
      profile: '/auth/profile',
      resetPassword: '/auth/reset-password',
    },
    orders: {
      list: '/orders',
      create: '/orders',
      update: (id) => \/orders/\\,
      delete: (id) => \/orders/\\,
      details: (id) => \/orders/\\,
    },
    fleet: {
      vehicles: '/fleet/vehicles',
      drivers: '/fleet/drivers',
      tracking: '/fleet/tracking',
      maintenance: '/fleet/maintenance',
    },
    shipments: {
      list: '/shipments',
      create: '/shipments',
      track: (id) => \/shipments/\/track\,
      updateStatus: (id) => \/shipments/\/status\,
    },
    analytics: {
      dashboard: '/analytics/dashboard',
      reports: '/analytics/reports',
      performance: '/analytics/performance',
    },
  },
};

export default apiConfig;
