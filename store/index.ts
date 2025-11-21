// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import reducers
import authReducer from './slices/authSlice';
import userReducer from './reducers/userReducer';
import appReducer from './reducers/appReducer';
import customersReducer from './slices/CustomerSlice';
import ordersReducer from './slices/ordersSlice';
import routesReducer from './slices/routesSlice';
import billingReducer from './slices/billingSlice';
import inventoryReducer from './slices/inventorySlice';
import settingsReducer from './slices/settingSlice';
import fleetReducer from './slices/fleetSlice';

console.log('=== STORE INDEX.TS LOADING ===');
console.log('authReducer:', typeof authReducer);

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'user'],
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  app: appReducer,
  customers: customersReducer,
  orders: ordersReducer,
  routes: routesReducer,
  billing: billingReducer,
  inventory: inventoryReducer,
  settings: settingsReducer,
  fleet: fleetReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

console.log('=== STORE CREATED ===');
console.log('Initial state:', store.getState());
console.log('Auth state:', store.getState().auth);
console.log('====================');

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
