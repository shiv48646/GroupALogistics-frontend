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

const isAndroid = Platform.OS === 'android';

const CreateOrderScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    pickupAddress: '',
    deliveryAddress: '',
    itemDescription: '',
    weight: '',
    priority: 'normal',
    deliveryDate: '',
    specialInstructions: ''
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.customerName.trim()) {
      Alert.alert('Error', 'Customer name is required');
      return false;
    }
    if (!formData.customerPhone.trim()) {
      Alert.alert('Error', 'Customer phone is required');
      return false;
    }
    if (!formData.pickupAddress.trim()) {
      Alert.alert('Error', 'Pickup address is required');
      return false;
    }
    if (!formData.deliveryAddress.trim()) {
      Alert.alert('Error', 'Delivery address is required');
      return false;
    }
    return true;
  };

  const handleCreateOrder = () => {
    if (!validateForm()) return;

    Alert.alert(
      'Order Created',
      `Order for ${formData.customerName} has been created successfully!`,
      [
        {
          text: 'Create Another',
          onPress: () => {
            setFormData({
              customerName: '',
              customerPhone: '',
              pickupAddress: '',
              deliveryAddress: '',
              itemDescription: '',
              weight: '',
              priority: 'normal',
              deliveryDate: '',
              specialInstructions: ''
            });
          }
        },
        {
          text: 'View Orders',
          onPress: () => navigation.navigate('Orders')
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
        <Text style={styles.headerTitle}>Create New Order</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Customer Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Customer Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter customer name"
              value={formData.customerName}
              onChangeText={(value) => updateField('customerName', value)}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="+91 98765 43210"
              value={formData.customerPhone}
              onChangeText={(value) => updateField('customerPhone', value)}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Pickup & Delivery */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pickup & Delivery</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pickup Address *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter pickup location"
              value={formData.pickupAddress}
              onChangeText={(value) => updateField('pickupAddress', value)}
              multiline
              numberOfLines={3}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Delivery Address *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter delivery location"
              value={formData.deliveryAddress}
              onChangeText={(value) => updateField('deliveryAddress', value)}
              multiline
              numberOfLines={3}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Order Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Item Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe the items"
              value={formData.itemDescription}
              onChangeText={(value) => updateField('itemDescription', value)}
              multiline
              numberOfLines={3}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter weight"
              value={formData.weight}
              onChangeText={(value) => updateField('weight', value)}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Delivery Date</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              value={formData.deliveryDate}
              onChangeText={(value) => updateField('deliveryDate', value)}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Priority */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Priority Level</Text>
          <View style={styles.priorityContainer}>
            {['normal', 'urgent', 'express'].map((priority) => (
              <TouchableOpacity
                key={priority}
                style={[
                  styles.priorityButton,
                  formData.priority === priority && styles.priorityButtonActive
                ]}
                onPress={() => updateField('priority', priority)}
              >
                <Text style={[
                  styles.priorityText,
                  formData.priority === priority && styles.priorityTextActive
                ]}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Special Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Instructions</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add any special instructions..."
            value={formData.specialInstructions}
            onChangeText={(value) => updateField('specialInstructions', value)}
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Create Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateOrder}>
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
          <Text style={styles.createButtonText}>Create Order</Text>
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
  priorityContainer: {
    flexDirection: 'row',
    gap: 12
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  priorityButtonActive: {
    borderColor: '#1976d2',
    backgroundColor: '#e3f2fd'
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#757575'
  },
  priorityTextActive: {
    color: '#1976d2',
    fontWeight: '600'
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    elevation: 8
  },
  createButton: {
    backgroundColor: '#4caf50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  bottomSpacing: {
    height: 24
  }
});

export default CreateOrderScreen;