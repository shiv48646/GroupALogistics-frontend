// screens/fleet/AddVehicle.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { addVehicle } from '../../store/slices/fleetSlice';

const isAndroid = Platform.OS === 'android';

const AddVehicle = ({ navigation }) => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    registrationNumber: '',
    type: 'Truck',
    model: '',
    capacity: '',
    fuelLevel: '100',
    mileage: '0',
    insuranceProvider: '',
    policyNumber: '',
    insuranceExpiry: ''
  });

  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = 'Registration number is required';
    }

    if (!formData.model.trim()) {
      newErrors.model = 'Vehicle model is required';
    }

    if (!formData.capacity.trim()) {
      newErrors.capacity = 'Capacity is required';
    }

    if (!formData.insuranceProvider.trim()) {
      newErrors.insuranceProvider = 'Insurance provider is required';
    }

    if (!formData.policyNumber.trim()) {
      newErrors.policyNumber = 'Policy number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    const newVehicle = {
      id: `FL-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      registrationNumber: formData.registrationNumber.toUpperCase(),
      type: formData.type,
      model: formData.model,
      capacity: formData.capacity,
      status: 'idle',
      driver: null,
      currentLocation: {
        lat: 28.7041,
        lng: 77.1025,
        address: 'Warehouse, Delhi'
      },
      fuelLevel: parseInt(formData.fuelLevel),
      lastMaintenance: new Date().toISOString(),
      nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      mileage: parseInt(formData.mileage),
      insurance: {
        provider: formData.insuranceProvider,
        policyNumber: formData.policyNumber,
        expiryDate: formData.insuranceExpiry || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      },
      documents: {
        rc: { status: 'valid', expiryDate: new Date(Date.now() + 1825 * 24 * 60 * 60 * 1000).toISOString() },
        permit: { status: 'valid', expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() },
        fitness: { status: 'valid', expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() },
        pollution: { status: 'valid', expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString() }
      },
      currentTrip: null
    };

    dispatch(addVehicle(newVehicle));
    
    Alert.alert(
      'Success',
      `Vehicle ${newVehicle.id} has been added to the fleet`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={isAndroid ? 'height' : 'padding'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1976d2" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Add New Vehicle</Text>
          <Text style={styles.headerSubtitle}>Register vehicle to fleet</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Registration Number *</Text>
            <TextInput
              style={[styles.input, errors.registrationNumber && styles.inputError]}
              placeholder="e.g., DL 1C AB 1234"
              value={formData.registrationNumber}
              onChangeText={(value) => updateField('registrationNumber', value)}
              autoCapitalize="characters"
            />
            {errors.registrationNumber && (
              <Text style={styles.errorText}>{errors.registrationNumber}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Vehicle Type *</Text>
            <View style={styles.radioGroup}>
              <RadioButton
                label="Truck"
                selected={formData.type === 'Truck'}
                onPress={() => updateField('type', 'Truck')}
              />
              <RadioButton
                label="Van"
                selected={formData.type === 'Van'}
                onPress={() => updateField('type', 'Van')}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Vehicle Model *</Text>
            <TextInput
              style={[styles.input, errors.model && styles.inputError]}
              placeholder="e.g., Tata LPT 1613"
              value={formData.model}
              onChangeText={(value) => updateField('model', value)}
            />
            {errors.model && (
              <Text style={styles.errorText}>{errors.model}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Capacity *</Text>
            <TextInput
              style={[styles.input, errors.capacity && styles.inputError]}
              placeholder="e.g., 16 Tons or 1.2 Tons"
              value={formData.capacity}
              onChangeText={(value) => updateField('capacity', value)}
            />
            {errors.capacity && (
              <Text style={styles.errorText}>{errors.capacity}</Text>
            )}
          </View>
        </View>

        {/* Vehicle Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Metrics</Text>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>Fuel Level (%)</Text>
              <TextInput
                style={styles.input}
                placeholder="100"
                value={formData.fuelLevel}
                onChangeText={(value) => updateField('fuelLevel', value)}
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>Mileage (km)</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                value={formData.mileage}
                onChangeText={(value) => updateField('mileage', value)}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Insurance Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insurance Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Insurance Provider *</Text>
            <TextInput
              style={[styles.input, errors.insuranceProvider && styles.inputError]}
              placeholder="e.g., ICICI Lombard"
              value={formData.insuranceProvider}
              onChangeText={(value) => updateField('insuranceProvider', value)}
            />
            {errors.insuranceProvider && (
              <Text style={styles.errorText}>{errors.insuranceProvider}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Policy Number *</Text>
            <TextInput
              style={[styles.input, errors.policyNumber && styles.inputError]}
              placeholder="e.g., POL2025001234"
              value={formData.policyNumber}
              onChangeText={(value) => updateField('policyNumber', value)}
              autoCapitalize="characters"
            />
            {errors.policyNumber && (
              <Text style={styles.errorText}>{errors.policyNumber}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Expiry Date (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={formData.insuranceExpiry}
              onChangeText={(value) => updateField('insuranceExpiry', value)}
            />
            <Text style={styles.helperText}>Leave blank to set 1 year from today</Text>
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color="#1976d2" />
          <Text style={styles.infoText}>
            Additional details like driver assignment, documents, and precise location can be updated later from the vehicle details screen.
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
          <Text style={styles.submitButtonText}>Add Vehicle to Fleet</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Radio Button Component
const RadioButton = ({ label, selected, onPress }) => (
  <TouchableOpacity style={styles.radioButton} onPress={onPress}>
    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  header: {
    backgroundColor: '#1976d2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    elevation: 4
  },
  backButton: {
    padding: 8,
    marginRight: 8
  },
  headerCenter: {
    flex: 1
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)'
  },
  content: {
    flex: 1
  },
  section: {
    padding: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16
  },
  inputContainer: {
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#424242',
    marginBottom: 8
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#212121',
    elevation: 1
  },
  inputError: {
    borderColor: '#d32f2f'
  },
  errorText: {
    fontSize: 12,
    color: '#d32f2f',
    marginTop: 4
  },
  helperText: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 8
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9e9e9e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  radioOuterSelected: {
    borderColor: '#1976d2'
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1976d2'
  },
  radioLabel: {
    fontSize: 15,
    color: '#424242'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  halfWidth: {
    width: '48%'
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#e3f2fd',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1565c0',
    marginLeft: 12,
    lineHeight: 18
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#388e3c',
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 3
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8
  },
  bottomSpacing: {
    height: 32
  }
});

export default AddVehicle;