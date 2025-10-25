import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  FlatList,
  RefreshControl,
} from 'react-native';

// Import all form components
import { ShipmentForm, VehicleForm, DriverForm } from '../index';

// Import utilities
import { IdGenerators, DateUtils, StringUtils, ErrorUtils } from '../utils';

const FormsShowcase = () => {
  // State for managing different entities
  const [customers, setCustomers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [shipments, setShipments] = useState([]);

  // Modal state
  const [activeModal, setActiveModal] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Active tab state
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Load some mock data to showcase the forms
    const mockCustomers = [
      {
        id: 'CUST-12345001',
        fullName: 'John Smith',
        companyName: 'Tech Solutions Inc.',
        email: 'john@techsolutions.com',
        phone: '+1-555-0123',
        customerType: 'Business',
        customerStatus: 'Active',
        createdAt: '2025-01-15T10:00:00Z'
      },
      {
        id: 'CUST-12345002',
        fullName: 'Sarah Johnson',
        companyName: '',
        email: 'sarah.j@email.com',
        phone: '+1-555-0456',
        customerType: 'Individual',
        customerStatus: 'Active',
        createdAt: '2025-01-14T14:30:00Z'
      }
    ];

    const mockDrivers = [
      {
        id: 'EMP-12345001',
        fullName: 'Mike Davis',
        email: 'mike.davis@company.com',
        phone: '+1-555-0789',
        licenseNumber: 'DL12345678',
        status: 'Active',
        assignedVehicleNumber: 'VEH-001',
        createdAt: '2025-01-10T09:00:00Z'
      }
    ];

    const mockVehicles = [
      {
        id: 'VEH-12345001',
        vehicleNumber: 'VEH-001',
        licensePlate: 'ABC-123',
        make: 'Ford',
        model: 'Transit',
        year: 2023,
        status: 'Available',
        assignedDriverName: 'Mike Davis',
        createdAt: '2025-01-08T11:00:00Z'
      }
    ];

    const mockRoutes = [
      {
        id: 'RT-12345001',
        routeName: 'Downtown Morning Route',
        routeType: 'Delivery',
        status: 'Active',
        assignedDriverName: 'Mike Davis',
        assignedVehicleNumber: 'VEH-001',
        createdAt: '2025-01-12T08:00:00Z'
      }
    ];

    const mockShipments = [
      {
        id: 'SHP12345678901',
        trackingNumber: 'SHP12345678901',
        customerName: 'John Smith',
        packageType: 'Standard',
        status: 'In Transit',
        scheduledDeliveryDate: '2025-01-25',
        createdAt: '2025-01-20T16:00:00Z'
      }
    ];

    setCustomers(mockCustomers);
    setDrivers(mockDrivers);
    setVehicles(mockVehicles);
    setRoutes(mockRoutes);
    setShipments(mockShipments);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadMockData();
      setRefreshing(false);
    }, 1000);
  };

  // Form save handlers
  const handleCustomerSave = (customerData) => {
    if (editingItem) {
      setCustomers(customers.map(c => c.id === editingItem.id ? { ...customerData, id: editingItem.id } : c));
      ErrorUtils.showSuccess('Customer updated successfully!');
    } else {
      setCustomers([...customers, customerData]);
      ErrorUtils.showSuccess('Customer created successfully!');
    }
    setActiveModal(null);
    setEditingItem(null);
  };

  const handleDriverSave = (driverData) => {
    if (editingItem) {
      setDrivers(drivers.map(d => d.id === editingItem.id ? { ...driverData, id: editingItem.id } : d));
      ErrorUtils.showSuccess('Driver updated successfully!');
    } else {
      setDrivers([...drivers, driverData]);
      ErrorUtils.showSuccess('Driver created successfully!');
    }
    setActiveModal(null);
    setEditingItem(null);
  };

  const handleVehicleSave = (vehicleData) => {
    if (editingItem) {
      setVehicles(vehicles.map(v => v.id === editingItem.id ? { ...vehicleData, id: editingItem.id } : v));
      ErrorUtils.showSuccess('Vehicle updated successfully!');
    } else {
      setVehicles([...vehicles, vehicleData]);
      ErrorUtils.showSuccess('Vehicle created successfully!');
    }
    setActiveModal(null);
    setEditingItem(null);
  };

  const handleRouteSave = (routeData) => {
    if (editingItem) {
      setRoutes(routes.map(r => r.id === editingItem.id ? { ...routeData, id: editingItem.id } : r));
      ErrorUtils.showSuccess('Route updated successfully!');
    } else {
      setRoutes([...routes, routeData]);
      ErrorUtils.showSuccess('Route created successfully!');
    }
    setActiveModal(null);
    setEditingItem(null);
  };

  const handleShipmentSave = (shipmentData) => {
    if (editingItem) {
      setShipments(shipments.map(s => s.id === editingItem.id ? { ...shipmentData, id: editingItem.id } : s));
      ErrorUtils.showSuccess('Shipment updated successfully!');
    } else {
      setShipments([...shipments, shipmentData]);
      ErrorUtils.showSuccess('Shipment created successfully!');
    }
    setActiveModal(null);
    setEditingItem(null);
  };

  // Generic handlers
  const handleEdit = (item, formType) => {
    setEditingItem(item);
    setActiveModal(formType);
  };

  const handleDelete = (id, entityType, setState, entities) => {
    ErrorUtils.confirmAction(
      `Are you sure you want to delete this ${entityType}?`,
      () => {
        setState(entities.filter(item => item.id !== id));
        ErrorUtils.showSuccess(`${StringUtils.titleCase(entityType)} deleted successfully!`);
      },
      'Delete Confirmation'
    );
  };

  const closeModal = () => {
    setActiveModal(null);
    setEditingItem(null);
  };

  // Statistics calculation
  const getStats = () => {
    return {
      totalCustomers: customers.length,
      activeCustomers: customers.filter(c => c.customerStatus === 'Active').length,
      totalDrivers: drivers.length,
      availableDrivers: drivers.filter(d => d.status === 'Available').length,
      totalVehicles: vehicles.length,
      availableVehicles: vehicles.filter(v => v.status === 'Available').length,
      totalRoutes: routes.length,
      activeRoutes: routes.filter(r => r.status === 'Active').length,
      totalShipments: shipments.length,
      pendingShipments: shipments.filter(s => s.status !== 'Delivered').length,
    };
  };

  // Render overview cards
  const renderOverviewCard = (title, value, subtitle, color = '#2196F3') => (
    <View style={[styles.overviewCard, { borderLeftColor: color }]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={[styles.cardValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
    </View>
  );

  // Render entity list item
  const renderEntityItem = (item, entityType) => {
    let primaryText, secondaryText, statusColor;

    switch (entityType) {
      case 'customer':
        primaryText = item.fullName || item.companyName;
        secondaryText = `${item.customerType} • ${item.email}`;
        statusColor = item.customerStatus === 'Active' ? '#4CAF50' : '#FF9800';
        break;
      case 'driver':
        primaryText = item.fullName;
        secondaryText = `${item.phone} • License: ${item.licenseNumber}`;
        statusColor = item.status === 'Active' ? '#4CAF50' : '#FF9800';
        break;
      case 'vehicle':
        primaryText = `${item.vehicleNumber} - ${item.make} ${item.model}`;
        secondaryText = `${item.year} • ${item.licensePlate}`;
        statusColor = item.status === 'Available' ? '#4CAF50' : '#FF9800';
        break;
      case 'route':
        primaryText = item.routeName;
        secondaryText = `${item.routeType} • Driver: ${item.assignedDriverName || 'Unassigned'}`;
        statusColor = item.status === 'Active' ? '#4CAF50' : '#FF9800';
        break;
      case 'shipment':
        primaryText = `${item.trackingNumber}`;
        secondaryText = `Customer: ${item.customerName} • ${item.packageType}`;
        statusColor = item.status === 'Delivered' ? '#4CAF50' : item.status === 'In Transit' ? '#2196F3' : '#FF9800';
        break;
      default:
        primaryText = 'Unknown';
        secondaryText = '';
        statusColor = '#999';
    }

    return (
      <View style={styles.entityItem}>
        <View style={styles.entityInfo}>
          <Text style={styles.entityPrimary}>{primaryText}</Text>
          <Text style={styles.entitySecondary}>{secondaryText}</Text>
          <Text style={styles.entityDate}>
            Created: {DateUtils.formatDateTime(item.createdAt)}
          </Text>
        </View>
        <View style={styles.entityActions}>
          <View style={[styles.entityStatus, { backgroundColor: statusColor }]}>
            <Text style={styles.entityStatusText}>
              {item.status || item.customerStatus}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit(item, entityType)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Render tabs content
  const renderTabContent = () => {
    const stats = getStats();

    switch (activeTab) {
      case 'overview':
        return (
          <ScrollView 
            style={styles.tabContent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          >
            <FormSection title="System Overview">
              <View style={styles.overviewGrid}>
                {renderOverviewCard('Total Customers', stats.totalCustomers, `${stats.activeCustomers} active`)}
                {renderOverviewCard('Total Drivers', stats.totalDrivers, `${stats.availableDrivers} available`, '#4CAF50')}
                {renderOverviewCard('Total Vehicles', stats.totalVehicles, `${stats.availableVehicles} available`, '#FF9800')}
                {renderOverviewCard('Total Routes', stats.totalRoutes, `${stats.activeRoutes} active`, '#9C27B0')}
                {renderOverviewCard('Total Shipments', stats.totalShipments, `${stats.pendingShipments} pending`, '#F44336')}
              </View>
            </FormSection>

            <FormSection title="Quick Actions">
              <View style={styles.quickActions}>
                <FormButton title="New Customer" onPress={() => setActiveModal('customer')} />
                <FormButton title="New Driver" onPress={() => setActiveModal('driver')} />
                <FormButton title="New Vehicle" onPress={() => setActiveModal('vehicle')} />
                <FormButton title="New Route" onPress={() => setActiveModal('route')} />
                <FormButton title="New Shipment" onPress={() => setActiveModal('shipment')} />
              </View>
            </FormSection>

            <FormSection title="Recent Activity">
              <Text style={styles.activityText}>
                • Customer "John Smith" created {DateUtils.formatDateTime('2025-01-15T10:00:00Z')}
              </Text>
              <Text style={styles.activityText}>
                • Driver "Mike Davis" assigned to Vehicle VEH-001
              </Text>
              <Text style={styles.activityText}>
                • Route "Downtown Morning Route" activated
              </Text>
              <Text style={styles.activityText}>
                • Shipment SHP12345678901 in transit
              </Text>
            </FormSection>
          </ScrollView>
        );

      case 'customers':
        return (
          <View style={styles.tabContent}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Customers ({customers.length})</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setActiveModal('customer')}
              >
                <Text style={styles.addButtonText}>+ Add</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={customers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderEntityItem(item, 'customer')}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />
          </View>
        );

      case 'drivers':
        return (
          <View style={styles.tabContent}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Drivers ({drivers.length})</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setActiveModal('driver')}
              >
                <Text style={styles.addButtonText}>+ Add</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={drivers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderEntityItem(item, 'driver')}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />
          </View>
        );

      case 'vehicles':
        return (
          <View style={styles.tabContent}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Vehicles ({vehicles.length})</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setActiveModal('vehicle')}
              >
                <Text style={styles.addButtonText}>+ Add</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={vehicles}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderEntityItem(item, 'vehicle')}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />
          </View>
        );

      case 'routes':
        return (
          <View style={styles.tabContent}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Routes ({routes.length})</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setActiveModal('route')}
              >
                <Text style={styles.addButtonText}>+ Add</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={routes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderEntityItem(item, 'route')}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />
          </View>
        );

      case 'shipments':
        return (
          <View style={styles.tabContent}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Shipments ({shipments.length})</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setActiveModal('shipment')}
              >
                <Text style={styles.addButtonText}>+ Add</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={shipments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderEntityItem(item, 'shipment')}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />
          </View>
        );

      default:
        return null;
    }
  };

  const tabs = [
    { id: 'overview', title: 'Overview', icon: '📊' },
    { id: 'customers', title: 'Customers', icon: '👥' },
    { id: 'drivers', title: 'Drivers', icon: '👨‍💼' },
    { id: 'vehicles', title: 'Vehicles', icon: '🚐' },
    { id: 'routes', title: 'Routes', icon: '🗺️' },
    { id: 'shipments', title: 'Shipments', icon: '📦' },
  ];

  return (
    <View style={styles.container}>
      <FormHeader 
        title="Logistics Management"
        subtitle="Complete Forms Showcase"
      />

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText
              ]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Form Modals */}
      <Modal
        visible={activeModal === 'customer'}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <CustomerForm
          mode={editingItem ? 'edit' : 'create'}
          initialData={editingItem}
          onSave={handleCustomerSave}
          onCancel={closeModal}
        />
      </Modal>

      <Modal
        visible={activeModal === 'driver'}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <DriverForm
          mode={editingItem ? 'edit' : 'create'}
          initialData={editingItem}
          onSave={handleDriverSave}
          onCancel={closeModal}
        />
      </Modal>

      <Modal
        visible={activeModal === 'vehicle'}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <VehicleForm
          mode={editingItem ? 'edit' : 'create'}
          initialData={editingItem}
          onSave={handleVehicleSave}
          onCancel={closeModal}
        />
      </Modal>

      <Modal
        visible={activeModal === 'route'}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <RouteForm
          mode={editingItem ? 'edit' : 'create'}
          initialData={editingItem}
          onSave={handleRouteSave}
          onCancel={closeModal}
        />
      </Modal>

      <Modal
        visible={activeModal === 'shipment'}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ShipmentForm
          mode={editingItem ? 'edit' : 'create'}
          initialData={editingItem}
          onSave={handleShipmentSave}
          onCancel={closeModal}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    minWidth: 100,
  },
  activeTab: {
    borderBottomColor: '#2196F3',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabText: {
    fontSize: 12,
    color: '#666',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: '500',
  },
  tabContent: {
    flex: 1,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  overviewCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: '48%',
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#999',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    paddingLeft: 10,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  entityItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  entityInfo: {
    flex: 1,
  },
  entityPrimary: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  entitySecondary: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  entityDate: {
    fontSize: 12,
    color: '#999',
  },
  entityActions: {
    alignItems: 'flex-end',
  },
  entityStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  entityStatusText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  editButtonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
});

export default FormsShowcase;