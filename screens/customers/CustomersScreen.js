// screens/customers/CustomersScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomersScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Sample customers with local state
  const [customers] = useState([
    {
      id: 'CUST-001',
      name: 'Reliance Industries Ltd',
      contactPerson: 'Mukesh Ambani',
      email: 'contact@reliance.com',
      phone: '+91 22 3555 5000',
      address: 'Maker Chambers IV, 222 Nariman Point',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400021',
      gstin: '27AAACR5055K1Z4',
      status: 'active',
      creditLimit: 5000000,
      outstandingBalance: 850000,
      totalOrders: 145,
      joinedDate: '2023-01-15',
      paymentTerms: '30 days',
      category: 'enterprise'
    },
    {
      id: 'CUST-002',
      name: 'Tata Motors Limited',
      contactPerson: 'Girish Wagh',
      email: 'info@tatamotors.com',
      phone: '+91 22 6665 7000',
      address: 'Bombay House, 24 Homi Mody Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      gstin: '27AAACT2727Q1ZG',
      status: 'active',
      creditLimit: 3000000,
      outstandingBalance: 420000,
      totalOrders: 98,
      joinedDate: '2023-03-20',
      paymentTerms: '45 days',
      category: 'enterprise'
    },
    {
      id: 'CUST-003',
      name: 'Wipro Limited',
      contactPerson: 'Thierry Delaporte',
      email: 'contact@wipro.com',
      phone: '+91 80 2844 0011',
      address: 'Doddakannelli, Sarjapur Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560035',
      gstin: '29AAACW3775F000',
      status: 'active',
      creditLimit: 2000000,
      outstandingBalance: 180000,
      totalOrders: 67,
      joinedDate: '2023-05-10',
      paymentTerms: '30 days',
      category: 'corporate'
    },
    {
      id: 'CUST-004',
      name: 'Mahindra & Mahindra',
      contactPerson: 'Anish Shah',
      email: 'customercare@mahindra.com',
      phone: '+91 22 2490 1441',
      address: 'Gateway Building, Apollo Bunder',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      gstin: '27AAACM1985J1ZJ',
      status: 'active',
      creditLimit: 2500000,
      outstandingBalance: 310000,
      totalOrders: 82,
      joinedDate: '2023-02-28',
      paymentTerms: '60 days',
      category: 'enterprise'
    },
    {
      id: 'CUST-005',
      name: 'Infosys Technologies',
      contactPerson: 'Salil Parekh',
      email: 'info@infosys.com',
      phone: '+91 80 2852 0261',
      address: 'Electronics City, Hosur Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560100',
      gstin: '29AAACI1681G1ZA',
      status: 'inactive',
      creditLimit: 1500000,
      outstandingBalance: 0,
      totalOrders: 45,
      joinedDate: '2023-07-15',
      paymentTerms: '30 days',
      category: 'corporate'
    }
  ]);

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
    return '' + amount.toLocaleString('en-IN');
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    let matchesCategory = filterCategory === 'all' || customer.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
    totalOutstanding: customers.reduce((sum, c) => sum + c.outstandingBalance, 0)
  };

  const renderCustomerCard = ({ item }) => (
    <TouchableOpacity
      style={styles.customerCard}
      onPress={() => navigation.navigate('CustomerDetails', { customer: item })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Text style={styles.customerName}>{item.name}</Text>
          <Text style={styles.customerId}>{item.id}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.contactSection}>
        <View style={styles.contactItem}>
          <Ionicons name="person-outline" size={14} color="#6B7280" />
          <Text style={styles.contactText}>{item.contactPerson}</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="call-outline" size={14} color="#6B7280" />
          <Text style={styles.contactText}>{item.phone}</Text>
        </View>
      </View>

      <View style={styles.locationSection}>
        <Ionicons name="location-outline" size={14} color="#6B7280" />
        <Text style={styles.locationText}>{item.city}, {item.state}</Text>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Orders</Text>
          <Text style={styles.statValue}>{item.totalOrders}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Outstanding</Text>
          <Text style={[styles.statValue, { color: item.outstandingBalance > 0 ? '#EF4444' : '#10B981' }]}>
            {formatCurrency(item.outstandingBalance)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Credit Limit</Text>
          <Text style={styles.statValue}>{formatCurrency(item.creditLimit)}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) + '20' }]}>
          <Text style={[styles.categoryText, { color: getCategoryColor(item.category) }]}>
            {item.category.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.paymentTerms}>{item.paymentTerms}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Customer Management</Text>
          <Text style={styles.headerSubtitle}>{filteredCustomers.length} customers</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AddCustomer')} style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statCardValue}>{stats.total}</Text>
          <Text style={styles.statCardLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statCardValue, { color: '#10B981' }]}>{stats.active}</Text>
          <Text style={styles.statCardLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statCardValue, { color: '#EF4444' }]}>{stats.inactive}</Text>
          <Text style={styles.statCardLabel}>Inactive</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statCardValue, { color: '#F59E0B', fontSize: 14 }]}>
            {formatCurrency(stats.totalOutstanding)}
          </Text>
          <Text style={styles.statCardLabel}>Outstanding</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search customers..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterButton, filterStatus === 'all' && styles.filterButtonActive]}
            onPress={() => setFilterStatus('all')}
          >
            <Text style={[styles.filterButtonText, filterStatus === 'all' && styles.filterButtonTextActive]}>
              All Status
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filterStatus === 'active' && styles.filterButtonActive]}
            onPress={() => setFilterStatus('active')}
          >
            <Text style={[styles.filterButtonText, filterStatus === 'active' && styles.filterButtonTextActive]}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filterStatus === 'inactive' && styles.filterButtonActive]}
            onPress={() => setFilterStatus('inactive')}
          >
            <Text style={[styles.filterButtonText, filterStatus === 'inactive' && styles.filterButtonTextActive]}>
              Inactive
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        data={filteredCustomers}
        renderItem={renderCustomerCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No Customers Found</Text>
            <Text style={styles.emptyText}>Try adjusting your search or filters</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { backgroundColor: '#fff', padding: 20, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1F2937' },
  headerSubtitle: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  addButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#3B82F6', justifyContent: 'center', alignItems: 'center' },
  statsContainer: { flexDirection: 'row', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  statCard: { flex: 1, alignItems: 'center' },
  statCardValue: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  statCardLabel: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, marginHorizontal: 16, marginTop: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#1F2937' },
  filterContainer: { flexDirection: 'row', padding: 16, paddingTop: 12 },
  filterButton: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#F3F4F6', marginRight: 8 },
  filterButtonActive: { backgroundColor: '#3B82F6' },
  filterButtonText: { fontSize: 12, fontWeight: '600', color: '#6B7280' },
  filterButtonTextActive: { color: '#fff' },
  listContent: { padding: 16 },
  customerCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  cardHeaderLeft: { flex: 1 },
  customerName: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  customerId: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  statusText: { fontSize: 10, fontWeight: 'bold' },
  contactSection: { marginBottom: 8 },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  contactText: { fontSize: 12, color: '#6B7280', marginLeft: 6 },
  locationSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  locationText: { fontSize: 12, color: '#6B7280', marginLeft: 6 },
  statsSection: { flexDirection: 'row', marginBottom: 12 },
  statItem: { flex: 1, alignItems: 'center' },
  statLabel: { fontSize: 10, color: '#9CA3AF', marginBottom: 4 },
  statValue: { fontSize: 13, fontWeight: 'bold', color: '#1F2937' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  categoryBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  categoryText: { fontSize: 10, fontWeight: 'bold' },
  paymentTerms: { fontSize: 12, color: '#6B7280' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#6B7280', marginTop: 16 },
  emptyText: { fontSize: 14, color: '#9CA3AF', marginTop: 8 }
});

export default CustomersScreen;
