import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TrackPackageScreen = ({ navigation }) => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock tracking data
  const mockTrackingData = {
    'TRK001': {
      id: 'TRK001',
      status: 'in_transit',
      customer: 'Amit Kumar',
      origin: 'Delhi',
      destination: 'Mumbai',
      estimatedDelivery: '18 Oct, 2025',
      currentLocation: 'Jaipur Distribution Center',
      timeline: [
        { status: 'Order Placed', location: 'Delhi Hub', time: '15 Oct, 10:30 AM', completed: true },
        { status: 'Picked Up', location: 'Delhi Hub', time: '15 Oct, 2:45 PM', completed: true },
        { status: 'In Transit', location: 'Jaipur Center', time: '16 Oct, 8:20 AM', completed: true },
        { status: 'Out for Delivery', location: 'Mumbai Hub', time: 'Pending', completed: false },
        { status: 'Delivered', location: 'Customer Address', time: 'Pending', completed: false }
      ]
    },
    'TRK002': {
      id: 'TRK002',
      status: 'delivered',
      customer: 'Priya Sharma',
      origin: 'Bangalore',
      destination: 'Pune',
      estimatedDelivery: '16 Oct, 2025',
      currentLocation: 'Delivered',
      timeline: [
        { status: 'Order Placed', location: 'Bangalore Hub', time: '14 Oct, 9:15 AM', completed: true },
        { status: 'Picked Up', location: 'Bangalore Hub', time: '14 Oct, 11:30 AM', completed: true },
        { status: 'In Transit', location: 'Pune Center', time: '15 Oct, 7:45 AM', completed: true },
        { status: 'Out for Delivery', location: 'Pune Hub', time: '16 Oct, 9:00 AM', completed: true },
        { status: 'Delivered', location: 'Customer Address', time: '16 Oct, 2:30 PM', completed: true }
      ]
    }
  };

  const handleTrack = () => {
    if (!trackingId.trim()) {
      Alert.alert('Error', 'Please enter a tracking ID');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = mockTrackingData[trackingId.toUpperCase()];
      
      if (result) {
        setTrackingResult(result);
      } else {
        Alert.alert('Not Found', 'No shipment found with this tracking ID. Try TRK001 or TRK002');
        setTrackingResult(null);
      }
      
      setIsLoading(false);
    }, 800);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#4caf50';
      case 'in_transit': return '#2196f3';
      case 'pending': return '#ff9800';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return 'checkmark-circle';
      case 'in_transit': return 'car';
      case 'pending': return 'time';
      default: return 'ellipse';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7b1fa2" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Package</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <Text style={styles.searchTitle}>Enter Tracking ID</Text>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#757575" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="e.g., TRK001"
              value={trackingId}
              onChangeText={setTrackingId}
              autoCapitalize="characters"
              placeholderTextColor="#999"
            />
            {trackingId.length > 0 && (
              <TouchableOpacity onPress={() => setTrackingId('')}>
                <Ionicons name="close-circle" size={20} color="#757575" />
              </TouchableOpacity>
            )}
          </View>
          
          <TouchableOpacity 
            style={[styles.trackButton, isLoading && styles.trackButtonDisabled]} 
            onPress={handleTrack}
            disabled={isLoading}
          >
            <Ionicons name="locate" size={20} color="#fff" />
            <Text style={styles.trackButtonText}>
              {isLoading ? 'Tracking...' : 'Track Shipment'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.sampleText}>Try: TRK001 or TRK002</Text>
        </View>

        {/* Tracking Result */}
        {trackingResult && (
          <View style={styles.resultSection}>
            {/* Status Card */}
            <View style={styles.statusCard}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(trackingResult.status) + '20' }]}>
                <Ionicons 
                  name={getStatusIcon(trackingResult.status)} 
                  size={32} 
                  color={getStatusColor(trackingResult.status)} 
                />
              </View>
              <Text style={styles.statusTitle}>
                {trackingResult.status === 'delivered' ? 'Delivered' : 
                 trackingResult.status === 'in_transit' ? 'In Transit' : 'Pending'}
              </Text>
              <Text style={styles.statusSubtitle}>{trackingResult.currentLocation}</Text>
            </View>

            {/* Details Card */}
            <View style={styles.detailsCard}>
              <Text style={styles.cardTitle}>Shipment Details</Text>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Tracking ID:</Text>
                <Text style={styles.detailValue}>{trackingResult.id}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Customer:</Text>
                <Text style={styles.detailValue}>{trackingResult.customer}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>From:</Text>
                <Text style={styles.detailValue}>{trackingResult.origin}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>To:</Text>
                <Text style={styles.detailValue}>{trackingResult.destination}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Expected Delivery:</Text>
                <Text style={styles.detailValue}>{trackingResult.estimatedDelivery}</Text>
              </View>
            </View>

            {/* Timeline */}
            <View style={styles.timelineCard}>
              <Text style={styles.cardTitle}>Tracking History</Text>
              
              {trackingResult.timeline.map((event, index) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View style={[
                      styles.timelineDot, 
                      event.completed ? styles.timelineDotCompleted : styles.timelineDotPending
                    ]}>
                      {event.completed && <Ionicons name="checkmark" size={12} color="#fff" />}
                    </View>
                    {index < trackingResult.timeline.length - 1 && (
                      <View style={[
                        styles.timelineLine,
                        event.completed ? styles.timelineLineCompleted : styles.timelineLinePending
                      ]} />
                    )}
                  </View>
                  
                  <View style={styles.timelineContent}>
                    <Text style={[
                      styles.timelineStatus,
                      event.completed ? styles.timelineStatusCompleted : styles.timelineStatusPending
                    ]}>
                      {event.status}
                    </Text>
                    <Text style={styles.timelineLocation}>{event.location}</Text>
                    <Text style={styles.timelineTime}>{event.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    backgroundColor: '#7b1fa2',
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
  searchSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 12
  },
  searchTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#212121'
  },
  trackButton: {
    backgroundColor: '#7b1fa2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 16,
    gap: 8
  },
  trackButtonDisabled: {
    opacity: 0.6
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  sampleText: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
    marginTop: 12
  },
  resultSection: {
    padding: 16
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2
  },
  statusBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#757575'
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5'
  },
  detailLabel: {
    fontSize: 14,
    color: '#757575'
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121'
  },
  timelineCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2
  },
  timelineItem: {
    flexDirection: 'row',
    marginTop: 16
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timelineDotCompleted: {
    backgroundColor: '#4caf50'
  },
  timelineDotPending: {
    backgroundColor: '#e0e0e0'
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 4
  },
  timelineLineCompleted: {
    backgroundColor: '#4caf50'
  },
  timelineLinePending: {
    backgroundColor: '#e0e0e0'
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 8
  },
  timelineStatus: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4
  },
  timelineStatusCompleted: {
    color: '#212121'
  },
  timelineStatusPending: {
    color: '#757575'
  },
  timelineLocation: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 2
  },
  timelineTime: {
    fontSize: 12,
    color: '#999'
  }
});

export default TrackPackageScreen;