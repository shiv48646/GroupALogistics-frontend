import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { orderService } from '../../services';  // ✅ FIXED IMPORT

const OrdersListScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;

  useEffect(() => {
    loadOrders(1);
  }, []);

  const loadOrders = async (pageToLoad = 1) => {
    try {
      if (!refreshing) {
        setLoading(true);
      }

      const response = await orderService.getOrders(pageToLoad, PAGE_SIZE);

      // Handle different response structures
      const ordersFromApi =
        response?.data?.orders ??
        response?.orders ??
        [];

      setOrders(Array.isArray(ordersFromApi) ? ordersFromApi : []);
      setPage(pageToLoad);
    } catch (error) {
      console.error('Failed to load orders', error);
      Alert.alert('Error', 'Failed to load orders');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadOrders(1);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#FF9800',
      processing: '#2196F3',
      shipped: '#9C27B0',
      delivered: '#4CAF50',
      cancelled: '#f44336',
    };
    return colors[status] || '#999';
  };

  const renderOrderCard = ({ item }) => {
    const createdAt = item.createdAt ? new Date(item.createdAt) : null;

    return (
      <TouchableOpacity
        style={styles.orderCard}
        onPress={() => navigation.navigate('OrderDetail', { orderId: item._id })}
      >
        <View style={styles.orderHeader}>
          <Text style={styles.orderNumber}>
            📦 {item.orderNumber || item._id}
          </Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          >
            <Text style={styles.statusText}>{item.status || 'unknown'}</Text>
          </View>
        </View>

        <Text style={styles.customerName}>
          Customer: {item.customer?.name || 'N/A'}
        </Text>

        <View style={styles.orderDetails}>
          <Text style={styles.detailText}>
            Items: {Array.isArray(item.items) ? item.items.length : 0}
          </Text>
          <Text style={styles.amount}>
            ₹{item.totalAmount != null ? item.totalAmount : '0'}
          </Text>
        </View>

        <Text style={styles.date}>
          {createdAt ? createdAt.toLocaleDateString() : 'No date'}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading && !refreshing && orders.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={{ marginTop: 8 }}>Loading orders...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrderCard}
        keyExtractor={(item) => String(item._id)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No orders found</Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => navigation.navigate('CreateOrder')}
            >
              <Text style={styles.createButtonText}>Create First Order</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={
          orders.length === 0 ? styles.emptyListContent : styles.listContent
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateOrder')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  customerName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '300',
  },
});

export default OrdersListScreen;