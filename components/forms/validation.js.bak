// Form validation utilities for consistent validation across all forms

// Basic validation rules
export const ValidationRules = {
  required: (value, fieldName = 'Field') => {
    if (!value || value.toString().trim() === '') {
      return `${fieldName} is required`;
    }
    return null;
  },

  email: (value) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  phone: (value) => {
    if (value && !/^\+?[\d\s\-\(\)]{10,}$/.test(value)) {
      return 'Please enter a valid phone number';
    }
    return null;
  },

  numeric: (value, fieldName = 'Field') => {
    if (value && isNaN(parseFloat(value))) {
      return `${fieldName} must be a valid number`;
    }
    return null;
  },

  positiveNumber: (value, fieldName = 'Field') => {
    if (value && (isNaN(parseFloat(value)) || parseFloat(value) <= 0)) {
      return `${fieldName} must be a positive number`;
    }
    return null;
  },

  minLength: (minLength) => (value, fieldName = 'Field') => {
    if (value && value.length < minLength) {
      return `${fieldName} must be at least ${minLength} characters`;
    }
    return null;
  },

  maxLength: (maxLength) => (value, fieldName = 'Field') => {
    if (value && value.length > maxLength) {
      return `${fieldName} must not exceed ${maxLength} characters`;
    }
    return null;
  },

  date: (value, fieldName = 'Date') => {
    if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return `${fieldName} must be in YYYY-MM-DD format`;
    }
    if (value && new Date(value).toString() === 'Invalid Date') {
      return `${fieldName} is not a valid date`;
    }
    return null;
  },

  futureDate: (value, fieldName = 'Date') => {
    if (value) {
      const inputDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (inputDate <= today) {
        return `${fieldName} must be in the future`;
      }
    }
    return null;
  },

  pastDate: (value, fieldName = 'Date') => {
    if (value) {
      const inputDate = new Date(value);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      
      if (inputDate > today) {
        return `${fieldName} cannot be in the future`;
      }
    }
    return null;
  },

  vin: (value) => {
    if (value && (value.length !== 17 || !/^[A-HJ-NPR-Z0-9]{17}$/i.test(value))) {
      return 'VIN must be exactly 17 characters (letters and numbers, no I, O, or Q)';
    }
    return null;
  },

  zipCode: (value) => {
    if (value && !/^\d{5}(-\d{4})?$/.test(value)) {
      return 'Please enter a valid ZIP code (12345 or 12345-6789)';
    }
    return null;
  },

  licensePlate: (value) => {
    if (value && !/^[A-Z0-9\-\s]{2,10}$/i.test(value)) {
      return 'Please enter a valid license plate';
    }
    return null;
  },

  percentage: (value, fieldName = 'Percentage') => {
    if (value && (isNaN(parseFloat(value)) || parseFloat(value) < 0 || parseFloat(value) > 100)) {
      return `${fieldName} must be between 0 and 100`;
    }
    return null;
  },

  rating: (value, max = 5, fieldName = 'Rating') => {
    if (value && (isNaN(parseFloat(value)) || parseFloat(value) < 0 || parseFloat(value) > max)) {
      return `${fieldName} must be between 0 and ${max}`;
    }
    return null;
  },

  year: (value, fieldName = 'Year') => {
    const currentYear = new Date().getFullYear();
    if (value && (isNaN(parseInt(value)) || parseInt(value) < 1900 || parseInt(value) > currentYear + 1)) {
      return `${fieldName} must be between 1900 and ${currentYear + 1}`;
    }
    return null;
  },

  age: (birthDate, minAge = 18, fieldName = 'Age') => {
    if (birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);
      const age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      
      if (age < minAge) {
        return `Must be at least ${minAge} years old`;
      }
    }
    return null;
  },

  trackingNumber: (value) => {
    if (value && !/^[A-Z]{3}\d{11}$/.test(value)) {
      return 'Tracking number must be in format: ABC12345678901';
    }
    return null;
  },

  employeeId: (value) => {
    if (value && !/^EMP-\d{8}$/.test(value)) {
      return 'Employee ID must be in format: EMP-12345678';
    }
    return null;
  },

  vehicleNumber: (value) => {
    if (value && !/^VEH-\d{8}$/.test(value)) {
      return 'Vehicle number must be in format: VEH-12345678';
    }
    return null;
  }
};

