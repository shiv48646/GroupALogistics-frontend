// screens/orders/OrdersListScreen.js - Enhanced with Redux Integration
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Import Redux actions and selectors
import { 
  fetchOrders, 
  selectOrdersByStatus, 
  selectOrdersLoading, 
  selectAllOrders,
  selectTotalRevenue
} from '../../store/slices/ordersSlice';

const OrdersListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  // Redux selectors
  const { userData } = useSelector((state) => state.user);
  const orders = useSelector(typeof selectAllOrders !== 'undefined' ? selectAllOrders : (s) => s);
  const ordersStats = useSelector(typeof selectOrdersByStatus !== 'undefined' ? selectOrdersByStatus : (s) => s); // Now returns counts: { pending: 1, processing: 1, shipped: 1, delivered: 1 }
  const isLoading = useSelector(typeof selectOrdersLoading !== 'undefined' ? selectOrdersLoading : (s) => s);
  const revenue = useSelector(typeof selectTotalRevenue !== 'undefined' ? selectTotalRevenue : (s) => s); // Memoized revenue calculation

  // Load orders on component mount
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleManageOrders = () => {
    navigation.navigate('OrderManagement');
  };

  const handleQuickCreateOrder = () => {
    navigation.navigate('OrderManagement', { initialView: 'create' });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Order Overview</Text>
          <Text style={styles.subtitle}>{userData?.company || 'GroupA Logistics'}</Text>
        </View>
        
        {/* Quick Action Button */}
        <TouchableOpacity 
          style={styles.manageButton}
          onPress={handleManageOrders}
        >
          <Ionicons name="settings-outline" size={20} color="#fff" />
          <Text style={styles.manageButtonText}>Manage</Text>
        </TouchableOpacity>
      </View>

      {/* Loading State */}
      {isLoading && (
        <View style={styles.loadingCard}>
          <Text style={styles.loadingText}>Loading order data...</Text>
        </View>
      )}

      {/* Statistics Cards */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="time-outline" size={24} color="#f39c12" />
          <Text style={styles.cardTitle}>Pending Orders</Text>
        </View>
        <Text style={styles.cardValue}>{ordersStats.pending}</Text>
        <Text style={styles.cardSubtext}>Awaiting processing</Text>
        {ordersStats.pending > 0 && (
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={handleManageOrders}
          >
            <Text style={styles.quickActionText}>Review Pending</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="checkmark-circle-outline" size={24} color="#27ae60" />
          <Text style={styles.cardTitle}>Completed Today</Text>
        </View>
        <Text style={styles.cardValue}>{ordersStats.delivered}</Text>
        <Text style={styles.cardSubtext}>Successfully delivered</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="cash-outline" size={24} color="#3498db" />
          <Text style={styles.cardTitle}>Total Revenue</Text>
        </View>
        <Text style={styles.cardValue}>${revenue.toLocaleString()}</Text>
        <Text style={styles.cardSubtext}>From completed orders</Text>
      </View>

      {/* Order Status Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Order Status Summary</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <View style={[styles.summaryBadge, { backgroundColor: '#f39c12' }]}>
              <Text style={styles.summaryBadgeText}>{ordersStats.pending}</Text>
            </View>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>
          <View style={styles.summaryItem}>
            <View style={[styles.summaryBadge, { backgroundColor: '#3498db' }]}>
              <Text style={styles.summaryBadgeText}>{ordersStats.processing}</Text>
            </View>
            <Text style={styles.summaryLabel}>Processing</Text>
          </View>
          <View style={styles.summaryItem}>
            <View style={[styles.summaryBadge, { backgroundColor: '#9b59b6' }]}>
              <Text style={styles.summaryBadgeText}>{ordersStats.shipped}</Text>
            </View>
            <Text style={styles.summaryLabel}>Shipped</Text>
          </View>
          <View style={styles.summaryItem}>
            <View style={[styles.summaryBadge, { backgroundColor: '#27ae60' }]}>
              <Text style={styles.summaryBadgeText}>{ordersStats.delivered}</Text>
            </View>
            <Text style={styles.summaryLabel}>Delivered</Text>
          </View>
        </View>
      </View>

      {/* Action Cards */}
      <TouchableOpacity 
        style={[styles.card, styles.actionCard]}
        onPress={handleManageOrders}
      >
        <View style={styles.actionCardContent}>
          <View style={styles.actionCardLeft}>
            <Ionicons name="list-outline" size={28} color="#3498db" />
            <View style={styles.actionCardText}>
              <Text style={styles.actionCardTitle}>Full Order Management</Text>
              <Text style={styles.actionCardSubtext}>
                Create, edit, track, and manage all orders
              </Text>
            </View>
          </View>
          <Ionicons name="arrow-forward-outline" size={24} color="#3498db" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.card, styles.actionCard]}
        onPress={handleQuickCreateOrder}
      >
        <View style={styles.actionCardContent}>
          <View style={styles.actionCardLeft}>
            <Ionicons name="add-circle-outline" size={28} color="#27ae60" />
            <View style={styles.actionCardText}>
              <Text style={styles.actionCardTitle}>Quick Add Order</Text>
              <Text style={styles.actionCardSubtext}>
                Fast order creation for urgent shipments
              </Text>
            </View>
          </View>
          <Ionicons name="arrow-forward-outline" size={24} color="#27ae60" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, styles.actionCard]}>
        <View style={styles.actionCardContent}>
          <View style={styles.actionCardLeft}>
            <Ionicons name="bar-chart-outline" size={28} color="#9b59b6" />
            <View style={styles.actionCardText}>
              <Text style={styles.actionCardTitle}>Order Analytics</Text>
              <Text style={styles.actionCardSubtext}>
                View detailed reports and insights
              </Text>
            </View>
          </View>
          <Ionicons name="arrow-forward-outline" size={24} color="#9b59b6" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, styles.actionCard]}>
        <View style={styles.actionCardContent}>
          <View style={styles.actionCardLeft}>
            <Ionicons name="search-outline" size={28} color="#e74c3c" />
            <View style={styles.actionCardText}>
              <Text style={styles.actionCardTitle}>Order Tracking</Text>
              <Text style={styles.actionCardSubtext}>
                Track shipments and delivery status
              </Text>
            </View>
          </View>
          <Ionicons name="arrow-forward-outline" size={24} color="#e74c3c" />
        </View>
      </TouchableOpacity>

      {/* Bottom spacing for safe scrolling */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f8f9fa' 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#2c3e50' 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#7f8c8d' 
  },
  manageButton: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  manageButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6
  },
  loadingCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  loadingText: {
    fontSize: 16,
    color: '#7f8c8d',
    fontStyle: 'italic'
  },
  card: { 
    backgroundColor: '#fff', 
    padding: 20, 
    marginBottom: 15, 
    borderRadius: 12, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 2 
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  cardTitle: { 
    fontSize: 16, 
    color: '#7f8c8d', 
    marginLeft: 10,
    fontWeight: '500'
  },
  cardValue: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#2c3e50',
    marginBottom: 8
  },
  cardSubtext: {
    fontSize: 14,
    color: '#95a5a6',
    marginBottom: 8
  },
  quickActionButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 8
  },
  quickActionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1
  },
  summaryBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  summaryBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  summaryLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center'
  },
  actionCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ecf0f1'
  },
  actionCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  actionCardText: {
    marginLeft: 12,
    flex: 1
  },
  actionCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4
  },
  actionCardSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    flexShrink: 1
  },
  bottomSpacer: {
    height: 40
  }
});

export default OrdersListScreen;
