import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';

// Import our form components
import { ShipmentForm, VehicleForm, DriverForm } from '../index';

import {
  FormInput,
  FormPicker,
  FormSwitch,
  FormSelector,
  FormDateInput,
  FormCurrencyInput,
  FormPhoneInput,
  FormSection,
  FormRow,
  FormButton,
  FormHeader,
} from '../FormFields';
import { validateForm, ValidationSchemas } from '../validation';

// Example 1: Simple Modal Form Usage
export const ModalFormExample = () => {
  const [showShipmentForm, setShowShipmentForm] = useState(false);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showDriverForm, setShowDriverForm] = useState(false);

  const handleShipmentSave = (shipmentData) => {
    console.log('Shipment saved:', shipmentData);
    Alert.alert('Success', 'Shipment created successfully!');
    setShowShipmentForm(false);
  };

  const handleVehicleSave = (vehicleData) => {
    console.log('Vehicle saved:', vehicleData);
    Alert.alert('Success', 'Vehicle added successfully!');
    setShowVehicleForm(false);
  };

  const handleDriverSave = (driverData) => {
    console.log('Driver saved:', driverData);
    Alert.alert('Success', 'Driver added successfully!');
    setShowDriverForm(false);
  };

  return (
    <View style={styles.container}>
      <FormHeader 
        title="Form Examples"
        subtitle="Examples of using form components"
      />

      <FormSection title="Form Actions">
        <FormButton
          title="Create New Shipment"
          onPress={() => setShowShipmentForm(true)}
          type="primary"
        />
        
        <FormButton
          title="Add New Vehicle"
          onPress={() => setShowVehicleForm(true)}
          type="primary"
        />
        
        <FormButton
          title="Add New Driver"
          onPress={() => setShowDriverForm(true)}
          type="primary"
        />
      </FormSection>

      {/* Shipment Form Modal */}
      <Modal
        visible={showShipmentForm}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ShipmentForm
          mode="create"
          onSave={handleShipmentSave}
          onCancel={() => setShowShipmentForm(false)}
        />
      </Modal>

      {/* Vehicle Form Modal */}
      <Modal
        visible={showVehicleForm}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <VehicleForm
          mode="create"
          onSave={handleVehicleSave}
          onCancel={() => setShowVehicleForm(false)}
        />
      </Modal>

      {/* Driver Form Modal */}
      <Modal
        visible={showDriverForm}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <DriverForm
          mode="create"
          onSave={handleDriverSave}
          onCancel={() => setShowDriverForm(false)}
        />
      </Modal>
    </View>
  );
};

