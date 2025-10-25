// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

// Import reducers
import customersReducer from './slices/CustomerSlice';
import billingReducer from './slices/billingSlice';
import inventoryReducer from './slices/inventorySlice';
import settingsReducer from './slices/settingSlice';
import fleetReducer from './slices/fleetSlice';
import userReducer from './reducers/userReducer';
import ordersReducer from './slices/ordersSlice';
import routesReducer from './slices/routesSlice';

// Combine reducers
const rootReducer = combineReducers({
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

  whitelist: ['user', 'orders', 'routes', 'customers', 'billing', 'inventory', 'settings','fleet'],

 // what to persist
  blacklist: [] // what NOT to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export const persistor = persistStore(store);
