import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FleetOverview = ({ navigation }) => {
  const [vehicles] = useState([
    {
      id: 'FL-001',
      registrationNumber: 'DL 1C AB 1234',
      type: 'Truck',
      status: 'active',
      driver: { name: 'Rajesh Kumar' },
      fuelLevel: 75
    },
    {
      id: 'FL-002',
      registrationNumber: 'HR 26 CD 5678',
      type: 'Van',
      status: 'idle',
      driver: { name: 'Amit Singh' },
      fuelLevel: 60
    }
  ]);

  const renderVehicle = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="car" size={24} color="#1976d2" />
        <Text style={styles.vehicleId}>{item.registrationNumber}</Text>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'active' ? '#4caf50' : '#ff9800' }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.vehicleType}>{item.type}</Text>
      <Text style={styles.driverName}>Driver: {item.driver?.name || 'Unassigned'}</Text>
      <Text style={styles.fuel}>Fuel: {item.fuelLevel}%</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976d2" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Fleet Overview</Text>
        <Text style={styles.subtitle}>{vehicles.length} Vehicles</Text>
      </View>

      {/* Vehicle List */}
      <FlatList
        data={vehicles}
        renderItem={renderVehicle}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#1976d2',
    padding: 20,
    paddingTop: 16,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  list: { padding: 16 },
  card: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  vehicleId: { fontSize: 16, fontWeight: 'bold', marginLeft: 8, flex: 1 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  vehicleType: { fontSize: 14, color: '#666', marginBottom: 4 },
  driverName: { fontSize: 14, marginBottom: 4 },
  fuel: { fontSize: 14, color: '#388e3c', fontWeight: '500' }
});

export default FleetOverview;