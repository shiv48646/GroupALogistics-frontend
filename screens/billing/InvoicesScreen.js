// screens/billing/InvoicesScreen.js
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

const InvoicesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Sample invoices with local state
  const [invoices] = useState([
    {
      id: 'INV-001',
      invoiceNumber: 'INV-2025-001',
      customer: 'Reliance Industries',
      customerId: 'CUST-001',
      date: '2025-01-15',
      dueDate: '2025-02-14',
      amount: 450000,
      paid: 450000,
      status: 'paid',
      items: [
        { description: 'Mumbai-Delhi Route (45 shipments)', quantity: 45, rate: 10000, amount: 450000 }
      ]
    },
    {
      id: 'INV-002',
      invoiceNumber: 'INV-2025-002',
      customer: 'Tata Motors',
      customerId: 'CUST-002',
      date: '2025-01-20',
      dueDate: '2025-02-19',
      amount: 280000,
      paid: 0,
      status: 'pending',
      items: [
        { description: 'Pune-Bangalore Route (28 shipments)', quantity: 28, rate: 10000, amount: 280000 }
      ]
    },
    {
      id: 'INV-003',
      invoiceNumber: 'INV-2025-003',
      customer: 'Wipro Limited',
      customerId: 'CUST-003',
      date: '2024-12-25',
      dueDate: '2025-01-24',
      amount: 180000,
      paid: 0,
      status: 'overdue',
      items: [
        { description: 'IT Equipment Transport', quantity: 18, rate: 10000, amount: 180000 }
      ]
    },
    {
      id: 'INV-004',
      invoiceNumber: 'INV-2025-004',
      customer: 'Mahindra & Mahindra',
      customerId: 'CUST-004',
      date: '2025-01-25',
      dueDate: '2025-03-26',
      amount: 350000,
      paid: 150000,
      status: 'partial',
      items: [
        { description: 'Automotive Parts Delivery', quantity: 35, rate: 10000, amount: 350000 }
      ]
    },
    {
      id: 'INV-005',
      invoiceNumber: 'INV-2025-005',
      customer: 'Infosys',
      customerId: 'CUST-005',
      date: '2025-01-28',
      dueDate: '2025-02-27',
      amount: 220000,
      paid: 0,
      status: 'pending',
      items: [
        { description: 'Electronics Shipment', quantity: 22, rate: 10000, amount: 220000 }
      ]
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'overdue': return '#EF4444';
      case 'partial': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const formatCurrency = (amount) => {
    return '' + amount.toLocaleString('en-IN');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.customer.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && invoice.status === filterStatus;
  });

  const stats = {
    total: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paid: invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.paid, 0),
    pending: invoices.filter(i => i.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0),
    overdue: invoices.filter(i => i.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0)
  };

  const renderInvoiceCard = ({ item }) => (
    <TouchableOpacity
      style={styles.invoiceCard}
      onPress={() => navigation.navigate('InvoiceDetails', { invoice: item })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Text style={styles.invoiceNumber}>{item.invoiceNumber}</Text>
          <Text style={styles.customerName}>{item.customer}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={14} color="#6B7280" />
            <Text style={styles.infoText}>Issued: {formatDate(item.date)}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={14} color="#6B7280" />
            <Text style={styles.infoText}>Due: {formatDate(item.dueDate)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Total Amount</Text>
          <Text style={styles.amountValue}>{formatCurrency(item.amount)}</Text>
        </View>
        {item.status === 'partial' && (
          <View style={styles.paidSection}>
            <Text style={styles.paidLabel}>Paid: {formatCurrency(item.paid)}</Text>
            <Text style={styles.balanceLabel}>Balance: {formatCurrency(item.amount - item.paid)}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Invoices & Billing</Text>
          <Text style={styles.headerSubtitle}>{filteredInvoices.length} invoices</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('CreateInvoice')} style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{formatCurrency(stats.total)}</Text>
          <Text style={styles.statLabel}>Total Billed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: '#10B981' }]}>{formatCurrency(stats.paid)}</Text>
          <Text style={styles.statLabel}>Paid</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: '#F59E0B' }]}>{formatCurrency(stats.pending)}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: '#EF4444', fontSize: 14 }]}>{formatCurrency(stats.overdue)}</Text>
          <Text style={styles.statLabel}>Overdue</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search invoices..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['all', 'paid', 'pending', 'overdue', 'partial'].map(status => (
            <TouchableOpacity
              key={status}
              style={[styles.filterButton, filterStatus === status && styles.filterButtonActive]}
              onPress={() => setFilterStatus(status)}
            >
              <Text style={[styles.filterButtonText, filterStatus === status && styles.filterButtonTextActive]}>
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredInvoices}
        renderItem={renderInvoiceCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No Invoices Found</Text>
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
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  statLabel: { fontSize: 11, color: '#6B7280', marginTop: 4 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, marginHorizontal: 16, marginTop: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#1F2937' },
  filterContainer: { flexDirection: 'row', padding: 16, paddingTop: 12 },
  filterButton: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#F3F4F6', marginRight: 8 },
  filterButtonActive: { backgroundColor: '#3B82F6' },
  filterButtonText: { fontSize: 12, fontWeight: '600', color: '#6B7280' },
  filterButtonTextActive: { color: '#fff' },
  listContent: { padding: 16 },
  invoiceCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  cardHeaderLeft: { flex: 1 },
  invoiceNumber: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  customerName: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  statusText: { fontSize: 10, fontWeight: 'bold' },
  cardBody: { marginBottom: 12 },
  infoRow: { flexDirection: 'row', gap: 16 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  infoText: { fontSize: 12, color: '#6B7280' },
  cardFooter: { borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 12 },
  amountSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  amountLabel: { fontSize: 13, color: '#6B7280' },
  amountValue: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  paidSection: { marginTop: 8 },
  paidLabel: { fontSize: 12, color: '#10B981' },
  balanceLabel: { fontSize: 12, color: '#EF4444', marginTop: 2 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#6B7280', marginTop: 16 },
  emptyText: { fontSize: 14, color: '#9CA3AF', marginTop: 8 }
});

export default InvoicesScreen;
