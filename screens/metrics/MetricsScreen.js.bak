// screens/metrics/MetricsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const MetricsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Static metrics data
  const metrics = {
    revenue: {
      today: 125000,
      week: 780000,
      month: 3250000,
      trend: '+9.1%'
    },
    operations: {
      activeRoutes: 12,
      completedToday: 45,
      onTimeRate: 91.2,
      activeVehicles: 38
    },
    performance: {
      fleetUtilization: 84.4,
      customerSatisfaction: 4.6,
      avgDeliveryTime: 18.5
    }
  };

  const formatCurrency = (amount) => {
    if (amount >= 100000) return '\u20B9' + (amount / 100000).toFixed(1) + 'L';
    return '\u20B9' + (amount / 1000).toFixed(0) + 'K';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Business Metrics</Text>
          <Text style={styles.subtitle}>Real-time performance dashboard</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revenue Overview</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Icon name="cash" size={32} color="#10B981" />
              <Text style={styles.metricValue}>{formatCurrency(metrics.revenue.today)}</Text>
              <Text style={styles.metricLabel}>Today</Text>
            </View>
            <View style={styles.metricCard}>
              <Icon name="calendar-week" size={32} color="#3B82F6" />
              <Text style={styles.metricValue}>{formatCurrency(metrics.revenue.week)}</Text>
              <Text style={styles.metricLabel}>This Week</Text>
            </View>
            <View style={styles.metricCard}>
              <Icon name="calendar-month" size={32} color="#F59E0B" />
              <Text style={styles.metricValue}>{formatCurrency(metrics.revenue.month)}</Text>
              <Text style={styles.metricLabel}>This Month</Text>
              <Text style={styles.trendPositive}>{String(metrics.revenue.trend)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Operations</Text>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Icon name="routes" size={24} color="#3B82F6" />
              <Text style={styles.statValue}>{String(metrics.operations.activeRoutes)}</Text>
              <Text style={styles.statLabel}>Active Routes</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="check-circle" size={24} color="#10B981" />
              <Text style={styles.statValue}>{String(metrics.operations.completedToday)}</Text>
              <Text style={styles.statLabel}>Completed Today</Text>
            </View>
          </View>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Icon name="truck" size={24} color="#F59E0B" />
              <Text style={styles.statValue}>{String(metrics.operations.activeVehicles)}</Text>
              <Text style={styles.statLabel}>Active Vehicles</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="clock-check" size={24} color="#8B5CF6" />
              <Text style={styles.statValue}>{String(metrics.operations.onTimeRate)}%</Text>
              <Text style={styles.statLabel}>On-Time Rate</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Indicators</Text>
          
          <View style={styles.kpiCard}>
            <View style={styles.kpiHeader}>
              <Text style={styles.kpiTitle}>Fleet Utilization</Text>
              <Text style={styles.kpiValue}>{String(metrics.performance.fleetUtilization)}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, styles.progressBlue, { width: String(metrics.performance.fleetUtilization) + '%' }]} />
            </View>
          </View>

          <View style={styles.kpiCard}>
            <View style={styles.kpiHeader}>
              <Text style={styles.kpiTitle}>Customer Satisfaction</Text>
              <Text style={styles.kpiValue}>{String(metrics.performance.customerSatisfaction)}/5.0</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, styles.progressGreen, { width: String((metrics.performance.customerSatisfaction / 5) * 100) + '%' }]} />
            </View>
          </View>

          <View style={styles.kpiCard}>
            <View style={styles.kpiHeader}>
              <Text style={styles.kpiTitle}>Avg Delivery Time</Text>
              <Text style={styles.kpiValue}>{String(metrics.performance.avgDeliveryTime)}h</Text>
            </View>
            <Text style={styles.kpiSubtext}>Target: 20h</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Routes')}>
            <Icon name="routes" size={24} color="#3B82F6" />
            <Text style={styles.actionText}>View Routes</Text>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('FleetOverview')}>
            <Icon name="truck" size={24} color="#10B981" />
            <Text style={styles.actionText}>Fleet Status</Text>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('OrderManagement')}>
            <Icon name="clipboard-list" size={24} color="#F59E0B" />
            <Text style={styles.actionText}>Orders</Text>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1F2937' },
  subtitle: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  section: { backgroundColor: '#fff', marginTop: 12, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
  metricCard: {
    width: (width - 56) / 3,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    margin: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  metricValue: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginTop: 8 },
  metricLabel: { fontSize: 11, color: '#6B7280', marginTop: 4, textAlign: 'center' },
  trendPositive: { fontSize: 11, fontWeight: '600', color: '#10B981', marginTop: 4 },
  statRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  statItem: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginTop: 8 },
  statLabel: { fontSize: 12, color: '#6B7280', marginTop: 4, textAlign: 'center' },
  kpiCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  kpiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  kpiTitle: { fontSize: 14, fontWeight: '600', color: '#1F2937' },
  kpiValue: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  kpiSubtext: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  progressBar: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  progressBlue: { backgroundColor: '#3B82F6' },
  progressGreen: { backgroundColor: '#10B981' },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 8
  },
  actionText: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1F2937', marginLeft: 12 },
  bottomSpace: { height: 40 }
});

export default MetricsScreen;
