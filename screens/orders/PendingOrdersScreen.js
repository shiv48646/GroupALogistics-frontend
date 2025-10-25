import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PendingOrdersScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  
  // Mock pending orders data
  const [pendingOrders] = useState([
    {
      id: 'ORD-2345',
      customer: 'Rahul Verma',
      items: '5 Electronics Items',
      pickup: 'Connaught Place, Delhi',
      delivery: 'Sector 18, Noida',
      priority: 'urgent',
      amount: 4500,
      createdAt: '2 hours ago'
    },
    {
      id: 'ORD-2346',
      customer: 'Priya Sharma',
      items: '2 Furniture Items',
      pickup: 'Gurugram Sector 29',
      delivery: 'Dwarka, Delhi',
      priority: 'normal',
      amount: 8900,
      createdAt: '4 hours ago'
    },
    {
      id: 'ORD-2347',
      customer: 'Amit Kumar',
      items: '10 Grocery Boxes',
      pickup: 'Saket, Delhi',
      delivery: 'Faridabad',
      priority: 'express',
      amount: 2200,
      createdAt: '6 hours ago'
    },
    {
      id: 'ORD-2348',
      customer: 'Neha Gupta',
      items: '3 Fashion Items',
      pickup: 'Lajpat Nagar',
      delivery: 'Ghaziabad',
      priority: 'normal',
      amount: 1500,
      createdAt: '8 hours ago'
    },
    {
      id: 'ORD-2349',
      customer: 'Rajesh Singh',
      items: '1 Large Package',
      pickup: 'Rohini, Delhi',
      delivery: 'Greater Noida',
      priority: 'urgent',
      amount: 6700,
      createdAt: '10 hours ago'
    },
    {
      id: 'ORD-2350',
      customer: 'Deepak Sharma',
      items: '4 Medical Supplies',
      pickup: 'AIIMS, Delhi',
      delivery: 'Gurgaon Hospital',
      priority: 'express',
      amount: 3400,
      createdAt: '1 day ago'
    }
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'express': return '#d32f2f';
      case 'urgent': return '#f57c00';
      case 'normal': return '#1976d2';
      default: return '#757575';
    }
  };

  const renderOrder = ({ item }) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderManagement')}
    >
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>{item.id}</Text>
          <Text style={styles.customerName}>{item.customer}</Text>
        </View>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) + '20' }]}>
          <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
            {item.priority.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="cube-outline" size={16} color="#757575" />
          <Text style={styles.detailText}>{item.items}</Text>
        </View>
        
        <View style={styles.locationContainer}>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color="#4caf50" />
            <Text style={styles.locationText} numberOfLines={1}>{item.pickup}</Text>
          </View>
          <Ionicons name="arrow-forward" size={14} color="#999" style={styles.arrow} />
          <View style={styles.locationRow}>
            <Ionicons name="flag-outline" size={16} color="#d32f2f" />
            <Text style={styles.locationText} numberOfLines={1}>{item.delivery}</Text>
          </View>
        </View>
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.amount}>₹{item.amount.toLocaleString()}</Text>
        <Text style={styles.time}>{item.createdAt}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#f57c00" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Pending Orders</Text>
          <Text style={styles.headerSubtitle}>{pendingOrders.length} orders awaiting processing</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{pendingOrders.filter(o => o.priority === 'express').length}</Text>
          <Text style={styles.statLabel}>Express</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{pendingOrders.filter(o => o.priority === 'urgent').length}</Text>
          <Text style={styles.statLabel}>Urgent</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{pendingOrders.filter(o => o.priority === 'normal').length}</Text>
          <Text style={styles.statLabel}>Normal</Text>
        </View>
      </View>

      <FlatList
        data={pendingOrders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#f57c00']} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    backgroundColor: '#f57c00',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 4
  },
  backButton: {
    padding: 8
  },
  headerCenter: {
    flex: 1,
    marginLeft: 12
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2
  },
  filterButton: {
    padding: 8
  },
  statsBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 16,
    elevation: 2
  },
  statItem: {
    flex: 1,
    alignItems: 'center'
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f57c00'
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0'
  },
  listContent: {
    padding: 16
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121'
  },
  customerName: {
    fontSize: 14,
    color: '#757575',
    marginTop: 2
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  orderDetails: {
    marginBottom: 12
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  detailText: {
    fontSize: 14,
    color: '#424242',
    marginLeft: 8
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  locationText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
    flex: 1
  },
  arrow: {
    marginHorizontal: 8
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5'
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50'
  },
  time: {
    fontSize: 12,
    color: '#999'
  }
});

export default PendingOrdersScreen;