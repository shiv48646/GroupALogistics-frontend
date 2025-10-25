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

const RouteForm = ({ 
  initialData = null, 
  onSave, 
  onCancel, 
  mode = 'create' // 'create' or 'edit'
}) => {
  const [formData, setFormData] = useState({
    routeId: '',
    routeName: '',
    description: '',
    routeType: 'Delivery',
    priority: 'Normal',
    status: 'Draft',
    assignedDriverId: '',
    assignedDriverName: '',
    assignedVehicleId: '',
    assignedVehicleNumber: '',
    startLocation: '',
    endLocation: '',
    scheduledStartDate: '',
    scheduledStartTime: '',
    estimatedDuration: '',
    estimatedDistance: '',
    maxStops: '',
    serviceType: 'Standard',
    operatingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
    isRecurring: false,
    recurringPattern: 'Daily',
    isActive: true,
    allowPickup: true,
    allowDelivery: true,
    requiresSpecialVehicle: false,
    hazmatRequired: false,
    temperatureControlled: false,
    notes: '',
    stops: [],
  });

  const [errors, setErrors] = useState({});
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  //const [showStopsModal, setShowStopsModal] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const routeTypes = ['Delivery', 'Pickup', 'Mixed', 'Express', 'Return'];
  const priorities = ['Low', 'Normal', 'High', 'Urgent'];
  const statusOptions = ['Draft', 'Scheduled', 'Active', 'Completed', 'Cancelled', 'On Hold'];
  const serviceTypes = ['Standard', 'Express', 'Same Day', 'Overnight', 'Scheduled'];
  const recurringPatterns = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly'];

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
    loadDrivers();
    loadVehicles();
    if (mode === 'create') {
      generateRouteId();
    }
  }, [initialData, mode]);

  const loadDrivers = () => {
    // Mock driver data - replace with actual API call
    const mockDrivers = [
      {
        id: '1',
        name: 'John Smith',
        employeeId: 'EMP-001',
        status: 'Available',
        licenseClass: 'Class C',
        experience: '5 years'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        employeeId: 'EMP-002',
        status: 'Available',
        licenseClass: 'Class B CDL',
        experience: '3 years'
      },
      {
        id: '3',
        name: 'Michael Chen',
        employeeId: 'EMP-003',
        status: 'On Route',
        licenseClass: 'Class A CDL',
        experience: '7 years'
      },
    ];
    setDrivers(mockDrivers);
  };

  const loadVehicles = () => {
    // Mock vehicle data - replace with actual API call
    const mockVehicles = [
      {
        id: '1',
        vehicleNumber: 'VEH-001',
        licensePlate: 'ABC-123',
        make: 'Ford',
        model: 'Transit',
        type: 'Van',
        status: 'Available',
        capacity: '12.5 m³',
        features: ['GPS', 'AC']
      },
      {
        id: '2',
        vehicleNumber: 'VEH-002',
        licensePlate: 'DEF-456',
        make: 'Mercedes',
        model: 'Sprinter',
        type: 'Van',
        status: 'Available',
        capacity: '15.0 m³',
        features: ['GPS', 'AC', 'Refrigeration']
      },
      {
        id: '3',
        vehicleNumber: 'VEH-003',
        licensePlate: 'GHI-789',
        make: 'Isuzu',
        model: 'NPR',
        type: 'Truck',
        status: 'In Use',
        capacity: '25.0 m³',
        features: ['GPS', 'Lift Gate']
      },
    ];
    setVehicles(mockVehicles);
  };

  const generateRouteId = () => {
    const prefix = 'RT';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    const routeId = `${prefix}-${timestamp}${random}`;
    setFormData(prev => ({ ...prev, routeId }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.routeId.trim()) {
      newErrors.routeId = 'Route ID is required';
    }

    if (!formData.routeName.trim()) {
      newErrors.routeName = 'Route name is required';
    }

    if (!formData.startLocation.trim()) {
      newErrors.startLocation = 'Start location is required';
    }

    if (!formData.endLocation.trim()) {
      newErrors.endLocation = 'End location is required';
    }

    if (formData.estimatedDuration && isNaN(parseFloat(formData.estimatedDuration))) {
      newErrors.estimatedDuration = 'Estimated duration must be a valid number';
    }

    if (formData.estimatedDistance && isNaN(parseFloat(formData.estimatedDistance))) {
      newErrors.estimatedDistance = 'Estimated distance must be a valid number';
    }

    if (formData.maxStops && (isNaN(parseInt(formData.maxStops)) || parseInt(formData.maxStops) < 1)) {
      newErrors.maxStops = 'Maximum stops must be a positive number';
    }

    if (!formData.scheduledStartDate.trim()) {
      newErrors.scheduledStartDate = 'Scheduled start date is required';
    }

    if (!formData.scheduledStartTime.trim()) {
      newErrors.scheduledStartTime = 'Scheduled start time is required';
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
      
      const routeData = {
        ...formData,
        estimatedDuration: formData.estimatedDuration ? parseFloat(formData.estimatedDuration) : 0,
        estimatedDistance: formData.estimatedDistance ? parseFloat(formData.estimatedDistance) : 0,
        maxStops: formData.maxStops ? parseInt(formData.maxStops) : 0,
        scheduledDateTime: `${formData.scheduledStartDate}T${formData.scheduledStartTime}`,
        createdAt: mode === 'create' ? new Date().toISOString() : initialData?.createdAt,
        updatedAt: new Date().toISOString(),
      };

      onSave && onSave(routeData);
      Alert.alert(
        'Success', 
        `Route ${mode === 'create' ? 'created' : 'updated'} successfully!`
      );
    } catch (_error) {
      Alert.alert('Error', 'Failed to save route. Please try again.');
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

  const updateOperatingDay = (day, value) => {
    setFormData(prev => ({
      ...prev,
      operatingDays: {
        ...prev.operatingDays,
        [day]: value
      }
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

  const renderSelector = (label, field, placeholder, onPress, required = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={onPress}
      >
        <Text style={[
          styles.selectorText,
          !formData[field] && styles.placeholderText
        ]}>
          {formData[field] || placeholder}
        </Text>
        <Text style={styles.selectorArrow}>›</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDriverItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.listItem,
        item.status !== 'Available' && styles.listItemUnavailable
      ]}
      onPress={() => handleDriverSelect(item)}
      disabled={item.status !== 'Available'}
    >
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetails}>ID: {item.employeeId}</Text>
        <Text style={styles.itemDetails}>License: {item.licenseClass}</Text>
        <Text style={styles.itemDetails}>Experience: {item.experience}</Text>
      </View>
      <View style={[
        styles.itemStatus,
        { backgroundColor: item.status === 'Available' ? '#4CAF50' : '#FF9800' }
      ]}>
        <Text style={styles.itemStatusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderVehicleItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.listItem,
        item.status !== 'Available' && styles.listItemUnavailable
      ]}
      onPress={() => handleVehicleSelect(item)}
      disabled={item.status !== 'Available'}
    >
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.vehicleNumber} - {item.make} {item.model}</Text>
        <Text style={styles.itemDetails}>License: {item.licensePlate}</Text>
        <Text style={styles.itemDetails}>Type: {item.type}</Text>
        <Text style={styles.itemDetails}>Capacity: {item.capacity}</Text>
        <Text style={styles.itemDetails}>Features: {item.features.join(', ')}</Text>
      </View>
      <View style={[
        styles.itemStatus,
        { backgroundColor: item.status === 'Available' ? '#4CAF50' : '#FF9800' }
      ]}>
        <Text style={styles.itemStatusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {mode === 'create' ? 'Create New Route' : 'Edit Route'}
        </Text>
      </View>

      {/* Route Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Route Information</Text>
        
        {renderInput('Route ID', 'routeId', { 
          required: true, 
          disabled: mode === 'edit',
          placeholder: 'Auto-generated route ID'
        })}

        {renderInput('Route Name', 'routeName', { 
          required: true,
          placeholder: 'e.g., Downtown Morning Route'
        })}

        {renderInput('Description', 'description', { 
          multiline: true,
          numberOfLines: 2,
          placeholder: 'Brief description of the route'
        })}

        {renderPicker('Route Type', 'routeType', routeTypes, true)}
        {renderPicker('Priority', 'priority', priorities)}
        {renderPicker('Status', 'status', statusOptions, true)}
        {renderPicker('Service Type', 'serviceType', serviceTypes)}
      </View>

      {/* Assignments */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Assignments</Text>
        
        {renderSelector(
          'Assigned Driver',
          'assignedDriverName',
          'Select Driver (Optional)',
          () => setShowDriverModal(true)
        )}

        {renderSelector(
          'Assigned Vehicle',
          'assignedVehicleNumber',
          'Select Vehicle (Optional)',
          () => setShowVehicleModal(true)
        )}
      </View>

      {/* Route Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Route Details</Text>
        
        {renderInput('Start Location', 'startLocation', { 
          required: true,
          placeholder: 'Starting address or depot'
        })}

        {renderInput('End Location', 'endLocation', { 
          required: true,
          placeholder: 'Ending address or return depot'
        })}

        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            {renderInput('Estimated Duration (hours)', 'estimatedDuration', { 
              keyboardType: 'decimal-pad',
              placeholder: '4.5'
            })}
          </View>
          <View style={styles.halfWidth}>
            {renderInput('Estimated Distance (km)', 'estimatedDistance', { 
              keyboardType: 'decimal-pad',
              placeholder: '85.2'
            })}
          </View>
        </View>

        {renderInput('Maximum Stops', 'maxStops', { 
          keyboardType: 'numeric',
          placeholder: 'Maximum number of stops on this route'
        })}
      </View>

      {/* Schedule */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schedule</Text>
        
        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            {renderInput('Start Date', 'scheduledStartDate', { 
              required: true,
              placeholder: 'YYYY-MM-DD'
            })}
          </View>
          <View style={styles.halfWidth}>
            {renderInput('Start Time', 'scheduledStartTime', { 
              required: true,
              placeholder: 'HH:MM'
            })}
          </View>
        </View>

        {renderSwitch(
          'Recurring Route',
          'isRecurring',
          'This is a recurring route'
        )}

        {formData.isRecurring && (
          <>
            {renderPicker('Recurring Pattern', 'recurringPattern', recurringPatterns)}
            
            <View style={styles.operatingDaysContainer}>
              <Text style={styles.inputLabel}>Operating Days</Text>
              <View style={styles.daysGrid}>
                {Object.entries(formData.operatingDays).map(([day, isActive]) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayButton,
                      isActive && styles.dayButtonActive
                    ]}
                    onPress={() => updateOperatingDay(day, !isActive)}
                  >
                    <Text style={[
                      styles.dayButtonText,
                      isActive && styles.dayButtonTextActive
                    ]}>
                      {day.slice(0, 3).toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}
      </View>

      {/* Route Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Route Options</Text>
        
        {renderSwitch(
          'Active Route',
          'isActive',
          'Route is active and can accept shipments'
        )}

        {renderSwitch(
          'Allow Pickups',
          'allowPickup',
          'Route can handle pickup requests'
        )}

        {renderSwitch(
          'Allow Deliveries',
          'allowDelivery',
          'Route can handle delivery requests'
        )}
      </View>

      {/* Special Requirements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Requirements</Text>
        
        {renderSwitch(
          'Requires Special Vehicle',
          'requiresSpecialVehicle',
          'Route requires specialized vehicle equipment'
        )}

        {renderSwitch(
          'HAZMAT Required',
          'hazmatRequired',
          'Route handles hazardous materials'
        )}

        {renderSwitch(
          'Temperature Controlled',
          'temperatureControlled',
          'Route requires refrigerated transport'
        )}
      </View>

      {/* Additional Notes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Notes</Text>
        
        {renderInput('Route Notes', 'notes', { 
          multiline: true,
          numberOfLines: 4,
          placeholder: 'Special instructions, traffic notes, customer requirements...'
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
            {isLoading ? 'Saving...' : mode === 'create' ? 'Create Route' : 'Update Route'}
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
          <View style={styles.modal}>
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

      {/* Vehicle Selection Modal */}
      <Modal
        visible={showVehicleModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowVehicleModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
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
  selector: {
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
  selectorText: {
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
  operatingDaysContainer: {
    marginBottom: 15,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayButton: {
    width: '13%',
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  dayButtonActive: {
    backgroundColor: '#2196F3',
  },
  dayButtonText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  dayButtonTextActive: {
    color: '#fff',
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
  modal: {
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
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  listItemUnavailable: {
    opacity: 0.6,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  itemStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  itemStatusText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RouteForm;
