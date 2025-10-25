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

const DriverForm = ({ 
  initialData = null, 
  onSave, 
  onCancel, 
  mode = 'create' // 'create' or 'edit'
}) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    licenseNumber: '',
    licenseClass: 'Class C',
    licenseExpiryDate: '',
    licenseState: '',
    hireDate: '',
    department: 'Operations',
    position: 'Delivery Driver',
    salary: '',
    status: 'Active',
    assignedVehicleId: '',
    assignedVehicleNumber: '',
    medicalClearanceDate: '',
    medicalExpiryDate: '',
    backgroundCheckDate: '',
    drugTestDate: '',
    trainingCompletedDate: '',
    certifications: '',
    experience: '',
    performanceRating: '',
    totalDeliveries: '',
    onTimePercentage: '',
    customerRating: '',
    availableForOT: true,
    cdlRequired: false,
    hazmatCertified: false,
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const licenseClasses = ['Class A CDL', 'Class B CDL', 'Class C CDL', 'Class C', 'Motorcycle', 'Commercial'];
  const departments = ['Operations', 'Logistics', 'Customer Service', 'Maintenance', 'Administration'];
  const positions = ['Delivery Driver', 'Senior Driver', 'Driver Trainer', 'Route Supervisor', 'Lead Driver'];
  const statusOptions = ['Active', 'Inactive', 'On Leave', 'Suspended', 'Terminated'];
  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
    loadVehicles();
    if (mode === 'create') {
      generateEmployeeId();
    }
  }, [initialData, mode]);

  const loadVehicles = () => {
    // Mock vehicle data - replace with actual API call
    const mockVehicles = [
      {
        id: '1',
        vehicleNumber: 'VEH-001',
        licensePlate: 'ABC-123',
        make: 'Ford',
        model: 'Transit',
        year: 2023,
        type: 'Van',
        status: 'Available'
      },
      {
        id: '2',
        vehicleNumber: 'VEH-002',
        licensePlate: 'DEF-456',
        make: 'Mercedes',
        model: 'Sprinter',
        year: 2022,
        type: 'Van',
        status: 'Available'
      },
      {
        id: '3',
        vehicleNumber: 'VEH-003',
        licensePlate: 'GHI-789',
        make: 'Toyota',
        model: 'Hiace',
        year: 2023,
        type: 'Van',
        status: 'In Use'
      },
      {
        id: '4',
        vehicleNumber: 'VEH-004',
        licensePlate: 'JKL-012',
        make: 'Isuzu',
        model: 'NPR',
        year: 2021,
        type: 'Truck',
        status: 'Available'
      },
    ];
    setVehicles(mockVehicles);
  };

  const generateEmployeeId = () => {
    const prefix = 'EMP';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    const employeeId = `${prefix}-${timestamp}${random}`;
    setFormData(prev => ({ ...prev, employeeId }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employeeId.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
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

    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    if (!formData.emergencyContactName.trim()) {
      newErrors.emergencyContactName = 'Emergency contact name is required';
    }

    if (!formData.emergencyContactPhone.trim()) {
      newErrors.emergencyContactPhone = 'Emergency contact phone is required';
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'License number is required';
    }

    if (!formData.licenseExpiryDate.trim()) {
      newErrors.licenseExpiryDate = 'License expiry date is required';
    }

    if (!formData.hireDate.trim()) {
      newErrors.hireDate = 'Hire date is required';
    }

    if (formData.salary && isNaN(parseFloat(formData.salary))) {
      newErrors.salary = 'Salary must be a valid number';
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
      
      const driverData = {
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`,
        salary: formData.salary ? parseFloat(formData.salary) : 0,
        totalDeliveries: formData.totalDeliveries ? parseInt(formData.totalDeliveries) : 0,
        onTimePercentage: formData.onTimePercentage ? parseFloat(formData.onTimePercentage) : 0,
        customerRating: formData.customerRating ? parseFloat(formData.customerRating) : 0,
        performanceRating: formData.performanceRating ? parseFloat(formData.performanceRating) : 0,
        createdAt: mode === 'create' ? new Date().toISOString() : initialData?.createdAt,
        updatedAt: new Date().toISOString(),
      };

      onSave && onSave(driverData);
      Alert.alert(
        'Success', 
        `Driver ${mode === 'create' ? 'added' : 'updated'} successfully!`
      );
    } catch (_error) {
      Alert.alert('Error', 'Failed to save driver information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVehicleSelect = (vehicle) => {
    setFormData({
      ...formData,
      assignedVehicleId: vehicle.id,
      assignedVehicleNumber: vehicle.vehicleNumber,
    });
    setShowVehicleModal(false);
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
        autoCapitalize={options.autoCapitalize || 'words'}
        editable={!options.disabled}
        secureTextEntry={options.secureTextEntry}
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

  const renderVehicleItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.vehicleItem,
        item.status !== 'Available' && styles.vehicleItemUnavailable
      ]}
      onPress={() => handleVehicleSelect(item)}
      disabled={item.status !== 'Available'}
    >
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleName}>
          {item.vehicleNumber} - {item.make} {item.model}
        </Text>
        <Text style={styles.vehicleDetails}>License: {item.licensePlate}</Text>
        <Text style={styles.vehicleDetails}>Year: {item.year}</Text>
        <Text style={styles.vehicleDetails}>Type: {item.type}</Text>
      </View>
      <View style={[
        styles.vehicleStatus,
        { backgroundColor: item.status === 'Available' ? '#4CAF50' : '#FF9800' }
      ]}>
        <Text style={styles.vehicleStatusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {mode === 'create' ? 'Add New Driver' : 'Edit Driver'}
        </Text>
      </View>

      {/* Employee Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Employee Information</Text>
        
        {renderInput('Employee ID', 'employeeId', { 
          required: true, 
          disabled: mode === 'edit',
          placeholder: 'Auto-generated employee ID'
        })}

        {renderPicker('Status', 'status', statusOptions, true)}
      </View>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            {renderInput('First Name', 'firstName', { required: true })}
          </View>
          <View style={styles.halfWidth}>
            {renderInput('Last Name', 'lastName', { required: true })}
          </View>
        </View>

        {renderInput('Email', 'email', { 
          required: true,
          keyboardType: 'email-address',
          autoCapitalize: 'none'
        })}

        {renderInput('Phone', 'phone', { 
          required: true,
          keyboardType: 'phone-pad',
          placeholder: '+1-555-0123'
        })}

        {renderInput('Date of Birth', 'dateOfBirth', { 
          required: true,
          placeholder: 'YYYY-MM-DD'
        })}

        {renderPicker('Gender', 'gender', genderOptions)}
      </View>

      {/* Address Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address Information</Text>
        
        {renderInput('Address', 'address', { 
          required: true,
          multiline: true,
          numberOfLines: 2
        })}

        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            {renderInput('City', 'city', { required: true })}
          </View>
          <View style={styles.quarterWidth}>
            {renderInput('State', 'state', { required: true })}
          </View>
          <View style={styles.quarterWidth}>
            {renderInput('ZIP Code', 'zipCode', { required: true })}
          </View>
        </View>
      </View>

      {/* Emergency Contact */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contact</Text>
        
        {renderInput('Emergency Contact Name', 'emergencyContactName', { required: true })}

        {renderInput('Emergency Contact Phone', 'emergencyContactPhone', { 
          required: true,
          keyboardType: 'phone-pad'
        })}

        {renderInput('Relationship', 'emergencyContactRelation', { 
          placeholder: 'e.g., Spouse, Parent, Sibling'
        })}
      </View>

      {/* License Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>License Information</Text>
        
        {renderInput('License Number', 'licenseNumber', { 
          required: true,
          autoCapitalize: 'characters'
        })}

        {renderPicker('License Class', 'licenseClass', licenseClasses, true)}

        {renderInput('License Expiry Date', 'licenseExpiryDate', { 
          required: true,
          placeholder: 'YYYY-MM-DD'
        })}

        {renderInput('License State', 'licenseState', { 
          placeholder: 'State where license was issued'
        })}
      </View>

      {/* Employment Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Employment Details</Text>
        
        {renderInput('Hire Date', 'hireDate', { 
          required: true,
          placeholder: 'YYYY-MM-DD'
        })}

        {renderPicker('Department', 'department', departments, true)}
        {renderPicker('Position', 'position', positions, true)}

        {renderInput('Salary (Annual)', 'salary', { 
          keyboardType: 'decimal-pad',
          placeholder: 'Annual salary amount'
        })}

        {renderInput('Experience (Years)', 'experience', { 
          keyboardType: 'decimal-pad',
          placeholder: 'Years of driving experience'
        })}
      </View>

      {/* Vehicle Assignment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vehicle Assignment</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Assigned Vehicle</Text>
          <TouchableOpacity
            style={styles.vehicleSelector}
            onPress={() => setShowVehicleModal(true)}
          >
            <Text style={[
              styles.vehicleSelectorText,
              !formData.assignedVehicleNumber && styles.placeholderText
            ]}>
              {formData.assignedVehicleNumber || 'Select Vehicle (Optional)'}
            </Text>
            <Text style={styles.selectorArrow}>›</Text>
          </TouchableOpacity>
          
          {formData.assignedVehicleNumber && (
            <TouchableOpacity
              style={styles.clearVehicleButton}
              onPress={() => updateFormData('assignedVehicleId', '') || updateFormData('assignedVehicleNumber', '')}
            >
              <Text style={styles.clearVehicleText}>Clear Assignment</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Medical & Certifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medical & Certifications</Text>
        
        {renderInput('Medical Clearance Date', 'medicalClearanceDate', { 
          placeholder: 'YYYY-MM-DD'
        })}

        {renderInput('Medical Expiry Date', 'medicalExpiryDate', { 
          placeholder: 'YYYY-MM-DD'
        })}

        {renderInput('Background Check Date', 'backgroundCheckDate', { 
          placeholder: 'YYYY-MM-DD'
        })}

        {renderInput('Drug Test Date', 'drugTestDate', { 
          placeholder: 'YYYY-MM-DD'
        })}

        {renderInput('Training Completed Date', 'trainingCompletedDate', { 
          placeholder: 'YYYY-MM-DD'
        })}

        {renderInput('Certifications', 'certifications', { 
          multiline: true,
          numberOfLines: 3,
          placeholder: 'List any additional certifications...'
        })}
      </View>

      {/* Performance Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Metrics</Text>
        
        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            {renderInput('Total Deliveries', 'totalDeliveries', { 
              keyboardType: 'numeric',
              placeholder: '0'
            })}
          </View>
          <View style={styles.halfWidth}>
            {renderInput('On-Time %', 'onTimePercentage', { 
              keyboardType: 'decimal-pad',
              placeholder: '0.0'
            })}
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            {renderInput('Customer Rating', 'customerRating', { 
              keyboardType: 'decimal-pad',
              placeholder: '0.0 - 5.0'
            })}
          </View>
          <View style={styles.halfWidth}>
            {renderInput('Performance Rating', 'performanceRating', { 
              keyboardType: 'decimal-pad',
              placeholder: '0.0 - 5.0'
            })}
          </View>
        </View>
      </View>

      {/* Additional Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Options</Text>
        
        {renderSwitch(
          'Available for Overtime',
          'availableForOT',
          'Driver is available for overtime work'
        )}
        
        {renderSwitch(
          'CDL Required',
          'cdlRequired',
          'Position requires Commercial Driver\'s License'
        )}
        
        {renderSwitch(
          'HAZMAT Certified',
          'hazmatCertified',
          'Driver has hazardous materials certification'
        )}
      </View>

      {/* Additional Notes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Notes</Text>
        
        {renderInput('Notes', 'notes', { 
          multiline: true,
          numberOfLines: 4,
          placeholder: 'Additional information about this driver...'
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
            {isLoading ? 'Saving...' : mode === 'create' ? 'Add Driver' : 'Update Driver'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Vehicle Selection Modal */}
      <Modal
        visible={showVehicleModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowVehicleModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.vehicleModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Assign Vehicle</Text>
              <TouchableOpacity onPress={() => setShowVehicleModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={vehicles}
              keyExtractor={(item) => item.id}
              renderItem={renderVehicleItem}
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  quarterWidth: {
    width: '22%',
  },
  vehicleSelector: {
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
  vehicleSelectorText: {
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
  clearVehicleButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  clearVehicleText: {
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
  vehicleModal: {
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
  vehicleItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  vehicleItemUnavailable: {
    opacity: 0.6,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  vehicleDetails: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  vehicleStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  vehicleStatusText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DriverForm;
