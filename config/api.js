// config/api.js
export const API_CONFIG = {
  // For Physical Device: Use your computer's IP address
  BASE_URL: 'http://192.168.1.18:5000/api',
  
  ENDPOINTS: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    GET_ME: '/auth/me',
    
    CUSTOMERS: '/customers',
    CUSTOMER_BY_ID: (id) => '/customers/' + id,
    
    FLEET: '/fleet',
    SHIPMENTS: '/shipments',
    ORDERS: '/orders',
  }
};
