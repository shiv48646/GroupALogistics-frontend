// Forms Index - Export all form components and utilities  
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import DriverForm from './DriverForm';
import VehicleForm from './VehicleForm';
import RouteForm from './RouteForm';
import ShipmentForm from './ShipmentForm';
import CustomerForm from './customerform'; // Note: lowercase filename

// Import validation utilities
import { 
  validateForm, 
  ValidationSchemas,
  IdGenerators 
} from './validation';

// UI Components for forms
const FormSection = ({ title, children, style }) => (
  <View style={[{ marginBottom: 20 }, style]}>
    {title && (
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333'
      }}>
        {title}
      </Text>
    )}
    {children}
  </View>
);

const FormButton = ({ title, onPress, style, variant = 'primary', disabled = false }) => {
  const baseStyle = {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  };

  const variants = {
    primary: {
      backgroundColor: disabled ? '#ccc' : '#007AFF',
    },
    secondary: {
      backgroundColor: disabled ? '#f0f0f0' : '#f8f9fa',
      borderWidth: 1,
      borderColor: disabled ? '#ddd' : '#dee2e6',
    },
    danger: {
      backgroundColor: disabled ? '#ffcccb' : '#dc3545',
    },
    success: {
      backgroundColor: disabled ? '#d4edda' : '#28a745',
    },
    warning: {
      backgroundColor: disabled ? '#fff3cd' : '#ffc107',
    }
  };

  const textColor = variant === 'secondary' ? '#495057' : '#fff';

  return (
    <TouchableOpacity 
      style={[baseStyle, variants[variant], style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text style={{ 
        color: disabled ? '#999' : textColor, 
        fontWeight: '600',
        fontSize: 16 
      }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const FormHeader = ({ title, subtitle, style }) => (
  <View style={[{ marginBottom: 30, alignItems: 'center' }, style]}>
    <Text style={{
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5
    }}>
      {title}
    </Text>
    {subtitle && (
      <Text style={{
        fontSize: 16,
        color: '#666',
        textAlign: 'center'
      }}>
        {subtitle}
      </Text>
    )}
  </View>
);

// Form Selector Component
const FormSelector = ({ onFormSelect }) => {
  const forms = [
    { id: 'customer', name: 'Customer Form', component: CustomerForm },
    { id: 'driver', name: 'Driver Form', component: DriverForm },
    { id: 'vehicle', name: 'Vehicle Form', component: VehicleForm },
    { id: 'route', name: 'Route Form', component: RouteForm },
    { id: 'shipment', name: 'Shipment Form', component: ShipmentForm }
  ];

  return (
    <View style={{ padding: 20 }}>
      <FormHeader title="Select a Form" subtitle="Choose which form you'd like to work with" />
      {forms.map(form => (
        <FormButton
          key={form.id}
          title={form.name}
          onPress={() => onFormSelect(form)}
          style={{ marginBottom: 10 }}
        />
      ))}
    </View>
  );
};

// Export all components and utilities
export {
  // Form Components
  DriverForm,
  VehicleForm, 
  RouteForm,
  ShipmentForm,
  CustomerForm,
  
  // UI Components
  FormSection,
  FormButton,
  FormHeader,
  FormSelector,
  
  // Validation
  validateForm,
  ValidationSchemas,
  IdGenerators
};

// Default export for convenience
export default {
  DriverForm,
  VehicleForm,
  RouteForm, 
  ShipmentForm,
  CustomerForm,
  FormSection,
  FormButton,
  FormHeader,
  FormSelector,
  validateForm,
  ValidationSchemas,
  IdGenerators
};