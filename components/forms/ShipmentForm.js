import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  FlatList,
  Switch,
} from 'react-native';

const ShipmentForm = ({ 
  initialData = null, 
  onSave, 
  onCancel, 
  mode = 'create' // 'create' or 'edit'
}) => {
  const [formData, setFormData] = useState({
    trackingNumber: '',
    customerId: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    pickupAddress: '',
    deliveryAddress: '',
    packageType: 'Standard',
    packageWeight: '',
    packageDimensions: '',
    packageValue: '',
    priority: 'Normal',
    deliveryInstructions: '',
    requiresSignature: false,
    fragile: false,
    refrigerated: false,
    scheduledPickupDate: '',
    scheduledDeliveryDate: '',
    status: 'Pending',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const packageTypes = ['Standard', 'Express', 'Overnight', 'Same Day', 'Fragile', 'Heavy'];
  const priorityLevels = ['Low', 'Normal', 'High', 'Urgent'];
  const statusOptions = ['Pending', 'Confirmed', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered', 'Failed', 'Cancelled'];

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
    loadCustomers();
    if (mode === 'create') {
      generateTrackingNumber();
    }
  }, [initialData, mode]);

  const loadCustomers = () => {
    // Mock customer data - replace with actual API call
    const mockCustomers = [
      {
        id: '1',
        name: 'Tech Solutions Inc.',
        phone: '+1-555-0123',
        email: 'orders@techsolutions.com',
        address: '123 Business Ave, Tech District, City 12345'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        phone: '+1-555-0456',
        email: 'sarah.johnson@email.com',
        address: '456 Residential St, Suburb Area, City 67890'
      },
      {
        id: '3',
        name: 'Global Enterprises',
        phone: '+1-555-0789',
        email: 'shipping@global-ent.com',
        address: '789 Corporate Blvd, Business Park, City 13579'
      },
      {
        id: '4',
        name: 'Michael Chen',
        phone: '+1-555-0321',
        email: 'mchen@personalmail.com',
        address: '321 Home Lane, Residential Zone, City 24680'
      },
    ];
    setCustomers(mockCustomers);
  };

  const generateTrackingNumber = () => {
    const prefix = 'SHP';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const trackingNumber = `${prefix}${timestamp}${random}`;
    setFormData(prev => ({ ...prev, trackingNumber }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.trackingNumber.trim()) {
      newErrors.trackingNumber = 'Tracking number is required';
    }

    if (!formData.customerId) {
      newErrors.customerId = 'Customer selection is required';
    }

    if (!formData.pickupAddress.trim()) {
      newErrors.pickupAddress = 'Pickup address is required';
    }

    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Delivery address is required';
    }

    if (!formData.packageWeight.trim()) {
      newErrors.packageWeight = 'Package weight is required';
    } else if (isNaN(parseFloat(formData.packageWeight))) {
      newErrors.packageWeight = 'Package weight must be a valid number';
    }

    if (formData.packageValue && isNaN(parseFloat(formData.packageValue))) {
      newErrors.packageValue = 'Package value must be a valid number';
    }

    if (!formData.scheduledPickupDate.trim()) {
      newErrors.scheduledPickupDate = 'Scheduled pickup date is required';
    }

    if (!formData.scheduledDeliveryDate.trim()) {
      newErrors.scheduledDeliveryDate = 'Scheduled delivery date is required';
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
      
      const shipmentData = {
        ...formData,
        packageWeight: parseFloat(formData.packageWeight),
        packageValue: formData.packageValue ? parseFloat(formData.packageValue) : 0,
        createdAt: mode === 'create' ? new Date().toISOString() : initialData?.createdAt,
        updatedAt: new Date().toISOString(),
      };

      onSave && onSave(shipmentData);
      Alert.alert(
        'Success', 
        `Shipment ${mode === 'create' ? 'created' : 'updated'} successfully!`
      );
    } catch (_error) {
      Alert.alert('Error', 'Failed to save shipment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomerSelect = (customer) => {
    setFormData({
      ...formData,
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      deliveryAddress: customer.address,
    });
    setShowCustomerModal(false);
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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
        autoCapitalize={options.autoCapitalize || 'sentences'}
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
        onValueChange={(value) => updateFormData(field, value)}
        trackColor={{ false: '#ccc', true: '#2196F3' }}
        thumbColor={formData[field] ? '#fff' : '#f4f3f4'}
      />
    </View>
  );

  const renderCustomerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.customerItem}
      onPress={() => handleCustomerSelect(item)}
    >
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{item.name}</Text>
        <Text style={styles.customerContact}>{item.phone}</Text>
        <Text style={styles.customerEmail}>{item.email}</Text>
        <Text style={styles.customerAddress} numberOfLines={2}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {mode === 'create' ? 'Create New Shipment' : 'Edit Shipment'}
        </Text>
      </View>

      {/* Tracking Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tracking Information</Text>
        
        {renderInput('Tracking Number', 'trackingNumber', { 
          required: true, 
          disabled: mode === 'edit',
          placeholder: 'Auto-generated tracking number'
        })}

        {renderPicker('Status', 'status', statusOptions, true)}
      </View>

      {/* Customer Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Information</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Customer <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity
            style={[styles.customerSelector, errors.customerId && styles.inputError]}
            onPress={() => setShowCustomerModal(true)}
          >
            <Text style={[
              styles.customerSelectorText,
              !formData.customerName && styles.placeholderText
            ]}>
              {formData.customerName || 'Select Customer'}
            </Text>
            <Text style={styles.selectorArrow}>›</Text>
          </TouchableOpacity>
          {errors.customerId && <Text style={styles.errorText}>{errors.customerId}</Text>}
        </View>

        {formData.customerName && (
          <>
            {renderInput('Customer Phone', 'customerPhone', { keyboardType: 'phone-pad' })}
            {renderInput('Customer Email', 'customerEmail', { keyboardType: 'email-address', autoCapitalize: 'none' })}
          </>
        )}
      </View>

      {/* Address Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address Information</Text>
        
        {renderInput('Pickup Address', 'pickupAddress', { 
          required: true, 
          multiline: true, 
          numberOfLines: 3 
        })}
        
        {renderInput('Delivery Address', 'deliveryAddress', { 
          required: true, 
          multiline: true, 
          numberOfLines: 3 
        })}
      </View>

      {/* Package Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Package Information</Text>
        
        {renderPicker('Package Type', 'packageType', packageTypes, true)}
        
        {renderInput('Weight (kg)', 'packageWeight', { 
          required: true, 
          keyboardType: 'decimal-pad',
          placeholder: 'Enter weight in kilograms'
        })}
        
        {renderInput('Dimensions (L x W x H cm)', 'packageDimensions', { 
          placeholder: 'e.g., 30 x 20 x 15'
        })}
        
        {renderInput('Declared Value ($)', 'packageValue', { 
          keyboardType: 'decimal-pad',
          placeholder: 'Optional - for insurance purposes'
        })}
      </View>

      {/* Delivery Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Options</Text>
        
        {renderPicker('Priority', 'priority', priorityLevels, true)}
        
        {renderSwitch(
          'Signature Required',
          'requiresSignature',
          'Recipient must sign upon delivery'
        )}
        
        {renderSwitch(
          'Fragile Item',
          'fragile',
          'Handle with extra care'
        )}
        
        {renderSwitch(
          'Refrigerated',
          'refrigerated',
          'Requires temperature control'
        )}
        
        {renderInput('Delivery Instructions', 'deliveryInstructions', { 
          multiline: true, 
          numberOfLines: 3,
          placeholder: 'Special delivery instructions...'
        })}
      </View>

      {/* Schedule Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schedule Information</Text>
        
        {renderInput('Scheduled Pickup Date', 'scheduledPickupDate', { 
          required: true,
          placeholder: 'YYYY-MM-DD HH:MM'
        })}
        
        {renderInput('Scheduled Delivery Date', 'scheduledDeliveryDate', { 
          required: true,
          placeholder: 'YYYY-MM-DD HH:MM'
        })}
      </View>

      {/* Additional Notes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Notes</Text>
        
        {renderInput('Internal Notes', 'notes', { 
          multiline: true, 
          numberOfLines: 4,
          placeholder: 'Internal notes for staff reference...'
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
            {isLoading ? 'Saving...' : mode === 'create' ? 'Create Shipment' : 'Update Shipment'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Customer Selection Modal */}
      <Modal
        visible={showCustomerModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCustomerModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.customerModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Customer</Text>
              <TouchableOpacity onPress={() => setShowCustomerModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={customers}
              keyExtractor={(item) => item.id}
              renderItem={renderCustomerItem}
              showsVerticalScrollIndicator={false}
            />
            
            <TouchableOpacity style={styles.addCustomerButton}>
              <Text style={styles.addCustomerButtonText}>+ Add New Customer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  customerSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  customerSelectorText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  selectorArrow: {
    fontSize: 18,
    color: '#999',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  customerModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 18,
    color: '#666',
    padding: 5,
  },
  customerItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  customerContact: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  customerEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  customerAddress: {
    fontSize: 12,
    color: '#999',
  },
  addCustomerButton: {
    backgroundColor: '#2196F3',
    margin: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addCustomerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ShipmentForm;
