// screens/inventory/StockMovementScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StockMovementScreen = ({ route, navigation }) => {
  const { item, type } = route.params || {};
  const [formData, setFormData] = useState({
    quantity: '',
    reference: '',
    note: '',
    date: new Date().toISOString().split('T')[0]
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.quantity) {
      Alert.alert('Error', 'Please enter quantity');
      return;
    }

    const qty = parseFloat(formData.quantity);
    if (type === 'out' && qty > item.quantity) {
      Alert.alert('Error', 'Quantity exceeds available stock');
      return;
    }

    Alert.alert('Success', `Stock ${type === 'in' ? 'added' : 'removed'}       
    successfully!`, [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="close" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {type === 'in' ? 'Stock In' : 'Stock Out'}
        </Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item?.name}</Text>
          <Text style={styles.itemSku}>SKU: {item?.sku}</Text>
          <View style={styles.currentStock}>
            <Text style={styles.stockLabel}>Current Stock:</Text>
            <Text style={styles.stockValue}>{item?.quantity} {item?.unit}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Movement Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Quantity *</Text>
            <View style={styles.quantityInput}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Enter quantity"
                keyboardType="numeric"
                value={formData.quantity}
                onChangeText={(text) => updateField('quantity', text)}
              />
              <Text style={styles.unitText}>{item?.unit}</Text>
            </View>
            {formData.quantity && (
              <Text style={styles.helperText}>
                New stock: {type === 'in' 
                  ? item.quantity + parseFloat(formData.quantity || 0)
                  : item.quantity - parseFloat(formData.quantity || 0)} {item?.unit}
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              value={formData.date}
              onChangeText={(text) => updateField('date', text)}
              placeholder="YYYY-MM-DD"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Reference Number</Text>
            <TextInput
              style={styles.input}
              placeholder="PO number, shipment ID, etc."
              value={formData.reference}
              onChangeText={(text) => updateField('reference', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add notes about this movement..."
              multiline
              numberOfLines={4}
              value={formData.note}
              onChangeText={(text) => updateField('note', text)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { backgroundColor: '#fff', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backButton: { marginRight: 16 },
  headerTitle: { flex: 1, fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  saveButton: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#3B82F6', borderRadius: 8 },
  saveButtonText: { fontSize: 14, fontWeight: '600', color: '#fff' },
  content: { flex: 1 },
  itemInfo: { backgroundColor: '#fff', margin: 16, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  itemName: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  itemSku: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  currentStock: { flexDirection: 'row', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  stockLabel: { fontSize: 14, color: '#6B7280', marginRight: 8 },
  stockValue: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  section: { backgroundColor: '#fff', margin: 16, marginTop: 0, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, fontSize: 14, color: '#1F2937', backgroundColor: '#fff' },
  quantityInput: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  unitText: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  helperText: { fontSize: 12, color: '#3B82F6', marginTop: 4 },
  textArea: { height: 80, textAlignVertical: 'top' }
});

export default StockMovementScreen;
