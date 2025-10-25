import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DeliveryMetricsScreen = ({ navigation }) => {
  const [timeframe, setTimeframe] = useState('week');

  const metricsData = {
    onTimeRate: 94.2,
    totalDeliveries: 156,
    onTimeDeliveries: 147,
    lateDeliveries: 9,
    avgDeliveryTime: '4.2 hours',
    trend: '+1.2%'
  };

  const recentDeliveries = [
    { id: 'DEL-001', customer: 'Amit Kumar', time: '2h 15m', status: 'on-time', route: 'Route 12' },
    { id: 'DEL-002', customer: 'Priya Sharma', time: '3h 45m', status: 'on-time', route: 'Route 8' },
    { id: 'DEL-003', customer: 'Rajesh Singh', time: '5h 30m', status: 'late', route: 'Route 15' },
    { id: 'DEL-004', customer: 'Neha Gupta', time: '1h 55m', status: 'on-time', route: 'Route 3' },
    { id: 'DEL-005', customer: 'Deepak Verma', time: '4h 10m', status: 'on-time', route: 'Route 7' },
  ];

  const performanceByRoute = [
    { route: 'Route 12', deliveries: 45, onTime: 43, rate: 95.6 },
    { route: 'Route 8', deliveries: 38, onTime: 36, rate: 94.7 },
    { route: 'Route 15', deliveries: 32, onTime: 28, rate: 87.5 },
    { route: 'Route 3', deliveries: 41, onTime: 40, rate: 97.6 },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7b1fa2" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Metrics</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Metric Card */}
        <View style={styles.mainMetricCard}>
          <View style={styles.mainMetricIconContainer}>
            <Ionicons name="time" size={48} color="#7b1fa2" />
          </View>
          <Text style={styles.mainMetricValue}>{metricsData.onTimeRate}%</Text>
          <Text style={styles.mainMetricLabel}>On-Time Delivery Rate</Text>
          <View style={styles.trendBadge}>
            <Ionicons name="trending-up" size={16} color="#4caf50" />
            <Text style={styles.trendText}>{metricsData.trend} from last week</Text>
          </View>
        </View>

        {/* Time Filter */}
        <View style={styles.filterContainer}>
          {['week', 'month', 'year'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[styles.filterButton, timeframe === period && styles.filterButtonActive]}
              onPress={() => setTimeframe(period)}
            >
              <Text style={[styles.filterText, timeframe === period && styles.filterTextActive]}>
                This {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={32} color="#4caf50" />
            <Text style={styles.statValue}>{metricsData.onTimeDeliveries}</Text>
            <Text style={styles.statLabel}>On-Time</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="alert-circle" size={32} color="#f57c00" />
            <Text style={styles.statValue}>{metricsData.lateDeliveries}</Text>
            <Text style={styles.statLabel}>Late</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="bicycle" size={32} color="#2196f3" />
            <Text style={styles.statValue}>{metricsData.totalDeliveries}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="speedometer" size={32} color="#9c27b0" />
            <Text style={styles.statValue}>{metricsData.avgDeliveryTime}</Text>
            <Text style={styles.statLabel}>Avg Time</Text>
          </View>
        </View>

        {/* Performance by Route */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance by Route</Text>
          {performanceByRoute.map((route, index) => (
            <View key={index} style={styles.routeCard}>
              <View style={styles.routeHeader}>
                <Text style={styles.routeName}>{route.route}</Text>
                <Text style={[styles.routeRate, { color: route.rate >= 95 ? '#4caf50' : route.rate >= 90 ? '#f57c00' : '#d32f2f' }]}>
                  {route.rate}%
                </Text>
              </View>
              <View style={styles.routeStats}>
                <Text style={styles.routeStat}>{route.onTime}/{route.deliveries} on-time</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { 
                  width: `${route.rate}%`,
                  backgroundColor: route.rate >= 95 ? '#4caf50' : route.rate >= 90 ? '#f57c00' : '#d32f2f'
                }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Recent Deliveries */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Deliveries</Text>
          {recentDeliveries.map((delivery, index) => (
            <View key={index} style={styles.deliveryCard}>
              <View style={styles.deliveryLeft}>
                <Ionicons 
                  name={delivery.status === 'on-time' ? 'checkmark-circle' : 'alert-circle'} 
                  size={24} 
                  color={delivery.status === 'on-time' ? '#4caf50' : '#f57c00'} 
                />
                <View style={styles.deliveryInfo}>
                  <Text style={styles.deliveryId}>{delivery.id}</Text>
                  <Text style={styles.deliveryCustomer}>{delivery.customer}</Text>
                  <Text style={styles.deliveryRoute}>{delivery.route}</Text>
                </View>
              </View>
              <View style={styles.deliveryRight}>
                <Text style={styles.deliveryTime}>{delivery.time}</Text>
                <View style={[styles.statusBadge, { backgroundColor: delivery.status === 'on-time' ? '#e8f5e9' : '#fff3e0' }]}>
                  <Text style={[styles.statusText, { color: delivery.status === 'on-time' ? '#4caf50' : '#f57c00' }]}>
                    {delivery.status === 'on-time' ? 'On-Time' : 'Late'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
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
  mainMetricCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3
  },
  mainMetricIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3e5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  mainMetricValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#7b1fa2'
  },
  mainMetricLabel: {
    fontSize: 16,
    color: '#757575',
    marginTop: 8
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 12
  },
  trendText: {
    fontSize: 12,
    color: '#4caf50',
    marginLeft: 4,
    fontWeight: '500'
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  filterButtonActive: {
    backgroundColor: '#7b1fa2',
    borderColor: '#7b1fa2'
  },
  filterText: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '500'
  },
  filterTextActive: {
    color: '#fff'
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16
  },
  statCard: {
    width: (width - 48) / 2,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 8
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12
  },
  routeCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  routeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121'
  },
  routeRate: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  routeStats: {
    marginBottom: 8
  },
  routeStat: {
    fontSize: 12,
    color: '#757575'
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: 4
  },
  deliveryCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2
  },
  deliveryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  deliveryInfo: {
    marginLeft: 12,
    flex: 1
  },
  deliveryId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121'
  },
  deliveryCustomer: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2
  },
  deliveryRoute: {
    fontSize: 11,
    color: '#999',
    marginTop: 2
  },
  deliveryRight: {
    alignItems: 'flex-end'
  },
  deliveryTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 6
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600'
  }
});

export default DeliveryMetricsScreen;