// Example 2: Custom Form using FormFields
export const CustomFormExample = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    serviceType: 'Standard',
    priority: 'Normal',
    budget: '',
    startDate: '',
    endDate: '',
    hasSpecialRequirements: false,
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceTypes = ['Standard', 'Express', 'Premium', 'Custom'];
  const priorities = ['Low', 'Normal', 'High', 'Urgent'];

  // Custom validation schema
  const customValidationSchema = {
    companyName: [(value) => !value?.trim() ? 'Company name is required' : null],
    contactPerson: [(value) => !value?.trim() ? 'Contact person is required' : null],
    email: [(value) => {
      if (!value?.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
      return null;
    }],
    phone: [(value) => {
      if (!value?.trim()) return 'Phone is required';
      if (!/^\+?[\d\s\-\(\)]{10,}$/.test(value)) return 'Invalid phone format';
      return null;
    }],
    startDate: [(value) => !value?.trim() ? 'Start date is required' : null],
    budget: [(value) => {
      if (value && isNaN(parseFloat(value))) return 'Budget must be a valid number';
      return null;
    }],
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async () => {
    // Validate form
    const validationErrors = {};
    Object.keys(customValidationSchema).forEach(field => {
      const rules = customValidationSchema[field];
      for (const rule of rules) {
        const error = rule(formData[field]);
        if (error) {
          validationErrors[field] = error;
          break;
        }
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      Alert.alert('Validation Error', 'Please fix the errors before submitting.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert('Success', 'Service request submitted successfully!');
      
      // Reset form
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        serviceType: 'Standard',
        priority: 'Normal',
        budget: '',
        startDate: '',
        endDate: '',
        hasSpecialRequirements: false,
        notes: '',
      });
    } catch (_error) {
      Alert.alert('Error', 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <FormHeader 
        title="Service Request Form"
        subtitle="Custom form built with FormFields components"
      />

      <FormSection title="Company Information">
        <FormInput
          label="Company Name"
          value={formData.companyName}
          onChangeText={(value) => updateField('companyName', value)}
          error={errors.companyName}
          required
        />

        <FormInput
          label="Contact Person"
          value={formData.contactPerson}
          onChangeText={(value) => updateField('contactPerson', value)}
          error={errors.contactPerson}
          required
        />

        <FormRow>
          <FormInput
            label="Email"
            value={formData.email}
            onChangeText={(value) => updateField('email', value)}
            error={errors.email}
            required
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <FormPhoneInput
            label="Phone"
            value={formData.phone}
            onChangeText={(value) => updateField('phone', value)}
            error={errors.phone}
            required
          />
        </FormRow>

        <FormInput
          label="Address"
          value={formData.address}
          onChangeText={(value) => updateField('address', value)}
          multiline
          numberOfLines={3}
        />
      </FormSection>

      <FormSection title="Service Details">
        <FormPicker
          label="Service Type"
          value={formData.serviceType}
          onValueChange={(value) => updateField('serviceType', value)}
          options={serviceTypes}
          required
        />

        <FormPicker
          label="Priority"
          value={formData.priority}
          onValueChange={(value) => updateField('priority', value)}
          options={priorities}
        />

        <FormCurrencyInput
          label="Budget"
          value={formData.budget}
          onChangeText={(value) => updateField('budget', value)}
          error={errors.budget}
        />
      </FormSection>

      <FormSection title="Timeline">
        <FormRow>
          <FormDateInput
            label="Start Date"
            value={formData.startDate}
            onChangeText={(value) => updateField('startDate', value)}
            error={errors.startDate}
            required
          />
          
          <FormDateInput
            label="End Date"
            value={formData.endDate}
            onChangeText={(value) => updateField('endDate', value)}
          />
        </FormRow>
      </FormSection>

      <FormSection title="Additional Options">
        <FormSwitch
          label="Special Requirements"
          value={formData.hasSpecialRequirements}
          onValueChange={(value) => updateField('hasSpecialRequirements', value)}
          description="Check if you have special handling requirements"
        />

        <FormInput
          label="Additional Notes"
          value={formData.notes}
          onChangeText={(value) => updateField('notes', value)}
          multiline
          numberOfLines={4}
          placeholder="Any additional information or special requirements..."
        />
      </FormSection>

      <View style={styles.buttonContainer}>
        <FormButton
          title="Submit Request"
          onPress={handleSubmit}
          type="primary"
          loading={isSubmitting}
          disabled={isSubmitting}
        />
        
        <FormButton
          title="Reset Form"
          onPress={() => {
            setFormData({
              companyName: '',
              contactPerson: '',
              email: '',
              phone: '',
              address: '',
              serviceType: 'Standard',
              priority: 'Normal',
              budget: '',
              startDate: '',
              endDate: '',
              hasSpecialRequirements: false,
              notes: '',
            });
            setErrors({});
          }}
          type="secondary"
        />
      </View>
    </ScrollView>
  );
};

// Example 3: Form with Validation Showcase
export const ValidationExample = () => {
  const [testData, setTestData] = useState({
    email: '',
    phone: '',
    website: '',
    age: '',
    percentage: '',
    date: '',
    vin: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState({});

  const validationRules = {
    email: [(value) => {
      if (!value) return null;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
      return null;
    }],
    phone: [(value) => {
      if (!value) return null;
      if (!/^\+?[\d\s\-\(\)]{10,}$/.test(value)) return 'Invalid phone format';
      return null;
    }],
    age: [(value) => {
      if (!value) return null;
      const num = parseInt(value);
      if (isNaN(num) || num < 0 || num > 120) return 'Age must be between 0 and 120';
      return null;
    }],
    percentage: [(value) => {
      if (!value) return null;
      const num = parseFloat(value);
      if (isNaN(num) || num < 0 || num > 100) return 'Must be between 0 and 100';
      return null;
    }],
    date: [(value) => {
      if (!value) return null;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Use YYYY-MM-DD format';
      if (new Date(value).toString() === 'Invalid Date') return 'Invalid date';
      return null;
    }],
    vin: [(value) => {
      if (!value) return null;
      if (value.length !== 17 || !/^[A-HJ-NPR-Z0-9]{17}$/i.test(value)) {
        return 'VIN must be 17 characters (no I, O, or Q)';
      }
      return null;
    }],
    zipCode: [(value) => {
      if (!value) return null;
      if (!/^\d{5}(-\d{4})?$/.test(value)) return 'Use 12345 or 12345-6789 format';
      return null;
    }],
  };

  const validateField = (field, value) => {
    const rules = validationRules[field];
    if (!rules) return null;

    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return null;
  };

  const updateField = (field, value) => {
    setTestData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  return (
    <ScrollView style={styles.container}>
      <FormHeader 
        title="Validation Examples"
        subtitle="Try different input formats to see validation in action"
      />

      <FormSection title="Real-time Validation Examples">
        <FormInput
          label="Email"
          value={testData.email}
          onChangeText={(value) => updateField('email', value)}
          error={errors.email}
          placeholder="user@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormPhoneInput
          label="Phone"
          value={testData.phone}
          onChangeText={(value) => updateField('phone', value)}
          error={errors.phone}
        />

        <FormInput
          label="Age"
          value={testData.age}
          onChangeText={(value) => updateField('age', value)}
          error={errors.age}
          placeholder="0-120"
          keyboardType="numeric"
        />

        <FormInput
          label="Percentage"
          value={testData.percentage}
          onChangeText={(value) => updateField('percentage', value)}
          error={errors.percentage}
          placeholder="0-100"
          keyboardType="decimal-pad"
        />

        <FormDateInput
          label="Date"
          value={testData.date}
          onChangeText={(value) => updateField('date', value)}
          error={errors.date}
        />

        <FormInput
          label="VIN (Vehicle Identification Number)"
          value={testData.vin}
          onChangeText={(value) => updateField('vin', value.toUpperCase())}
          error={errors.vin}
          placeholder="17 characters, no I, O, or Q"
          autoCapitalize="characters"
          maxLength={17}
        />

        <FormInput
          label="ZIP Code"
          value={testData.zipCode}
          onChangeText={(value) => updateField('zipCode', value)}
          error={errors.zipCode}
          placeholder="12345 or 12345-6789"
          keyboardType="numeric"
        />
      </FormSection>

      <FormSection title="Validation Summary">
        <View style={styles.validationSummary}>
          <Text style={styles.summaryTitle}>Current Validation Status:</Text>
          {Object.entries(testData).map(([field, value]) => {
            const hasValue = value.trim() !== '';
            const hasError = errors[field];
            const status = !hasValue ? 'Empty' : hasError ? 'Invalid' : 'Valid';
            const statusColor = !hasValue ? '#999' : hasError ? '#F44336' : '#4CAF50';
            
            return (
              <View key={field} style={styles.validationItem}>
                <Text style={styles.fieldName}>{field}:</Text>
                <Text style={[styles.fieldStatus, { color: statusColor }]}>{status}</Text>
              </View>
            );
          })}
        </View>
      </FormSection>
    </ScrollView>
  );
};

// Example 4: Form Integration Patterns
export const FormIntegrationExample = () => {
  const [activeExample, setActiveExample] = useState('modal');

  const examples = [
    { id: 'modal', title: 'Modal Forms', component: ModalFormExample },
    { id: 'custom', title: 'Custom Form', component: CustomFormExample },
    { id: 'validation', title: 'Validation Showcase', component: ValidationExample },
  ];

  const ActiveComponent = examples.find(ex => ex.id === activeExample)?.component || ModalFormExample;

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {examples.map(example => (
          <TouchableOpacity
            key={example.id}
            style={[
              styles.tab,
              activeExample === example.id && styles.activeTab
            ]}
            onPress={() => setActiveExample(example.id)}
          >
            <Text style={[
              styles.tabText,
              activeExample === example.id && styles.activeTabText
            ]}>
              {example.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ActiveComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  validationSummary: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  validationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  fieldName: {
    fontSize: 14,
    color: '#333',
    textTransform: 'capitalize',
  },
  fieldStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#2196F3',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: '500',
  },
});

export default FormIntegrationExample;