// Validation schemas for different forms
export const ValidationSchemas = {
  shipment: {
    trackingNumber: [ValidationRules.required, ValidationRules.trackingNumber],
    customerId: [(value) => ValidationRules.required(value, 'Customer')],
    pickupAddress: [(value) => ValidationRules.required(value, 'Pickup address')],
    deliveryAddress: [(value) => ValidationRules.required(value, 'Delivery address')],
    packageWeight: [
      (value) => ValidationRules.required(value, 'Package weight'),
      (value) => ValidationRules.positiveNumber(value, 'Package weight')
    ],
    packageValue: [(value) => ValidationRules.numeric(value, 'Package value')],
    scheduledPickupDate: [
      (value) => ValidationRules.required(value, 'Scheduled pickup date'),
      (value) => ValidationRules.date(value, 'Scheduled pickup date')
    ],
    scheduledDeliveryDate: [
      (value) => ValidationRules.required(value, 'Scheduled delivery date'),
      (value) => ValidationRules.date(value, 'Scheduled delivery date')
    ]
  },

  vehicle: {
    vehicleNumber: [ValidationRules.required, ValidationRules.vehicleNumber],
    licensePlate: [
      (value) => ValidationRules.required(value, 'License plate'),
      ValidationRules.licensePlate
    ],
    vin: [
      (value) => ValidationRules.required(value, 'VIN'),
      ValidationRules.vin
    ],
    make: [(value) => ValidationRules.required(value, 'Make')],
    model: [(value) => ValidationRules.required(value, 'Model')],
    year: [
      (value) => ValidationRules.required(value, 'Year'),
      ValidationRules.year
    ],
    capacity: [
      (value) => ValidationRules.required(value, 'Capacity'),
      (value) => ValidationRules.positiveNumber(value, 'Capacity')
    ],
    maxWeight: [
      (value) => ValidationRules.required(value, 'Maximum weight'),
      (value) => ValidationRules.positiveNumber(value, 'Maximum weight')
    ],
    currentOdometer: [(value) => ValidationRules.numeric(value, 'Odometer reading')],
    insuranceProvider: [(value) => ValidationRules.required(value, 'Insurance provider')],
    insurancePolicyNumber: [(value) => ValidationRules.required(value, 'Insurance policy number')],
    insuranceExpiryDate: [
      (value) => ValidationRules.required(value, 'Insurance expiry date'),
      (value) => ValidationRules.date(value, 'Insurance expiry date'),
      (value) => ValidationRules.futureDate(value, 'Insurance expiry date')
    ],
    registrationNumber: [(value) => ValidationRules.required(value, 'Registration number')],
    registrationExpiryDate: [
      (value) => ValidationRules.required(value, 'Registration expiry date'),
      (value) => ValidationRules.date(value, 'Registration expiry date'),
      (value) => ValidationRules.futureDate(value, 'Registration expiry date')
    ]
  },

  driver: {
    employeeId: [ValidationRules.required, ValidationRules.employeeId],
    firstName: [(value) => ValidationRules.required(value, 'First name')],
    lastName: [(value) => ValidationRules.required(value, 'Last name')],
    email: [
      (value) => ValidationRules.required(value, 'Email'),
      ValidationRules.email
    ],
    phone: [
      (value) => ValidationRules.required(value, 'Phone'),
      ValidationRules.phone
    ],
    dateOfBirth: [
      (value) => ValidationRules.required(value, 'Date of birth'),
      (value) => ValidationRules.date(value, 'Date of birth'),
      (value) => ValidationRules.pastDate(value, 'Date of birth'),
      (value) => ValidationRules.age(value, 18)
    ],
    address: [(value) => ValidationRules.required(value, 'Address')],
    city: [(value) => ValidationRules.required(value, 'City')],
    state: [(value) => ValidationRules.required(value, 'State')],
    zipCode: [
      (value) => ValidationRules.required(value, 'ZIP code'),
      ValidationRules.zipCode
    ],
    emergencyContactName: [(value) => ValidationRules.required(value, 'Emergency contact name')],
    emergencyContactPhone: [
      (value) => ValidationRules.required(value, 'Emergency contact phone'),
      ValidationRules.phone
    ],
    licenseNumber: [(value) => ValidationRules.required(value, 'License number')],
    licenseExpiryDate: [
      (value) => ValidationRules.required(value, 'License expiry date'),
      (value) => ValidationRules.date(value, 'License expiry date'),
      (value) => ValidationRules.futureDate(value, 'License expiry date')
    ],
    hireDate: [
      (value) => ValidationRules.required(value, 'Hire date'),
      (value) => ValidationRules.date(value, 'Hire date'),
      (value) => ValidationRules.pastDate(value, 'Hire date')
    ],
    salary: [(value) => ValidationRules.numeric(value, 'Salary')],
    totalDeliveries: [(value) => ValidationRules.numeric(value, 'Total deliveries')],
    onTimePercentage: [(value) => ValidationRules.percentage(value, 'On-time percentage')],
    customerRating: [(value) => ValidationRules.rating(value, 5, 'Customer rating')],
    performanceRating: [(value) => ValidationRules.rating(value, 5, 'Performance rating')]
  }
};

// Main validation function
export const validateField = (value, rules = []) => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) {
      return error;
    }
  }
  return null;
};

// Validate entire form using schema
export const validateForm = (formData, schema) => {
  const errors = {};
  
  Object.keys(schema).forEach(fieldName => {
    const fieldValue = formData[fieldName];
    const fieldRules = schema[fieldName];
    const fieldError = validateField(fieldValue, fieldRules);
    
    if (fieldError) {
      errors[fieldName] = fieldError;
    }
  });
  
  return errors;
};

