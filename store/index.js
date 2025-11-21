// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

// Import reducers
import authReducer from './slices/authSlice';
import customersReducer from './slices/CustomerSlice';
import billingReducer from './slices/billingSlice';
import inventoryReducer from './slices/inventorySlice';
import settingsReducer from './slices/settingSlice';
import fleetReducer from './slices/fleetSlice';
import userReducer from './reducers/userReducer';
import ordersReducer from './slices/ordersSlice';
import routesReducer from './slices/routesSlice';

// Test if authReducer is valid
console.log('authReducer:', typeof authReducer);
console.log('authReducer is:', authReducer);

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  orders: ordersReducer,
  routes: routesReducer,
  customers: customersReducer,
  billing: billingReducer,
  inventory: inventoryReducer,
  settings: settingsReducer,
  fleet: fleetReducer
});

// Persistence config
const persistConfig = {
  key: 'groupalogistics-v1',
  storage: AsyncStorage,
  whitelist: ['auth', 'user', 'orders', 'routes', 'customers', 'billing', 'inventory', 'settings', 'fleet'],
  blacklist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER']
      }
    })
});

export const persistor = persistStore(store);

// Debug store
console.log('=== STORE INITIALIZED ===');
console.log('Initial State:', store.getState());
console.log('Auth State:', store.getState().auth);
console.log('========================');
