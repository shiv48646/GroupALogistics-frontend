// Form utility functions for common operations across all forms

import { Alert } from 'react-native';

// Auto-generation utilities
export const generateId = (prefix, length = 8) => {
  const timestamp = Date.now().toString().slice(-length);
  const random = Math.floor(Math.random() * Math.pow(10, 3)).toString().padStart(3, '0');
  return `${prefix}-${timestamp}${random}`;
};

export const IdGenerators = {
  shipment: () => {
    const prefix = 'SHP';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  },
  
  customer: () => generateId('CUST'),
  driver: () => generateId('EMP'),
  vehicle: () => generateId('VEH'),
  route: () => generateId('RT'),
  
  // Generic ID generator
  generic: (prefix) => generateId(prefix),
};

// Date and time utilities
export const DateUtils = {
  // Format date for input fields (YYYY-MM-DD)
  formatDate: (date = new Date()) => {
    return date.toISOString().split('T')[0];
  },
  
  // Format time for input fields (HH:MM)
  formatTime: (date = new Date()) => {
    return date.toTimeString().slice(0, 5);
  },
  
  // Format datetime for display
  formatDateTime: (date) => {
    return new Date(date).toLocaleString();
  },
  
  // Check if date is in the future
  isFutureDate: (dateString) => {
    const inputDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate > today;
  },
  
  // Check if date is in the past
  isPastDate: (dateString) => {
    const inputDate = new Date(dateString);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return inputDate < today;
  },
  
  // Calculate age from birth date
  calculateAge: (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  },
  
  // Add days to a date
  addDays: (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
  
  // Get date range for recurring schedules
  getRecurringDates: (startDate, pattern, count = 10) => {
    const dates = [];
    let currentDate = new Date(startDate);
    
    for (let i = 0; i < count; i++) {
      dates.push(new Date(currentDate));
      
      switch (pattern) {
        case 'Daily':
          currentDate = DateUtils.addDays(currentDate, 1);
          break;
        case 'Weekly':
          currentDate = DateUtils.addDays(currentDate, 7);
          break;
        case 'Bi-weekly':
          currentDate = DateUtils.addDays(currentDate, 14);
          break;
        case 'Monthly':
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
      }
    }
    
    return dates;
  }
};

// String formatting utilities
export const StringUtils = {
  // Format phone number
  formatPhone: (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  },
  
  // Format currency
  formatCurrency: (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  },
  
  // Capitalize first letter of each word
  titleCase: (str) => {
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  },
  
  // Remove extra whitespace
  cleanText: (text) => {
    return text.trim().replace(/\s+/g, ' ');
  },
  
  // Generate initials from name
  getInitials: (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  },
  
  // Truncate text with ellipsis
  truncate: (text, length = 50) => {
    if (text.length <= length) return text;
    return text.substr(0, length).trim() + '...';
  }
};

// Form state management utilities
export const FormStateUtils = {
  // Create initial form state
  createInitialState: (schema, defaultValues = {}) => {
    const initialState = {};
    Object.keys(schema).forEach(key => {
      initialState[key] = defaultValues[key] || '';
    });
    return initialState;
  },
  
  // Reset form to initial state
  resetForm: (setFormData, initialState) => {
    setFormData(initialState);
  },
  
  // Check if form has been modified
  isFormDirty: (currentData, initialData) => {
    return JSON.stringify(currentData) !== JSON.stringify(initialData);
  },
  
  // Get changed fields
  getChangedFields: (currentData, initialData) => {
    const changes = {};
    Object.keys(currentData).forEach(key => {
      if (currentData[key] !== initialData[key]) {
        changes[key] = {
          from: initialData[key],
          to: currentData[key]
        };
      }
    });
    return changes;
  },
  
  // Count filled fields
  countFilledFields: (formData) => {
    return Object.values(formData).filter(value => 
      value !== null && value !== undefined && value.toString().trim() !== ''
    ).length;
  },
  
  // Calculate form completion percentage
  getCompletionPercentage: (formData, requiredFields = []) => {
    const totalFields = Object.keys(formData).length;
    const filledFields = FormStateUtils.countFilledFields(formData);
    const requiredFilled = requiredFields.filter(field => 
      formData[field] && formData[field].toString().trim() !== ''
    ).length;
    
    if (requiredFields.length > 0) {
      return Math.round((requiredFilled / requiredFields.length) * 100);
    }
    
    return Math.round((filledFields / totalFields) * 100);
  }
};

// Data processing utilities
export const DataUtils = {
  // Deep clone object
  deepClone: (obj) => {
    return JSON.parse(JSON.stringify(obj));
  },
  
  // Merge objects
  mergeObjects: (...objects) => {
    return Object.assign({}, ...objects);
  },
  
  // Extract specific fields from object
  extractFields: (obj, fields) => {
    const result = {};
    fields.forEach(field => {
      if (obj.hasOwnProperty(field)) {
        result[field] = obj[field];
      }
    });
    return result;
  },
  
  // Omit specific fields from object
  omitFields: (obj, fields) => {
    const result = { ...obj };
    fields.forEach(field => {
      delete result[field];
    });
    return result;
  },
  
  // Convert form data for API
  prepareForApi: (formData, transformations = {}) => {
    const apiData = DataUtils.deepClone(formData);
    
    // Apply transformations
    Object.keys(transformations).forEach(field => {
      if (apiData[field] !== undefined) {
        apiData[field] = transformations[field](apiData[field]);
      }
    });
    
    // Remove empty strings and null values
    Object.keys(apiData).forEach(key => {
      if (apiData[key] === '' || apiData[key] === null) {
        delete apiData[key];
      }
    });
    
    return apiData;
  },
  
  // Convert API response to form data
  prepareFromApi: (apiData, defaults = {}) => {
    const formData = DataUtils.mergeObjects(defaults, apiData);
    
    // Convert null values to empty strings
    Object.keys(formData).forEach(key => {
      if (formData[key] === null || formData[key] === undefined) {
        formData[key] = '';
      }
    });
    
    return formData;
  }
};

// Local storage utilities for form drafts
export const StorageUtils = {
  // Save form draft
  saveDraft: async (formId, formData) => {
    try {
      const key = `form_draft_${formId}`;
      const data = {
        formData,
        timestamp: new Date().toISOString(),
      };
      // In React Native, you'd use AsyncStorage
      // await AsyncStorage.setItem(key, JSON.stringify(data));
      console.log('Draft saved:', key, data);
      return true;
    } catch (_error) {
      console.error('Failed to save draft:', _error);
      return false;
    }
  },
  
  // Load form draft
  loadDraft: async (formId) => {
    try {
      const key = `form_draft_${formId}`;
      // const data = await AsyncStorage.getItem(key);
      // return data ? JSON.parse(data) : null;
      console.log('Loading draft for:', key);
      return null; // Placeholder
    } catch (_error) {
      console.error('Failed to load draft:', _error);
      return null;
    }
  },
  
  // Delete form draft
  deleteDraft: async (formId) => {
    try {
      const key = `form_draft_${formId}`;
      // await AsyncStorage.removeItem(key);
      console.log('Draft deleted:', key);
      return true;
    } catch (_error) {
      console.error('Failed to delete draft:', _error);
      return false;
    }
  },
  
  // Auto-save draft (with debouncing)
  createAutoSave: (formId, delay = 2000) => {
    let timeoutId;
    
    return (formData) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        StorageUtils.saveDraft(formId, formData);
      }, delay);
    };
  }
};