// Custom validation for business logic
export const BusinessValidation = {
  // Validate that pickup date is before delivery date
  validatePickupBeforeDelivery: (pickupDate, deliveryDate) => {
    if (pickupDate && deliveryDate) {
      const pickup = new Date(pickupDate);
      const delivery = new Date(deliveryDate);
      
      if (pickup >= delivery) {
        return 'Pickup date must be before delivery date';
      }
    }
    return null;
  },

  // Validate that maintenance date is logical
  validateMaintenanceDates: (lastMaintenance, nextMaintenance) => {
    if (lastMaintenance && nextMaintenance) {
      const last = new Date(lastMaintenance);
      const next = new Date(nextMaintenance);
      
      if (last >= next) {
        return 'Next maintenance date must be after last maintenance date';
      }
    }
    return null;
  },

  // Validate that medical clearance is current
  validateMedicalClearance: (clearanceDate, expiryDate) => {
    if (clearanceDate && expiryDate) {
      const clearance = new Date(clearanceDate);
      const expiry = new Date(expiryDate);
      
      if (clearance >= expiry) {
        return 'Medical expiry date must be after clearance date';
      }
      
      const today = new Date();
      if (expiry <= today) {
        return 'Medical clearance has expired';
      }
    }
    return null;
  },

  // Validate driver age for commercial license
  validateCommercialLicenseAge: (birthDate, licenseClass) => {
    if (birthDate && licenseClass && licenseClass.includes('CDL')) {
      const age = ValidationRules.age(birthDate, 21);
      if (age) {
        return 'Must be at least 21 years old for Commercial Driver\'s License';
      }
    }
    return null;
  },

  // Validate package dimensions format
  validatePackageDimensions: (dimensions) => {
    if (dimensions && !/^\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*x\s*\d+(\.\d+)?$/i.test(dimensions)) {
      return 'Dimensions must be in format: Length x Width x Height (e.g., 30 x 20 x 15)';
    }
    return null;
  },

  // Validate vehicle capacity vs max weight
  validateVehicleCapacityWeight: (capacity, maxWeight) => {
    if (capacity && maxWeight) {
      const cap = parseFloat(capacity);
      const weight = parseFloat(maxWeight);
      
      // Basic rule: capacity in m³ should correlate with weight capacity
      // Rough estimate: 1 m³ ≈ 200-300 kg for most cargo
      if (cap > 0 && weight > 0 && (weight / cap) < 100) {
        return 'Maximum weight seems low compared to capacity. Please verify.';
      }
    }
    return null;
  }
};

// Async validation for server-side checks
export const AsyncValidation = {
  // Check if tracking number is unique
  validateUniqueTrackingNumber: async (trackingNumber, currentId = null) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock logic - replace with actual API call
      const existingTrackingNumbers = ['SHP12345678901', 'SHP23456789012'];
      
      if (existingTrackingNumbers.includes(trackingNumber) && currentId !== trackingNumber) {
        return 'Tracking number already exists';
      }
      
      return null;
    } catch (_error) {
      return 'Unable to validate tracking number. Please try again.';
    }
  },

  // Check if license plate is unique
  validateUniqueLicensePlate: async (licensePlate, currentId = null) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const existingPlates = ['ABC-123', 'DEF-456', 'GHI-789'];
      
      if (existingPlates.includes(licensePlate.toUpperCase()) && currentId !== licensePlate) {
        return 'License plate already registered';
      }
      
      return null;
    } catch (_error) {
      return 'Unable to validate license plate. Please try again.';
    }
  },

  // Check if email is unique
  validateUniqueEmail: async (email, currentId = null) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const existingEmails = ['john@example.com', 'jane@example.com'];
      
      if (existingEmails.includes(email.toLowerCase()) && currentId !== email) {
        return 'Email address is already in use';
      }
      
      return null;
    } catch (_error) {
      return 'Unable to validate email. Please try again.';
    }
  }
};

// Utility functions for form validation
export const ValidationUtils = {
  // Check if form has any errors
  hasErrors: (errors) => {
    return Object.keys(errors).some(key => errors[key]);
  },

  // Get first error message
  getFirstError: (errors) => {
    const errorKeys = Object.keys(errors);
    return errorKeys.length > 0 ? errors[errorKeys[0]] : null;
  },

  // Format validation errors for display
  formatErrors: (errors) => {
    return Object.entries(errors)
      .filter(([_, error]) => error)
      .map(([field, error]) => `${field}: ${error}`)
      .join('\n');
  },

  // Clear specific field errors
  clearFieldError: (errors, fieldName) => {
    const newErrors = { ...errors };
    delete newErrors[fieldName];
    return newErrors;
  },

  // Validate on change with debouncing
  createDebouncedValidator: (validator, delay = 300) => {
    let timeoutId;
    
    return (value, callback) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const error = validator(value);
        callback(error);
      }, delay);
    };
  }
};

export default {
  ValidationRules,
  ValidationSchemas,
  validateField,
  validateForm,
  BusinessValidation,
  AsyncValidation,
  ValidationUtils
};
