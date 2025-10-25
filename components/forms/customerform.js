import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';

const CustomerForm = ({ 
  initialData = null, 
  onSave, 
  onCancel, 
  mode = 'create' // 'create' or 'edit'
}) => {
  const [formData, setFormData] = useState({
    customerId: '',
    customerType: 'Individual',
    companyName: '',
    contactFirstName: '',
    contactLastName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    website: '',
    taxId: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: 'United States',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZipCode: '',
    shippingCountry: 'United States',
    sameAsBilling: true,
    customerSince: '',
    customerStatus: 'Active',
    creditLimit: '',
    paymentTerms: 'Net 30',
    preferredDeliveryTime: 'Anytime',
    specialInstructions: '',
    requiresSignature: false,
    allowAuthorityToLeave: true,
    preferredContact: 'Email',
    marketingOptIn: false,
    notes: '',
    tags: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const customerTypes = ['Individual', 'Business', 'Government', 'Non-Profit'];
  const statusOptions = ['Active', 'Inactive', 'Suspended', 'Pending'];
  const paymentTermsOptions = ['COD', 'Net 15', 'Net 30', 'Net 60', 'Prepaid', 'Credit Card'];
  const deliveryTimeOptions = ['Anytime', 'Morning (9AM-12PM)', 'Afternoon (12PM-5PM)', 'Evening (5PM-8PM)', 'Business Hours Only'];
  const contactPreferences = ['Email', 'Phone', 'SMS', 'Mail'];
  const countries = ['United States', 'Canada', 'Mexico', 'Other'];

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
    if (mode === 'create') {
      generateCustomerId();
      setFormData(prev => ({ ...prev, customerSince: new Date().toISOString().split('T')[0] }));
    }
  }, [initialData, mode]);

  const generateCustomerId = () => {
    const prefix = 'CUST';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const customerId = `${prefix}-${timestamp}${random}`;
    setFormData(prev => ({ ...prev, customerId }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerId.trim()) {
      newErrors.customerId = 'Customer ID is required';
    }

    if (formData.customerType === 'Business' && !formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required for business customers';
    }

    if (!formData.contactFirstName.trim()) {
      newErrors.contactFirstName = 'First name is required';
    }

    if (!formData.contactLastName.trim()) {
      newErrors.contactLastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required';
    }

    if (!formData.billingCity.trim()) {
      newErrors.billingCity = 'Billing city is required';
    }

    if (!formData.billingState.trim()) {
      newErrors.billingState = 'Billing state is required';
    }

    if (!formData.billingZipCode.trim()) {
      newErrors.billingZipCode = 'Billing ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.billingZipCode)) {
      newErrors.billingZipCode = 'ZIP code must be in format 12345 or 12345-6789';
    }

    if (!formData.sameAsBilling) {
      if (!formData.shippingAddress.trim()) {
        newErrors.shippingAddress = 'Shipping address is required';
      }
      if (!formData.shippingCity.trim()) {
        newErrors.shippingCity = 'Shipping city is required';
      }
      if (!formData.shippingState.trim()) {
        newErrors.shippingState = 'Shipping state is required';
      }
      if (!formData.shippingZipCode.trim()) {
        newErrors.shippingZipCode = 'Shipping ZIP code is required';
      } else if (!/^\d{5}(-\d{4})?$/.test(formData.shippingZipCode)) {
        newErrors.shippingZipCode = 'ZIP code must be in format 12345 or 12345-6789';
      }
    }

    if (formData.creditLimit && isNaN(parseFloat(formData.creditLimit))) {
      newErrors.creditLimit = 'Credit limit must be a valid number';
    }

    if (!formData.customerSince.trim()) {
      newErrors.customerSince = 'Customer since date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors before saving.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const customerData = {
        ...formData,
        fullName: `${formData.contactFirstName} ${formData.contactLastName}`,
        creditLimit: formData.creditLimit ? parseFloat(formData.creditLimit) : 0,
        // Copy billing to shipping if same as billing
        ...(formData.sameAsBilling && {
          shippingAddress: formData.billingAddress,
          shippingCity: formData.billingCity,
          shippingState: formData.billingState,
          shippingZipCode: formData.billingZipCode,
          shippingCountry: formData.billingCountry,
        }),
        createdAt: mode === 'create' ? new Date().toISOString() : initialData?.createdAt,
        updatedAt: new Date().toISOString(),
      };

      onSave && onSave(customerData);
      Alert.alert(
        'Success', 
        `Customer ${mode === 'create' ? 'created' : 'updated'} successfully!`
      );
    } catch (_error) {
      Alert.alert('Error', 'Failed to save customer. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSameAsBillingToggle = (value) => {
    setFormData(prev => ({
      ...prev,
      sameAsBilling: value,
      ...(value && {
        shippingAddress: prev.billingAddress,
        shippingCity: prev.billingCity,
        shippingState: prev.billingState,
        shippingZipCode: prev.billingZipCode,
        shippingCountry: prev.billingCountry,
      })
    }));
  };

  const renderInput = (label, field, options = {}) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>
        {label} {options.required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        style={[
          styles.input,
          errors[field] && styles.inputError,
          options.multiline && styles.textArea
        ]}
        value={formData[field]}
        onChangeText={(value) => updateFormData(field, value)}
        placeholder={options.placeholder || `Enter ${label.toLowerCase()}`}
        multiline={options.multiline}
        numberOfLines={options.numberOfLines}
        keyboardType={options.keyboardType || 'default'}
        autoCapitalize={options.autoCapitalize || 'words'}
        editable={!options.disabled}
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  const renderPicker = (label, field, options, required = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <View style={styles.pickerContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {options.map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.pickerOption,
                formData[field] === option && styles.pickerOptionSelected
              ]}
              onPress={() => updateFormData(field, option)}
            >
              <Text style={[
                styles.pickerOptionText,
                formData[field] === option && styles.pickerOptionTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  const renderSwitch = (label, field, description) => (
    <View style={styles.switchContainer}>
      <View style={styles.switchInfo}>
        <Text style={styles.switchLabel}>{label}</Text>
        {description && <Text style={styles.switchDescription}>{description}</Text>}
      </View>
      <Switch
        value={formData[field]}
        onValueChange={(value) => field === 'sameAsBilling' ? handleSameAsBillingToggle(value) : updateFormData(field, value)}
        trackColor={{ false: '#ccc', true: '#2196F3' }}
        thumbColor={formData[field] ? '#fff' : '#f4f3f4'}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {mode === 'create' ? 'Add New Customer' : 'Edit Customer'}
        </Text>
      </View>

      {/* Customer Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Information</Text>
        
        {renderInput('Customer ID', 'customerId', { 
          required: true, 
          disabled: mode === 'edit',
          placeholder: 'Auto-generated customer ID'
        })}

        {renderPicker('Customer Type', 'customerType', customerTypes, true)}

        {formData.customerType === 'Business' && (
          renderInput('Company Name', 'companyName', { required: true })
        )}

        {renderInput('Tax ID / Business License', 'taxId', { 
          placeholder: 'Optional tax identification number'
        })}

        {renderPicker('Status', 'customerStatus', statusOptions, true)}

        {renderInput('Customer Since', 'customerSince', { 
          required: true,
          placeholder: 'YYYY-MM-DD'
        })}
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            {renderInput('First Name', 'contactFirstName', { required: true })}
          </View>
          <View style={styles.halfWidth}>
            {renderInput('Last Name', 'contactLastName', { required: true })}
          </View>
        </View>

        {renderInput('Email', 'email', { 
          required: true,
          keyboardType: 'email-address',
          autoCapitalize: 'none'
        })}

        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            {renderInput('Phone', 'phone', { 
              required: true,
              keyboardType: 'phone-pad',
              placeholder: '+1-555-0123'
            })}
          </View>
          <View style={styles.halfWidth}>
            {renderInput('Alternate Phone', 'alternatePhone', { 
              keyboardType: 'phone-pad',
              placeholder: '+1-555-0456'
            })}
          </View>
        </View>

        {renderInput('Website', 'website', { 
          keyboardType: 'url',
          autoCapitalize: 'none',
          placeholder: 'https://www.example.com'
        })}

        {renderPicker('Preferred Contact Method', 'preferredContact', contactPreferences)}
      </View>

      {/* Billing Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Billing Address</Text>
        
        {renderInput('Address', 'billingAddress', { 
          required: true,
          multiline: true,
          numberOfLines: 2
        })}

        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            {renderInput('City', 'billingCity', { required: true })}
          </View>
          <View style={styles.quarterWidth}>
            {renderInput('State', 'billingState', { required: true })}
          </View>
          <View style={styles.quarterWidth}>
            {renderInput('ZIP Code', 'billingZipCode', { required: true })}
          </View>
        </View>

        {renderPicker('Country', 'billingCountry', countries)}
      </View>

      {/* Shipping Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        
        {renderSwitch(
          'Same as Billing Address',
          'sameAsBilling',
          'Use billing address for shipping'
        )}

        {!formData.sameAsBilling && (
          <>
            {renderInput('Address', 'shippingAddress', { 
              required: true,
              multiline: true,
              numberOfLines: 2
            })}

            <View style={styles.rowContainer}>
              <View style={styles.halfWidth}>
                {renderInput('City', 'shippingCity', { required: true })}
              </View>
              <View style={styles.quarterWidth}>
                {renderInput('State', 'shippingState', { required: true })}
              </View>
              <View style={styles.quarterWidth}>
                {renderInput('ZIP Code', 'shippingZipCode', { required: true })}
              </View>
            </View>

            {renderPicker('Country', 'shippingCountry', countries)}
          </>
        )}
      </View>

      {/* Business Terms */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Business Terms</Text>
        
        {renderInput('Credit Limit', 'creditLimit', { 
          keyboardType: 'decimal-pad',
          placeholder: 'Maximum credit amount (optional)'
        })}

        {renderPicker('Payment Terms', 'paymentTerms', paymentTermsOptions)}
      </View>

      {/* Delivery Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Preferences</Text>
        
        {renderPicker('Preferred Delivery Time', 'preferredDeliveryTime', deliveryTimeOptions)}

        {renderSwitch(
          'Signature Required',
          'requiresSignature',
          'Require signature for all deliveries'
        )}

        {renderSwitch(
          'Allow Authority to Leave',
          'allowAuthorityToLeave',
          'Allow packages to be left without signature'
        )}

        {renderInput('Special Delivery Instructions', 'specialInstructions', { 
          multiline: true,
          numberOfLines: 3,
          placeholder: 'Gate codes, special delivery instructions, etc.'
        })}
      </View>

      {/* Marketing & Communication */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Marketing & Communication</Text>
        
        {renderSwitch(
          'Marketing Opt-in',
          'marketingOptIn',
          'Allow promotional emails and communications'
        )}

        {renderInput('Customer Tags', 'tags', { 
          placeholder: 'VIP, Bulk Orders, Special Handling (comma separated)'
        })}
      </View>

      {/* Additional Notes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Notes</Text>
        
        {renderInput('Internal Notes', 'notes', { 
          multiline: true,
          numberOfLines: 4,
          placeholder: 'Internal notes about this customer...'
        })}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.saveButton, isLoading && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={styles.saveButtonText}>
            {isLoading ? 'Saving...' : mode === 'create' ? 'Add Customer' : 'Update Customer'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#F44336',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  inputError: {
    borderColor: '#F44336',
  },
  textArea: {
    textAlignVertical: 'top',
    minHeight: 80,
  },
  errorText: {
    fontSize: 12,
    color: '#F44336',
    marginTop: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  quarterWidth: {
    width: '30%',
  },
  pickerContainer: {
    marginBottom: 5,
  },
  pickerOption: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  pickerOptionSelected: {
    backgroundColor: '#2196F3',
  },
  pickerOptionText: {
    fontSize: 14,
    color: '#666',
  },
  pickerOptionTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  switchInfo: {
    flex: 1,
    marginRight: 15,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  switchDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    marginLeft: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

export default CustomerForm;
