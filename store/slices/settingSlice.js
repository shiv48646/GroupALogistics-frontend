// store/slices/settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userProfile: {
    name: 'Shiv Kumar',
    email: 'shiv@groupalogistics.com',
    phone: '+91 98765 43210',
    role: 'Admin',
    company: 'Group A Logistics'
  },
  preferences: {
    notifications: true,
    emailNotifications: true,
    pushNotifications: true,
    darkMode: false,
    language: 'English',
    autoSync: true,
    biometricAuth: false
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.userProfile = { ...state.userProfile, ...action.payload };
    },
    updatePreference: (state, action) => {
      const { key, value } = action.payload;
      state.preferences[key] = value;
    },
    togglePreference: (state, action) => {
      state.preferences[action.payload] = !state.preferences[action.payload];
    }
  }
});

export const { updateProfile, updatePreference, togglePreference } = settingsSlice.actions;
export const selectUserProfile = (state) => state.settings.userProfile;
export const selectPreferences = (state) => state.settings.preferences;

export default settingsSlice.reducer;