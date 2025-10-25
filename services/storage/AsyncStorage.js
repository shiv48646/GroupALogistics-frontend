// services/storage/AsyncStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../utils/constants';

class StorageService {
  // Generic methods
  async setItem(key, value) {
    try {
      const stringValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
      return true;
    } catch (error) {
      console.error('StorageService setItem error:', error);
      return false;
    }
  }

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('StorageService getItem error:', error);
      return null;
    }
  }

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('StorageService removeItem error:', error);
      return false;
    }
  }

  async clear() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('StorageService clear error:', error);
      return false;
    }
  }

  // Specific methods for app data
  async saveUserToken(token) {
    return await this.setItem(STORAGE_KEYS.USER_TOKEN, token);
  }

  async getUserToken() {
    return await this.getItem(STORAGE_KEYS.USER_TOKEN);
  }

  async removeUserToken() {
    return await this.removeItem(STORAGE_KEYS.USER_TOKEN);
  }

  async saveUserData(userData) {
    return await this.setItem(STORAGE_KEYS.USER_DATA, userData);
  }

  async getUserData() {
    return await this.getItem(STORAGE_KEYS.USER_DATA);
  }

  async saveAppSettings(settings) {
    return await this.setItem(STORAGE_KEYS.APP_SETTINGS, settings);
  }

  async getAppSettings() {
    return await this.getItem(STORAGE_KEYS.APP_SETTINGS);
  }

  async saveOfflineData(data) {
    return await this.setItem(STORAGE_KEYS.OFFLINE_DATA, data);
  }

  async getOfflineData() {
    return await this.getItem(STORAGE_KEYS.OFFLINE_DATA);
  }
}

export default new StorageService();
