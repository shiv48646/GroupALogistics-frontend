import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import analyticsService from '../../services/analyticsService';
import authService from '../../services/authService';

const DashboardScreen = ({ navigation }) => {
  const [stats, setStats] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      // Load user info
      const userResponse = await authService.getCurrentUser();
      setUser(userResponse.data);

      // Load analytics
      const analyticsResponse = await analyticsService.getDashboard();
      setStats(analyticsResponse.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load dashboard data');
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboard();
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await authService.logout();
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.role}>Role: {user?.role || 'N/A'}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {/* Orders Card */}
        <TouchableOpacity
          style={[styles.statCard, { backgroundColor: '#2196F3' }]}
          onPress={() => navigation.navigate('Orders')}
        >
          <Text style={styles.statIcon}>📦</Text>
          <Text style={styles.statValue}>{stats?.orders?.total || 0}</Text>
          <Text style={styles.statLabel}>Total Orders</Text>
          <Text style={styles.statSubtext}>
            {stats?.orders?.pending || 0} pending
          </Text>
        </TouchableOpacity>

        {/* Shipments Card */}
        <TouchableOpacity
          style={[styles.statCard, { backgroundColor: '#4CAF50' }]}
          onPress={() => navigation.navigate('Shipments')}
        >
          <Text style={styles.statIcon}>🚚</Text>
          <Text style={styles.statValue}>{stats?.shipments?.total || 0}</Text>
          <Text style={styles.statLabel}>Shipments</Text>
          <Text style={styles.statSubtext}>
            {stats?.shipments?.inTransit || 0} in transit
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        {/* Vehicles Card */}
        <TouchableOpacity
          style={[styles.statCard, { backgroundColor: '#FF9800' }]}
          onPress={() => navigation.navigate('Fleet')}
        >
          <Text style={styles.statIcon}>🚛</Text>
          <Text style={styles.statValue}>{stats?.vehicles?.total || 0}</Text>
          <Text style={styles.statLabel}>Vehicles</Text>
          <Text style={styles.statSubtext}>
            {stats?.vehicles?.available || 0} available
          </Text>
        </TouchableOpacity>

        {/* Customers Card */}
        <TouchableOpacity
          style={[styles.statCard, { backgroundColor: '#9C27B0' }]}
          onPress={() => navigation.navigate('Customers')}
        >
          <Text style={styles.statIcon}>👥</Text>
          <Text style={styles.statValue}>{stats?.customers?.total || 0}</Text>
          <Text style={styles.statLabel}>Customers</Text>
          <Text style={styles.statSubtext}>
            {stats?.customers?.active || 0} active
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('CreateOrder')}
        >
          <Text style={styles.actionIcon}>➕</Text>
          <Text style={styles.actionText}>Create New Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('TrackShipment')}
        >
          <Text style={styles.actionIcon}>📍</Text>
          <Text style={styles.actionText}>Track Shipment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Analytics')}
        >
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={styles.actionText}>View Analytics</Text>
        </TouchableOpacity>
      </View>

      {/* Connection Status */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ✅ Connected to Production Backend
        </Text>
        <Text style={styles.footerSubtext}>
          Last updated: {new Date().toLocaleTimeString()}
        </Text>
      </View>
    </ScrollView>
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
  header: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  role: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 5,
  },
  statSubtext: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.7,
  },
  quickActions: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  actionButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  actionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  footerSubtext: {
    fontSize: 10,
    color: '#999',
    marginTop: 5,
  },
});

export default DashboardScreen;