// Error handling utilities
export const ErrorUtils = {
  // Show validation errors
  showValidationErrors: (errors) => {
    const errorMessages = Object.entries(errors)
      .filter(([_, error]) => error)
      .map(([field, error]) => `${StringUtils.titleCase(field)}: ${error}`)
      .join('\n');
    
    if (errorMessages) {
      Alert.alert('Validation Errors', errorMessages);
    }
  },
  
  // Show success message
  showSuccess: (message, title = 'Success') => {
    Alert.alert(title, message);
  },
  
  // Show error message
  showError: (message, title = 'Error') => {
    Alert.alert(title, message);
  },
  
  // Confirm action
  confirmAction: (message, onConfirm, title = 'Confirm') => {
    Alert.alert(
      title,
      message,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: onConfirm }
      ]
    );
  },
  
  // Handle API errors
  handleApiError: (error) => {
    } catch (_error) {
    console.error('API Error', _error);
}
    
    if (error.response) {
      // Server responded with error
      const status = error.response.status;
      const message = error.response.data?.message || 'Server error occurred';
      
      switch (status) {
        case 400:
          ErrorUtils.showError('Invalid data provided. Please check your input.');
          break;
        case 401:
          ErrorUtils.showError('You are not authorized. Please log in again.');
          break;
        case 403:
          ErrorUtils.showError('You do not have permission to perform this action.');
          break;
        case 404:
          ErrorUtils.showError('The requested resource was not found.');
          break;
        case 500:
          ErrorUtils.showError('Server error. Please try again later.');
          break;
        default:
          ErrorUtils.showError(message);
      }
    } else if (error.request) {
      // Network error
      ErrorUtils.showError('Network error. Please check your connection.');
    } else {
      // Other error
      ErrorUtils.showError('An unexpected error occurred.');
    }
  }
};

// Address utilities
export const AddressUtils = {
  // Format address for display
  formatAddress: (address) => {
    const { street, city, state, zipCode, country } = address;
    const parts = [street, city, state, zipCode, country].filter(Boolean);
    return parts.join(', ');
  },
  
  // Parse address string
  parseAddress: (addressString) => {
    // Basic parsing - you might want to use a more sophisticated address parser
    const parts = addressString.split(',').map(part => part.trim());
    return {
      street: parts[0] || '',
      city: parts[1] || '',
      state: parts[2] || '',
      zipCode: parts[3] || '',
      country: parts[4] || 'United States'
    };
  },
  
  // Validate ZIP code
  validateZipCode: (zipCode, country = 'US') => {
    const patterns = {
      US: /^\d{5}(-\d{4})?$/,
      CA: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
      UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i,
    };
    
    const pattern = patterns[country] || patterns.US;
    return pattern.test(zipCode);
  }
};

// File handling utilities
export const FileUtils = {
  // Get file extension
  getFileExtension: (filename) => {
    return filename.split('.').pop().toLowerCase();
  },
  
  // Validate file type
  isValidFileType: (filename, allowedTypes = []) => {
    const extension = FileUtils.getFileExtension(filename);
    return allowedTypes.includes(extension);
  },
  
  // Format file size
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
  
  // Generate file name with timestamp
  generateFileName: (originalName, prefix = '') => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const extension = FileUtils.getFileExtension(originalName);
    const baseName = originalName.replace(`.${extension}`, '');
    
    return `${prefix}${prefix ? '_' : ''}${baseName}_${timestamp}.${extension}`;
  }
};

// Export all utilities as a single object
export default {
  IdGenerators,
  DateUtils,
  StringUtils,
  FormStateUtils,
  DataUtils,
  StorageUtils,
  ErrorUtils,
  AddressUtils,
  FileUtils,
  generateId,
};

