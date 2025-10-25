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

const VehicleForm = ({ 
  initialData = null, 
  onSave, 
  onCancel, 
  mode = 'create' // 'create' or 'edit'
}) => {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    licensePlate: '',
    vin: '',
    make: '',
    model: '',
    year: '',
    color: '',
    vehicleType: 'Van',
    fuelType: 'Gasoline',
    capacity: '',
    maxWeight: '',
    mileage: '',
    currentOdometer: '',
    assignedDriverId: '',
    assignedDriverName: '',
    status: 'Available',
    insuranceProvider: '',
    insurancePolicyNumber: '',
    insuranceExpiryDate: '',
    registrationNumber: '',
    registrationExpiryDate: '',
    lastMaintenanceDate: '',
    nextMaintenanceDate: '',
    maintenanceNotes: '',
    gpsEnabled: true,
    airConditioning: false,
    refrigeration: false,
    liftGate: false,
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const vehicleTypes = ['Van', 'Truck', 'Pickup', 'Motorcycle', 'Bicycle', 'Car'];
  const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'LPG'];
  const statusOptions = ['Available', 'In Use', 'Maintenance', 'Out of Service', 'Reserved'];

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
    loadDrivers();
    if (mode === 'create') {
      generateVehicleNumber();
    }
  }, [initialData, mode]);

  const loadDrivers = () => {
    // Mock driver data - replace with actual API call
    const mockDrivers = [
      {
        id: '1',
        name: 'John Smith',
        employeeId: 'EMP-001',
        licenseNumber: 'DL-12345678',
        phone: '+1-555-0123',
        status: 'Available',
        experience: '5 years'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        employeeId: 'EMP-002',
        licenseNumber: 'DL-23456789',
        phone: '+1-555-0456',
        status: 'Available',
        experience: '3 years'
      },
      {
        id: '3',
        name: 'Michael Chen',
        employeeId: 'EMP-003',
        licenseNumber: 'DL-34567890',
        phone: '+1-555-0789',
        status: 'On Route',
        experience: '7 years'
      },
      {
        id: '4',
        name: 'Emily Rodriguez',
        employeeId: 'EMP-004',
        licenseNumber: 'DL-45678901',
        phone: '+1-555-0321',
        status: 'Available',
        experience: '2 years'
      },
    ];
    setDrivers(mockDrivers);
  };

  const generateVehicleNumber = () => {
    const prefix = 'VEH';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    const vehicleNumber = `${prefix}-${timestamp}${random}`;
    setFormData(prev => ({ ...prev, vehicleNumber }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber = 'Vehicle number is required';
    }

    if (!formData.licensePlate.trim()) {
      newErrors.licensePlate = 'License plate is required';
    }

    if (!formData.vin.trim()) {
      newErrors.vin = 'VIN is required';
    } else if (formData.vin.length !== 17) {
      newErrors.vin = 'VIN must be exactly 17 characters';
    }

    if (!formData.make.trim()) {
      newErrors.make = 'Make is required';
    }

    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    }

    if (!formData.year.trim()) {
      newErrors.year = 'Year is required';
    } else {
      const year = parseInt(formData.year);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1900 || year > currentYear + 1) {
        newErrors.year = `Year must be between 1900 and ${currentYear + 1}`;
      }
    }

    if (!formData.capacity.trim()) {
      newErrors.capacity = 'Capacity is required';
    } else if (isNaN(parseFloat(formData.capacity))) {
      newErrors.capacity = 'Capacity must be a valid number';
    }

    if (!formData.maxWeight.trim()) {
      newErrors.maxWeight = 'Maximum weight is required';
    } else if (isNaN(parseFloat(formData.maxWeight))) {
      newErrors.maxWeight = 'Maximum weight must be a valid number';
    }

    if (formData.currentOdometer && isNaN(parseFloat(formData.currentOdometer))) {
      newErrors.currentOdometer = 'Odometer reading must be a valid number';
    }

    if (!formData.insuranceProvider.trim()) {
      newErrors.insuranceProvider = 'Insurance provider is required';
    }

    if (!formData.insurancePolicyNumber.trim()) {
      newErrors.insurancePolicyNumber = 'Insurance policy number is required';
    }

    if (!formData.insuranceExpiryDate.trim()) {
      newErrors.insuranceExpiryDate = 'Insurance expiry date is required';
    }

    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = 'Registration number is required';
    }

    if (!formData.registrationExpiryDate.trim()) {
      newErrors.registrationExpiryDate = 'Registration expiry date is required';
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
      
      const vehicleData = {
        ...formData,
        year: parseInt(formData.year),
        capacity: parseFloat(formData.capacity),
        maxWeight: parseFloat(formData.maxWeight),
        currentOdometer: formData.currentOdometer ? parseFloat(formData.currentOdometer) : 0,
        createdAt: mode === 'create' ? new Date().toISOString() : initialData?.createdAt,
        updatedAt: new Date().toISOString(),
      };

      onSave && onSave(vehicleData);
      Alert.alert(
        'Success', 
        `Vehicle ${mode === 'create' ? 'created' : 'updated'} successfully!`
      );
    } catch (_error) {
      Alert.alert('Error', 'Failed to save vehicle. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDriverSelect = (driver) => {
    setFormData({
      ...formData,
      assignedDriverId: driver.id,
      assignedDriverName: driver.name,
    });
    setShowDriverModal(false);
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
        maxLength={options.maxLength}
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

  const renderDriverItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.driverItem,
        item.status !== 'Available' && styles.driverItemUnavailable
      ]}
      onPress={() => handleDriverSelect(item)}
      disabled={item.status !== 'Available'}
    >
      <View style={styles.driverInfo}>
        <Text style={styles.driverName}>{item.name}</Text>
        <Text style={styles.driverDetails}>ID: {item.employeeId}</Text>
        <Text style={styles.driverDetails}>License: {item.licenseNumber}</Text>
        <Text style={styles.driverDetails}>Experience: {item.experience}</Text>
        <Text style={styles.driverDetails}>Phone: {item.phone}</Text>
      </View>
      <View style={[
        styles.driverStatus,
        { backgroundColor: item.status === 'Available' ? '#4CAF50' : '#FF9800' }
      ]}>
        <Text style={styles.driverStatusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {mode === 'create' ? 'Add New Vehicle' : 'Edit Vehicle'}
        </Text>
      </View>

      {/* Vehicle Identification */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vehicle Identification</Text>
        
        {renderInput('Vehicle Number', 'vehicleNumber', { 
          required: true, 
          disabled: mode === 'edit',
          placeholder: 'Auto-generated vehicle number'
        })}

        {renderInput('License Plate', 'licensePlate', { 
          required: true,
          autoCapitalize: 'characters',
          placeholder: 'e.g., ABC-1234'
        })}

        {renderInput('VIN', 'vin', { 
          required: true,
          autoCapitalize: 'characters',
          maxLength: 17,
          placeholder: '17-character Vehicle Identification Number'
        })}

        {renderPicker('Status', 'status', statusOptions, true)}
      </View>

      {/* Vehicle Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vehicle Details</Text>
        
        {renderInput('Make', 'make', { 
          required: true,
          placeholder: 'e.g., Ford, Toyota, Mercedes'
        })}

        {renderInput('Model', 'model', { 
          required: true,
          placeholder: 'e.g., Transit, Hiace, Sprinter'
        })}

        {renderInput('Year', 'year', { 
          required: true,
          keyboardType: 'numeric',
          maxLength: 4,
          placeholder: 'e.g., 2023'
        })}

        {renderInput('Color', 'color', { 
          placeholder: 'e.g., White, Blue, Red'
        })}

        {renderPicker('Vehicle Type', 'vehicleType', vehicleTypes, true)}
        {renderPicker('Fuel Type', 'fuelType', fuelTypes, true)}
      </View>

      {/* Specifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vehicle Specifications</Text>
        
        {renderInput('Capacity (m³)', 'capacity', { 
          required: true,
          keyboardType: 'decimal-pad',
          placeholder: 'Cargo capacity in cubic meters'
        })}

        {renderInput('Maximum Weight (kg)', 'maxWeight', { 
          required: true,
          keyboardType: 'decimal-pad',
          placeholder: 'Maximum load capacity'
        })}

        {renderInput('Fuel Efficiency (L/100km)', 'mileage', { 
          keyboardType: 'decimal-pad',
          placeholder: 'Average fuel consumption'
        })}

        {renderInput('Current Odometer (km)', 'currentOdometer', { 
          keyboardType: 'decimal-pad',
          placeholder: 'Current mileage reading'
        })}
      </View>

      {/* Driver Assignment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Driver Assignment</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Assigned Driver</Text>
          <TouchableOpacity
            style={styles.driverSelector}
            onPress={() => setShowDriverModal(true)}
          >
            <Text style={[
              styles.driverSelectorText,
              !formData.assignedDriverName && styles.placeholderText
            ]}>
              {formData.assignedDriverName || 'Select Driver (Optional)'}
            </Text>
            <Text style={styles.selectorArrow}>›</Text>
          </TouchableOpacity>
          
          {formData.assignedDriverName && (
            <TouchableOpacity
              style={styles.clearDriverButton}
              onPress={() => updateFormData('assignedDriverId', '') || updateFormData('assignedDriverName', '')}
            >
              <Text style={styles.clearDriverText}>Clear Assignment</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Insurance Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Insurance Information</Text>
        
        {renderInput('Insurance Provider', 'insuranceProvider', { 
          required: true,
          placeholder: 'Insurance company name'
        })}

        {renderInput('Policy Number', 'insurancePolicyNumber', { 
          required: true,
          placeholder: 'Insurance policy number'
        })}

        {renderInput('Insurance Expiry Date', 'insuranceExpiryDate', { 
          required: true,
          placeholder: 'YYYY-MM-DD'
        })}
      </View>

      {/* Registration Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Registration Information</Text>
        
        {renderInput('Registration Number', 'registrationNumber', { 
          required: true,
          placeholder: 'Vehicle registration number'
        })}

        {renderInput('Registration Expiry Date', 'registrationExpiryDate', { 
          required: true,
          placeholder: 'YYYY-MM-DD'
        })}
      </View>

      {/* Maintenance Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Maintenance Information</Text>
        
        {renderInput('Last Maintenance Date', 'lastMaintenanceDate', { 
          placeholder: 'YYYY-MM-DD'
        })}

        {renderInput('Next Maintenance Date', 'nextMaintenanceDate', { 
          placeholder: 'YYYY-MM-DD'
        })}

        {renderInput('Maintenance Notes', 'maintenanceNotes', { 
          multiline: true,
          numberOfLines: 3,
          placeholder: 'Recent maintenance history and notes...'
        })}
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vehicle Features</Text>
        
        {renderSwitch(
          'GPS Enabled',
          'gpsEnabled',
          'Vehicle has GPS tracking system'
        )}
        
        {renderSwitch(
          'Air Conditioning',
          'airConditioning',
          'Vehicle has air conditioning'
        )}
        
        {renderSwitch(
          'Refrigeration',
          'refrigeration',
          'Vehicle has refrigeration unit'
        )}
        
        {renderSwitch(
          'Lift Gate',
          'liftGate',
          'Vehicle has hydraulic lift gate'
        )}
      </View>

      {/* Additional Notes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Notes</Text>
        
        {renderInput('Notes', 'notes', { 
          multiline: true,
          numberOfLines: 4,
          placeholder: 'Additional information about this vehicle...'
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
            {isLoading ? 'Saving...' : mode === 'create' ? 'Add Vehicle' : 'Update Vehicle'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Driver Selection Modal */}
      <Modal
        visible={showDriverModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDriverModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.driverModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Assign Driver</Text>
              <TouchableOpacity onPress={() => setShowDriverModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={drivers}
              keyExtractor={(item) => item.id}
              renderItem={renderDriverItem}
              showsVerticalScrollIndicator={false}
            />
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
  driverSelector: {
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
  driverSelectorText: {
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
  clearDriverButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  clearDriverText: {
    fontSize: 12,
    color: '#666',
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
  driverModal: {
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
  driverItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  driverItemUnavailable: {
    opacity: 0.6,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  driverDetails: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  driverStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  driverStatusText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default VehicleForm;
