// screens/billing/CreateInvoiceScreen.js
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

const CreateInvoiceScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    customer: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    notes: ''
  });

  const [lineItems, setLineItems] = useState([
    { description: '', quantity: '', rate: '', amount: 0 }
  ]);

  // Sample customers for selection
  const customers = [
    { id: 'CUST-001', name: 'Reliance Industries' },
    { id: 'CUST-002', name: 'Tata Motors' },
    { id: 'CUST-003', name: 'Wipro Limited' },
    { id: 'CUST-004', name: 'Mahindra & Mahindra' },
    { id: 'CUST-005', name: 'Infosys' }
  ];

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateLineItem = (index, field, value) => {
    const updated = [...lineItems];
    updated[index][field] = value;
    
    if (field === 'quantity' || field === 'rate') {
      const qty = parseFloat(updated[index].quantity) || 0;
      const rate = parseFloat(updated[index].rate) || 0;
      updated[index].amount = qty * rate;
    }
    
    setLineItems(updated);
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { description: '', quantity: '', rate: '', amount: 0 }]);
  };

  const removeLineItem = (index) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index));
    }
  };

  const calculateTotal = () => {
    return lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  const formatCurrency = (amount) => {
    return '' + amount.toLocaleString('en-IN');
  };

  const handleSave = () => {
    if (!formData.customer || !formData.dueDate) {
      Alert.alert('Error', 'Please fill in customer and due date');
      return;
    }

    if (lineItems.every(item => !item.description)) {
      Alert.alert('Error', 'Please add at least one line item');
      return;
    }

    Alert.alert('Success', 'Invoice created successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="close" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Invoice</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invoice Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Customer *</Text>
            <View style={styles.pickerContainer}>
              <TouchableOpacity 
                style={styles.picker}
                onPress={() => Alert.alert('Select Customer', 'Customer selection picker would appear here')}
              >
                <Text style={formData.customer ? styles.pickerText : styles.pickerPlaceholder}>
                  {formData.customer || 'Select a customer'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Invoice Date</Text>
              <TextInput
                style={styles.input}
                value={formData.date}
                onChangeText={(text) => updateField('date', text)}
                placeholder="YYYY-MM-DD"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Due Date *</Text>
              <TextInput
                style={styles.input}
                value={formData.dueDate}
                onChangeText={(text) => updateField('dueDate', text)}
                placeholder="YYYY-MM-DD"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Line Items</Text>
            <TouchableOpacity onPress={addLineItem} style={styles.addItemButton}>
              <Ionicons name="add-circle" size={24} color="#3B82F6" />
            </TouchableOpacity>
          </View>

          {lineItems.map((item, index) => (
            <View key={index} style={styles.lineItemCard}>
              <View style={styles.lineItemHeader}>
                <Text style={styles.lineItemNumber}>Item {index + 1}</Text>
                {lineItems.length > 1 && (
                  <TouchableOpacity onPress={() => removeLineItem(index)}>
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter item description"
                  value={item.description}
                  onChangeText={(text) => updateLineItem(index, 'description', text)}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Quantity</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0"
                    keyboardType="numeric"
                    value={item.quantity}
                    onChangeText={(text) => updateLineItem(index, 'quantity', text)}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>Rate</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0"
                    keyboardType="numeric"
                    value={item.rate}
                    onChangeText={(text) => updateLineItem(index, 'rate', text)}
                  />
                </View>
              </View>

              <View style={styles.amountDisplay}>
                <Text style={styles.amountLabel}>Amount:</Text>
                <Text style={styles.amountValue}>{formatCurrency(item.amount)}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add any additional notes..."
              multiline
              numberOfLines={4}
              value={formData.notes}
              onChangeText={(text) => updateField('notes', text)}
            />
          </View>
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>{formatCurrency(calculateTotal())}</Text>
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
  section: { backgroundColor: '#fff', margin: 16, marginBottom: 0, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  addItemButton: { padding: 4 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, fontSize: 14, color: '#1F2937', backgroundColor: '#fff' },
  textArea: { height: 80, textAlignVertical: 'top' },
  row: { flexDirection: 'row' },
  pickerContainer: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, backgroundColor: '#fff' },
  picker: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
  pickerText: { fontSize: 14, color: '#1F2937' },
  pickerPlaceholder: { fontSize: 14, color: '#9CA3AF' },
  lineItemCard: { backgroundColor: '#F9FAFB', padding: 12, borderRadius: 8, marginBottom: 12 },
  lineItemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  lineItemNumber: { fontSize: 14, fontWeight: '600', color: '#1F2937' },
  amountDisplay: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  amountLabel: { fontSize: 14, fontWeight: '500', color: '#6B7280' },
  amountValue: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  totalSection: { backgroundColor: '#fff', margin: 16, marginBottom: 32, padding: 20, borderRadius: 12, borderWidth: 2, borderColor: '#3B82F6', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  totalValue: { fontSize: 24, fontWeight: 'bold', color: '#3B82F6' }
});

export default CreateInvoiceScreen;
