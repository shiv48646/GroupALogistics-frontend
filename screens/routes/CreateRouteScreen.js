// screens/routes/CreateRouteScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addRoute } from '../../store/slices/routesSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';

const CreateRouteScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.fleet.drivers);
  const vehicles = useSelector((state) => state.fleet.vehicles);

  const [formData, setFormData] = useState({
    routeName: '',
    origin: '',
    destination: '',
    distance: '',
    estimatedTime: '',
    driverId: '',
    vehicleId: '',
    stops: '',
    priority: 'normal',
    scheduledDate: '',
    notes: '',
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.routeName.trim()) {
      Alert.alert('Error', 'Route name is required');
      return false;
    }
    if (!formData.origin.trim()) {
      Alert.alert('Error', 'Origin address is required');
      return false;
    }
    if (!formData.destination.trim()) {
      Alert.alert('Error', 'Destination address is required');
      return false;
    }
    if (!formData.driverId) {
      Alert.alert('Error', 'Please select a driver');
      return false;
    }
    if (!formData.vehicleId) {
      Alert.alert('Error', 'Please select a vehicle');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Parse stops (comma-separated)
    const stopsArray = formData.stops
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const selectedDriver = drivers.find((d) => d.id === formData.driverId);
    const selectedVehicle = vehicles.find((v) => v.id === formData.vehicleId);

    const newRoute = {
      id: 'RTE' + Date.now(),
      routeName: formData.routeName,
      origin: formData.origin,
      destination: formData.destination,
      distance: formData.distance ? parseFloat(formData.distance) : 0,
      estimatedTime: formData.estimatedTime,
      stops: stopsArray,
      driver: selectedDriver
        ? {
            id: selectedDriver.id,
            name: selectedDriver.name,
            phone: selectedDriver.phone,
          }
        : null,
      vehicle: selectedVehicle
        ? {
            id: selectedVehicle.id,
            number: selectedVehicle.vehicleNumber,
            type: selectedVehicle.type,
          }
        : null,
      priority: formData.priority,
      status: 'planning',
      scheduledDate: formData.scheduledDate,
      createdAt: new Date().toISOString(),
      notes: formData.notes,
      progress: 0,
      deliveriesCompleted: 0,
      totalDeliveries: stopsArray.length,
    };

    dispatch(addRoute(newRoute));
    Alert.alert('Success', 'Route created successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Route Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Route Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Route Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., North Delhi Route 1"
              value={formData.routeName}
              onChangeText={(value) => updateField('routeName', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Origin *</Text>
            <TextInput
              style={styles.input}
              placeholder="Starting location"
              value={formData.origin}
              onChangeText={(value) => updateField('origin', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Destination *</Text>
            <TextInput
              style={styles.input}
              placeholder="End location"
              value={formData.destination}
              onChangeText={(value) => updateField('destination', value)}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Distance (km)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 25.5"
                value={formData.distance}
                onChangeText={(value) => updateField('distance', value)}
                keyboardType="decimal-pad"
              />
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Est. Time</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 2h 30m"
                value={formData.estimatedTime}
                onChangeText={(value) => updateField('estimatedTime', value)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Stops (comma-separated)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="e.g., Connaught Place, Karol Bagh, Rajouri Garden"
              value={formData.stops}
              onChangeText={(value) => updateField('stops', value)}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Assignment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assignment</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Driver *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.driverId}
                onValueChange={(value) => updateField('driverId', value)}
                style={styles.picker}
              >
                <Picker.Item label="Select Driver" value="" />
                {drivers
                  ?.filter((d) => d.status === 'active')
                  .map((driver) => (
                    <Picker.Item
                      key={driver.id}
                      label={`${driver.name} - ${driver.phone}`}
                      value={driver.id}
                    />
                  ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Vehicle *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.vehicleId}
                onValueChange={(value) => updateField('vehicleId', value)}
                style={styles.picker}
              >
                <Picker.Item label="Select Vehicle" value="" />
                {vehicles
                  ?.filter((v) => v.status === 'available')
                  .map((vehicle) => (
                    <Picker.Item
                      key={vehicle.id}
                      label={`${vehicle.vehicleNumber} - ${vehicle.type}`}
                      value={vehicle.id}
                    />
                  ))}
              </Picker>
            </View>
          </View>
        </View>

        {/* Schedule & Priority */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Schedule & Priority</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Scheduled Date</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY HH:MM"
              value={formData.scheduledDate}
              onChangeText={(value) => updateField('scheduledDate', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Priority</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.priority}
                onValueChange={(value) => updateField('priority', value)}
                style={styles.picker}
              >
                <Picker.Item label="Normal" value="normal" />
                <Picker.Item label="High" value="high" />
                <Picker.Item label="Urgent" value="urgent" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add any special instructions..."
              value={formData.notes}
              onChangeText={(value) => updateField('notes', value)}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
          >
            <Icon name="check" size={20} color="#FFFFFF" />
            <Text style={styles.submitButtonText}>Create Route</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  submitButton: {
    backgroundColor: '#2563EB',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default CreateRouteScreen;