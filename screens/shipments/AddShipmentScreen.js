// screens/shipments/AddShipmentScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddShipmentScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    customer: '',
    origin: '',
    destination: '',
    itemCount: '',
    weight: '',
    priority: 'medium',
    notes: ''
  });

  const priorities = ['low', 'medium', 'high'];

  const handleSave = () => {
    if (!formData.customer || !formData.origin || !formData.destination) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    Alert.alert('Success', 'Shipment created successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Shipment</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Create</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formSection}>
          <Text style={styles.formSectionTitle}>Customer Information</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Customer Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter customer name"
              value={formData.customer}
              onChangeText={(text) => setFormData({...formData, customer: text})}
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.formSectionTitle}>Route Information</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Origin Location *</Text>
            <TextInput
              style={styles.input}
              placeholder="Pickup location"
              value={formData.origin}
              onChangeText={(text) => setFormData({...formData, origin: text})}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Destination Location *</Text>
            <TextInput
              style={styles.input}
              placeholder="Delivery location"
              value={formData.destination}
              onChangeText={(text) => setFormData({...formData, destination: text})}
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.formSectionTitle}>Package Details</Text>
          
          <View style={styles.formRow}>
            <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Item Count</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                value={formData.itemCount}
                onChangeText={(text) => setFormData({...formData, itemCount: text})}
              />
            </View>

            <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                value={formData.weight}
                onChangeText={(text) => setFormData({...formData, weight: text})}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Priority</Text>
            <View style={styles.priorityContainer}>
              {priorities.map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={[styles.priorityButton, formData.priority === priority && styles.priorityButtonActive]}
                  onPress={() => setFormData({...formData, priority})}
                >
                  <Text style={[styles.priorityButtonText, formData.priority === priority && styles.priorityButtonTextActive]}>
                    {priority.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.formSectionTitle}>Additional Information</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add any special instructions..."
              multiline
              numberOfLines={4}
              value={formData.notes}
              onChangeText={(text) => setFormData({...formData, notes: text})}
            />
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { backgroundColor: '#fff', padding: 20, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  saveButton: { fontSize: 16, fontWeight: 'bold', color: '#3B82F6' },
  content: { flex: 1 },
  formSection: { backgroundColor: '#fff', marginTop: 12, padding: 16 },
  formSectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  formGroup: { marginBottom: 16 },
  formRow: { flexDirection: 'row' },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
  input: { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12, fontSize: 16, color: '#1F2937' },
  textArea: { height: 100, textAlignVertical: 'top' },
  priorityContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  priorityButton: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: '#F3F4F6', marginHorizontal: 4, alignItems: 'center' },
  priorityButtonActive: { backgroundColor: '#3B82F6' },
  priorityButtonText: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  priorityButtonTextActive: { color: '#fff' },
  bottomSpace: { height: 40 }
});

export default AddShipmentScreen;

