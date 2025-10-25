// screens/shipments/ShipmentDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ShipmentDetailsScreen = ({ route, navigation }) => {
  const { shipment } = route.params || {};

  if (!shipment) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Shipment not found</Text>
      </View>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#10B981';
      case 'in-transit': return '#3B82F6';
      case 'pending': return '#F59E0B';
      case 'delayed': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const trackingHistory = [
    { time: '2025-10-01 14:30', location: shipment.currentLocation, status: 'Current Location', icon: 'location' },
    { time: '2025-10-01 09:15', location: 'Surat Hub', status: 'In Transit', icon: 'car-outline' },
    { time: '2025-10-01 06:00', location: 'Mumbai Sorting Center', status: 'Processed', icon: 'cube-outline' },
    { time: '2025-09-30 18:00', location: shipment.origin, status: 'Picked Up', icon: 'package-up' },
    { time: '2025-09-30 15:00', location: shipment.origin, status: 'Order Created', icon: 'file-document' }
  ];

  const handleMarkDelivered = () => {
    Alert.alert(
      'Mark as Delivered',
      'Confirm delivery of this shipment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert('Success', 'Shipment marked as delivered!');
            navigation.goBack();
          }
        }
      ]
    );
  };

  const handleShareTracking = () => {
    Alert.alert('Share Tracking', 'Tracking link: ' + String(shipment.trackingNumber));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-left" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shipment Details</Text>
        <TouchableOpacity onPress={handleShareTracking}>
          <Ionicons name="share-variant" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statusCard}>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(shipment.status) }]} />
          <View style={styles.statusInfo}>
            <Text style={styles.statusLabel}>Current Status</Text>
            <Text style={styles.statusValue}>{shipment.status.toUpperCase().replace('-', ' ')}</Text>
            <Text style={styles.statusLocation}>{shipment.currentLocation}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipment Information</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Shipment ID</Text>
              <Text style={styles.infoValue}>{shipment.id}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Tracking Number</Text>
              <Text style={styles.infoValue}>{shipment.trackingNumber}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Customer</Text>
              <Text style={styles.infoValue}>{shipment.customer}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Priority</Text>
              <Text style={styles.infoValue}>{shipment.priority.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Route Details</Text>
          <View style={styles.routeCard}>
            <View style={styles.routePoint}>
              <View style={styles.routeIconContainer}>
                <Ionicons name="location" size={24} color="#3B82F6" />
              </View>
              <View style={styles.routeInfo}>
                <Text style={styles.routeLabel}>Origin</Text>
                <Text style={styles.routeValue}>{shipment.origin}</Text>
              </View>
            </View>
            <View style={styles.routeDivider} />
            <View style={styles.routePoint}>
              <View style={styles.routeIconContainer}>
                <Ionicons name="map-marker-check" size={24} color="#10B981" />
              </View>
              <View style={styles.routeInfo}>
                <Text style={styles.routeLabel}>Destination</Text>
                <Text style={styles.routeValue}>{shipment.destination}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Package Details</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Ionicons name="cube-outline" size={20} color="#6B7280" />
              <Text style={styles.detailText}>{String(shipment.itemCount)} Items</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="weight" size={20} color="#6B7280" />
              <Text style={styles.detailText}>{shipment.weight}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={20} color="#6B7280" />
              <Text style={styles.detailText}>{shipment.estimatedDelivery}</Text>
            </View>
          </View>
        </View>

        {shipment.driver && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Assigned Resources</Text>
            <View style={styles.resourceCard}>
              <Ionicons name="account" size={20} color="#3B82F6" />
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceLabel}>Driver</Text>
                <Text style={styles.resourceValue}>{shipment.driver}</Text>
              </View>
            </View>
            {shipment.vehicle && (
              <View style={styles.resourceCard}>
                <Ionicons name="car-outline" size={20} color="#10B981" />
                <View style={styles.resourceInfo}>
                  <Text style={styles.resourceLabel}>Vehicle</Text>
                  <Text style={styles.resourceValue}>{shipment.vehicle}</Text>
                </View>
              </View>
            )}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tracking History</Text>
          {trackingHistory.map((event, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={styles.timelineDot}>
                <Ionicons name={event.icon} size={16} color="#3B82F6" />
              </View>
              {index < trackingHistory.length - 1 && <View style={styles.timelineLine} />}
              <View style={styles.timelineContent}>
                <Text style={styles.timelineStatus}>{event.status}</Text>
                <Text style={styles.timelineLocation}>{event.location}</Text>
                <Text style={styles.timelineTime}>{event.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {shipment.status === 'in-transit' && (
          <View style={styles.actionSection}>
            <TouchableOpacity style={styles.actionButton} onPress={handleMarkDelivered}>
              <Ionicons name="check-circle" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Mark as Delivered</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { backgroundColor: '#fff', padding: 20, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  content: { flex: 1 },
  statusCard: { backgroundColor: '#fff', margin: 16, padding: 20, borderRadius: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  statusIndicator: { width: 4, height: 60, borderRadius: 2, marginRight: 16 },
  statusInfo: { flex: 1 },
  statusLabel: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  statusValue: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  statusLocation: { fontSize: 14, color: '#3B82F6' },
  section: { backgroundColor: '#fff', marginTop: 12, padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 },
  infoItem: { width: '50%', padding: 8 },
  infoLabel: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  infoValue: { fontSize: 14, fontWeight: '600', color: '#1F2937' },
  routeCard: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 16 },
  routePoint: { flexDirection: 'row', alignItems: 'center' },
  routeIconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  routeInfo: { flex: 1 },
  routeLabel: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  routeValue: { fontSize: 14, fontWeight: '600', color: '#1F2937' },
  routeDivider: { height: 24, width: 2, backgroundColor: '#E5E7EB', marginLeft: 19, marginVertical: 8 },
  detailsGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  detailItem: { alignItems: 'center' },
  detailText: { fontSize: 12, color: '#6B7280', marginTop: 8 },
  resourceCard: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#F9FAFB', borderRadius: 8, marginBottom: 8 },
  resourceInfo: { marginLeft: 12, flex: 1 },
  resourceLabel: { fontSize: 12, color: '#6B7280' },
  resourceValue: { fontSize: 14, fontWeight: '600', color: '#1F2937', marginTop: 2 },
  timelineItem: { flexDirection: 'row', marginBottom: 24, position: 'relative' },
  timelineDot: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  timelineLine: { position: 'absolute', left: 15, top: 32, width: 2, height: 24, backgroundColor: '#E5E7EB' },
  timelineContent: { flex: 1 },
  timelineStatus: { fontSize: 14, fontWeight: '600', color: '#1F2937', marginBottom: 2 },
  timelineLocation: { fontSize: 13, color: '#6B7280', marginBottom: 2 },
  timelineTime: { fontSize: 12, color: '#9CA3AF' },
  actionSection: { padding: 16 },
  actionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#10B981', padding: 16, borderRadius: 12 },
  actionButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginLeft: 8 },
  errorText: { fontSize: 16, color: '#EF4444', textAlign: 'center' }
});

export default ShipmentDetailsScreen;

