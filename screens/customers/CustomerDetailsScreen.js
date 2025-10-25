// screens/customers/CustomerDetailsScreen.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomerDetailsScreen = ({ route, navigation }) => {
  const { customer } = route.params || {};

  if (!customer) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Customer not found</Text>
      </View>
    );
  }

  const getStatusColor = (status) => {
    return status === 'active' ? '#10B981' : '#EF4444';
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'enterprise': return '#8B5CF6';
      case 'corporate': return '#3B82F6';
      case 'sme': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const formatCurrency = (amount) => {
    return '?' + amount.toLocaleString('en-IN');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleEdit = () => {
    navigation.navigate('EditCustomer', { customer });
  };

  const handleCall = () => {
    Alert.alert('Call Customer', `Would you like to call       
     ${customer.contactPerson}?`);
  };

  const handleEmail = () => {
    Alert.alert('Email Customer', `Send email to ${customer.email}`);
  };

  const creditUtilization = ((customer.outstandingBalance / customer.creditLimit) * 100).toFixed(1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer Details</Text>
        <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
          <Ionicons name="create-outline" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.customerHeader}>
            <View>
              <Text style={styles.customerName}>{customer.name}</Text>
              <Text style={styles.customerId}>{customer.id}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(customer.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(customer.status) }]}>
                {customer.status.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(customer.category) + '20' }]}>
            <Text style={[styles.categoryText, { color: getCategoryColor(customer.category) }]}>
              {customer.category.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={18} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Contact Person</Text>
              <Text style={styles.infoValue}>{customer.contactPerson}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={18} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{customer.email}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={18} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{customer.phone}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Address</Text>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoValue}>{customer.address}</Text>
              <Text style={styles.infoValue}>{customer.city}, {customer.state} - {customer.pincode}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Business Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="document-text-outline" size={18} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>GSTIN</Text>
              <Text style={styles.infoValue}>{customer.gstin}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={18} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Customer Since</Text>
              <Text style={styles.infoValue}>{formatDate(customer.joinedDate)}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={18} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Payment Terms</Text>
              <Text style={styles.infoValue}>{customer.paymentTerms}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Financial Summary</Text>
          <View style={styles.financialGrid}>
            <View style={styles.financialItem}>
              <Text style={styles.financialLabel}>Credit Limit</Text>
              <Text style={styles.financialValue}>{formatCurrency(customer.creditLimit)}</Text>
            </View>
            <View style={styles.financialItem}>
              <Text style={styles.financialLabel}>Outstanding</Text>
              <Text style={[styles.financialValue, { color: customer.outstandingBalance > 0 ? '#EF4444' : '#10B981' }]}>
                {formatCurrency(customer.outstandingBalance)}
              </Text>
            </View>
            <View style={styles.financialItem}>
              <Text style={styles.financialLabel}>Available Credit</Text>
              <Text style={[styles.financialValue, { color: '#10B981' }]}>
                {formatCurrency(customer.creditLimit - customer.outstandingBalance)}
              </Text>
            </View>
            <View style={styles.financialItem}>
              <Text style={styles.financialLabel}>Total Orders</Text>
              <Text style={styles.financialValue}>{customer.totalOrders}</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${Math.min(creditUtilization, 100)}%`, backgroundColor: creditUtilization > 80 ? '#EF4444' : '#3B82F6' }]} />
            </View>
            <Text style={styles.progressText}>Credit Utilization: {creditUtilization}%</Text>
          </View>
        </View>

        <View style={styles.actionsCard}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <Ionicons name="call-outline" size={20} color="#10B981" />
            <Text style={[styles.actionButtonText, { color: '#10B981' }]}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleEmail}>
            <Ionicons name="mail-outline" size={20} color="#3B82F6" />
            <Text style={[styles.actionButtonText, { color: '#3B82F6' }]}>Email</Text>
          </TouchableOpacity>
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
  iconButton: { padding: 8 },
  content: { flex: 1 },
  card: { backgroundColor: '#fff', margin: 16, marginBottom: 0, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  customerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  customerName: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  customerId: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  categoryBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, alignSelf: 'flex-start' },
  categoryText: { fontSize: 10, fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  infoContent: { marginLeft: 12, flex: 1 },
  infoLabel: { fontSize: 12, color: '#9CA3AF', marginBottom: 2 },
  infoValue: { fontSize: 14, fontWeight: '500', color: '#1F2937' },
  financialGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  financialItem: { width: '48%', backgroundColor: '#F9FAFB', padding: 12, borderRadius: 8 },
  financialLabel: { fontSize: 12, color: '#6B7280', marginBottom: 6 },
  financialValue: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  progressBar: { marginTop: 8 },
  progressBarBg: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%' },
  progressText: { fontSize: 12, color: '#6B7280', marginTop: 6 },
  actionsCard: { margin: 16, marginBottom: 32, flexDirection: 'row', gap: 12 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', gap: 8 },
  actionButtonText: { fontSize: 14, fontWeight: '600' },
  errorText: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginTop: 50 }
});

export default CustomerDetailsScreen;
