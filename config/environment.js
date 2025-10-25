// config/environment.js
const isDevelopment = __DEV__;

const config = {
  development: {
    API_BASE_URL: 'https://dev-api.groupalogistics.com',
    API_TIMEOUT: 10000,
    ENABLE_LOGGING: true,
    ENABLE_FLIPPER: true,
    MAP_API_KEY: 'your-dev-map-api-key',
  },
  production: {
    API_BASE_URL: 'https://api.groupalogistics.com',
    API_TIMEOUT: 15000,
    ENABLE_LOGGING: false,
    ENABLE_FLIPPER: false,
    MAP_API_KEY: 'your-prod-map-api-key',
  },
};

export default isDevelopment ? config.development : config.production;
