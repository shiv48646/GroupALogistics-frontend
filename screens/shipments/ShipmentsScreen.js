// screens/shipments/ShipmentsScreen.js - FIXED VERSION
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ShipmentsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample shipment data
  const [shipments] = useState([
    {
      id: 'SHP-001',
      trackingNumber: 'TRK1234567890',
      customer: 'Reliance Industries',
      origin: 'Mumbai Warehouse',
      destination: 'Delhi Distribution Center',
      status: 'in-transit',
      currentLocation: 'Ahmedabad Hub',
      driver: 'Rajesh Kumar',
      vehicle: 'MH-01-AB-1234',
      estimatedDelivery: '2025-10-02',
      itemCount: 45,
      weight: '850 kg',
      priority: 'high',
      progress: 65
    },
    {
      id: 'SHP-002',
      trackingNumber: 'TRK2345678901',
      customer: 'Tata Motors',
      origin: 'Pune Industrial Area',
      destination: 'Bangalore Tech Hub',
      status: 'delivered',
      currentLocation: 'Delivered',
      driver: 'Suresh Patel',
      vehicle: 'MH-12-CD-5678',
      estimatedDelivery: '2025-09-30',
      deliveredDate: '2025-09-30',
      itemCount: 32,
      weight: '620 kg',
      priority: 'medium',
      progress: 100
    },
    {
      id: 'SHP-003',
      trackingNumber: 'TRK3456789012',
      customer: 'Mahindra & Mahindra',
      origin: 'Chennai Port',
      destination: 'Hyderabad Logistics Park',
      status: 'pending',
      currentLocation: 'Awaiting Pickup',
      driver: null,
      vehicle: null,
      estimatedDelivery: '2025-10-03',
      itemCount: 28,
      weight: '540 kg',
      priority: 'low',
      progress: 10
    },
    {
      id: 'SHP-004',
      trackingNumber: 'TRK4567890123',
      customer: 'Wipro Limited',
      origin: 'Kolkata Depot',
      destination: 'Patna Distribution',
      status: 'in-transit',
      currentLocation: 'Dhanbad Junction',
      driver: 'Amit Singh',
      vehicle: 'WB-06-EF-9012',
      estimatedDelivery: '2025-10-01',
      itemCount: 38,
      weight: '720 kg',
      priority: 'high',
      progress: 45
    },
    {
      id: 'SHP-005',
      trackingNumber: 'TRK5678901234',
      customer: 'Infosys',
      origin: 'Mumbai Central',
      destination: 'Bangalore Office Park',
      status: 'delayed',
      currentLocation: 'Pune Hub - Traffic Delay',
      driver: 'Ramesh Kumar',
      vehicle: 'MH-04-GH-3456',
      estimatedDelivery: '2025-10-01',
      itemCount: 22,
      weight: '410 kg',
      priority: 'medium',
      progress: 30
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#10B981';
      case 'in-transit': return '#3B82F6';
      case 'pending': return '#F59E0B';
      case 'delayed': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusLabel = (status) => {
    return status.toUpperCase().replace('-', ' ');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.id.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch && shipment.status === activeFilter;
  });

  const stats = {
    total: shipments.length,
    inTransit: shipments.filter(s => s.status === 'in-transit').length,
    delivered: shipments.filter(s => s.status === 'delivered').length,
    delayed: shipments.filter(s => s.status === 'delayed').length
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderShipmentCard = ({ item }) => (
    <TouchableOpacity
      style={styles.shipmentCard}
      onPress={() => navigation.navigate('ShipmentDetails', { shipment: item })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Text style={styles.shipmentId}>{item.id}</Text>
          <Text style={styles.trackingNumber}>{item.trackingNumber}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {getStatusLabel(item.status)}
          </Text>
        </View>
      </View>

      <View style={styles.customerSection}>
        <Ionicons name="business" size={16} color="#6B7280" />
        <Text style={styles.customerName}>{item.customer}</Text>
        <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(item.priority) }]} />
      </View>

      <View style={styles.routeSection}>
        <View style={styles.routePoint}>
          <Ionicons name="location" size={16} color="#3B82F6" />
          <Text style={styles.locationText}>{item.origin}</Text>
        </View>
        <Ionicons name="arrow-forward" size={16} color="#9CA3AF" />
        <View style={styles.routePoint}>
          <Ionicons name="location" size={16} color="#10B981" />
          <Text style={styles.locationText}>{item.destination}</Text>
        </View>
      </View>

      {item.status === 'in-transit' && (
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>{item.currentLocation}</Text>
            <Text style={styles.progressPercent}>{item.progress}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: item.progress + '%' }]} />
          </View>
        </View>
      )}

      <View style={styles.cardFooter}>
        <View style={styles.footerItem}>
          <Ionicons name="cube-outline" size={14} color="#6B7280" />
          <Text style={styles.footerText}>{item.itemCount} items</Text>
        </View>
        <View style={styles.footerItem}>
          <Ionicons name="scale-outline" size={14} color="#6B7280" />
          <Text style={styles.footerText}>{item.weight}</Text>
        </View>
        <View style={styles.footerItem}>
          <Ionicons name="calendar-outline" size={14} color="#6B7280" />
          <Text style={styles.footerText}>
            {item.status === 'delivered' ? item.deliveredDate : item.estimatedDelivery}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Shipment Tracking</Text>
          <Text style={styles.headerSubtitle}>{filteredShipments.length} shipments</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AddShipment')} style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statCardValue}>{stats.total}</Text>
          <Text style={styles.statCardLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statCardValue, { color: '#3B82F6' }]}>{stats.inTransit}</Text>
          <Text style={styles.statCardLabel}>In Transit</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statCardValue, { color: '#10B981' }]}>{stats.delivered}</Text>
          <Text style={styles.statCardLabel}>Delivered</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statCardValue, { color: '#EF4444' }]}>{stats.delayed}</Text>
          <Text style={styles.statCardLabel}>Delayed</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by tracking number..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['all', 'in-transit', 'delivered', 'pending', 'delayed'].map(filter => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterButton, activeFilter === filter && styles.filterButtonActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterButtonText, activeFilter === filter && styles.filterButtonTextActive]}>
                {filter === 'all' ? 'All' : getStatusLabel(filter)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredShipments}
        renderItem={renderShipmentCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No Shipments Found</Text>
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
  filterButton: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#F3F4F6', marginRight: 8, alignItems: 'center' },
  filterButtonActive: { backgroundColor: '#3B82F6' },
  filterButtonText: { fontSize: 12, fontWeight: '600', color: '#6B7280' },
  filterButtonTextActive: { color: '#fff' },
  listContent: { padding: 16 },
  shipmentCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  cardHeaderLeft: { flex: 1 },
  shipmentId: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  trackingNumber: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  statusText: { fontSize: 10, fontWeight: 'bold' },
  customerSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  customerName: { fontSize: 14, fontWeight: '600', color: '#374151', marginLeft: 8, flex: 1 },
  priorityDot: { width: 8, height: 8, borderRadius: 4 },
  routeSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  routePoint: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  locationText: { fontSize: 12, color: '#6B7280', marginLeft: 6, flex: 1 },
  progressSection: { marginBottom: 12, padding: 12, backgroundColor: '#F9FAFB', borderRadius: 8 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressText: { fontSize: 13, color: '#374151', fontWeight: '500' },
  progressPercent: { fontSize: 13, fontWeight: 'bold', color: '#3B82F6' },
  progressBar: { height: 6, backgroundColor: '#E5E7EB', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#3B82F6', borderRadius: 3 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  footerItem: { flexDirection: 'row', alignItems: 'center' },
  footerText: { fontSize: 12, color: '#6B7280', marginLeft: 6 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#6B7280', marginTop: 16 },
  emptyText: { fontSize: 14, color: '#9CA3AF', marginTop: 8 }
});

export default ShipmentsScreen;
