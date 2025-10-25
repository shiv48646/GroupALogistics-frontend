import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddDriverScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    licenseNumber: '',
    licenseExpiry: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    experience: '',
    vehicleType: 'any'
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Driver name is required');
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Error', 'Phone number is required');
      return false;
    }
    if (!formData.licenseNumber.trim()) {
      Alert.alert('Error', 'License number is required');
      return false;
    }
    return true;
  };

  const handleAddDriver = () => {
    if (!validateForm()) return;

    Alert.alert(
      'Driver Added',
      `${formData.name} has been added to your fleet successfully!`,
      [
        {
          text: 'Add Another',
          onPress: () => {
            setFormData({
              name: '',
              phone: '',
              email: '',
              licenseNumber: '',
              licenseExpiry: '',
              address: '',
              emergencyContact: '',
              emergencyPhone: '',
              experience: '',
              vehicleType: 'any'
            });
          }
        },
        {
          text: 'View Fleet',
          onPress: () => navigation.navigate('Fleet')
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976d2" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Driver</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter driver's full name"
              value={formData.name}
              onChangeText={(value) => updateField('name', value)}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChangeText={(value) => updateField('phone', value)}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="driver@example.com"
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter full address"
              value={formData.address}
              onChangeText={(value) => updateField('address', value)}
              multiline
              numberOfLines={3}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* License Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>License Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>License Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="DL-1420110012345"
              value={formData.licenseNumber}
              onChangeText={(value) => updateField('licenseNumber', value)}
              autoCapitalize="characters"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>License Expiry Date</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              value={formData.licenseExpiry}
              onChangeText={(value) => updateField('licenseExpiry', value)}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Years of Experience</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter years"
              value={formData.experience}
              onChangeText={(value) => updateField('experience', value)}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Vehicle Preference */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Preference</Text>
          <View style={styles.vehicleTypeContainer}>
            {['any', 'truck', 'van', 'bike'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.vehicleTypeButton,
                  formData.vehicleType === type && styles.vehicleTypeButtonActive
                ]}
                onPress={() => updateField('vehicleType', type)}
              >
                <Ionicons 
                  name={type === 'any' ? 'apps' : type === 'truck' ? 'car' : type === 'van' ? 'cube' : 'bicycle'} 
                  size={24} 
                  color={formData.vehicleType === type ? '#1976d2' : '#757575'} 
                />
                <Text style={[
                  styles.vehicleTypeText,
                  formData.vehicleType === type && styles.vehicleTypeTextActive
                ]}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contact Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Emergency contact name"
              value={formData.emergencyContact}
              onChangeText={(value) => updateField('emergencyContact', value)}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contact Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="+91 98765 43210"
              value={formData.emergencyPhone}
              onChangeText={(value) => updateField('emergencyPhone', value)}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Add Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddDriver}>
          <Ionicons name="person-add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add Driver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    backgroundColor: '#1976d2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 4
  },
  backButton: {
    padding: 8
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  placeholder: {
    width: 40
  },
  content: {
    flex: 1
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16
  },
  inputGroup: {
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#424242',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#212121',
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top'
  },
  vehicleTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  vehicleTypeButton: {
    width: '48%',
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  vehicleTypeButtonActive: {
    borderColor: '#1976d2',
    backgroundColor: '#e3f2fd'
  },
  vehicleTypeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#757575',
    marginTop: 8
  },
  vehicleTypeTextActive: {
    color: '#1976d2',
    fontWeight: '600'
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    elevation: 8
  },
  addButton: {
    backgroundColor: '#1976d2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  bottomSpacing: {
    height: 24
  }
});

export default AddDriverScreen;