// store/reducers/appReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isReady: false,
  theme: 'light',
  language: 'en',
  notifications: true,
  isLoading: false,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppReady: (state, action) => {
      state.isReady = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setAppReady,
  setTheme,
  setLanguage,
  toggleNotifications,
  setLoading,
  setError,
  clearError,
} = appSlice.actions;

export default appSlice.reducer;