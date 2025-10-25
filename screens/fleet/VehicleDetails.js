// screens/fleet/VehicleDetails.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
  Alert,
  Dimensions,
  Platform,
  Linking
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { updateVehicleStatus, deleteVehicle } from '../../store/slices/fleetSlice';

const { width } = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';

const VehicleDetails = ({ route, navigation }) => {
  const { vehicleId } = route.params;
  const dispatch = useDispatch();
 const vehicle = useSelector((state) => state.fleet?.vehicles?.find(v => v.id === vehicleId));
  const [activeTab, setActiveTab] = useState('overview');

  if (!vehicle) {
    return (
      <View style={styles.container}>
        <Text>Vehicle not found</Text>
      </View>
    );
  }

  const handleStatusChange = (newStatus) => {
    Alert.alert(
      'Change Vehicle Status',
      `Change status to ${newStatus}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            dispatch(updateVehicleStatus({ id: vehicleId, status: newStatus }));
            Alert.alert('Success', `Vehicle status updated to ${newStatus}`);
          }
        }
      ]
    );
  };

  const handleDeleteVehicle = () => {
    Alert.alert(
      'Delete Vehicle',
      `Are you sure you want to delete ${vehicle.id}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteVehicle(vehicleId));
            navigation.goBack();
            Alert.alert('Deleted', 'Vehicle has been removed from the fleet');
          }
        }
      ]
    );
  };

  const handleCallDriver = () => {
    if (vehicle.driver) {
      Linking.openURL(`tel:${vehicle.driver.phone}`);
    }
  };

  const renderTouchable = (onPress, children, style = {}) => {
    if (isAndroid) {
      return (
        <TouchableNativeFeedback
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple('#e3f2fd', false)}
        >
          <View style={style}>{children}</View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity onPress={onPress} style={style} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#388e3c';
      case 'idle': return '#f57c00';
      case 'maintenance': return '#d32f2f';
      default: return '#757575';
    }
  };

  const getDocumentStatusColor = (status) => {
    switch (status) {
      case 'valid': return '#388e3c';
      case 'expiring': return '#f57c00';
      case 'expired': return '#d32f2f';
      default: return '#757575';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976d2" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          {renderTouchable(
            () => navigation.goBack(),
            <Ionicons name="arrow-back" size={24} color="#fff" />,
            styles.backButton
          )}
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>{vehicle.id}</Text>
            <Text style={styles.headerSubtitle}>{vehicle.registrationNumber}</Text>
          </View>
          {renderTouchable(
            () => {
              Alert.alert(
                'Vehicle Actions',
                'Choose an action',
                [
                  { text: 'Edit Vehicle', onPress: () => console.log('Edit') },
                  { text: 'Delete Vehicle', onPress: handleDeleteVehicle, style: 'destructive' },
                  { text: 'Cancel', style: 'cancel' }
                ]
              );
            },
            <Ionicons name="ellipsis-vertical" size={24} color="#fff" />,
            styles.menuButton
          )}
        </View>

        {/* Status Badge */}
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(vehicle.status) }]}>
            <Text style={styles.statusText}>{vehicle.status.toUpperCase()}</Text>
          </View>
          <Text style={styles.vehicleModel}>{vehicle.model} • {vehicle.type}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TabButton
            label="Overview"
            isActive={activeTab === 'overview'}
            onPress={() => setActiveTab('overview')}
          />
          <TabButton
            label="Documents"
            isActive={activeTab === 'documents'}
            onPress={() => setActiveTab('documents')}
          />
          <TabButton
            label="Maintenance"
            isActive={activeTab === 'maintenance'}
            onPress={() => setActiveTab('maintenance')}
          />
        </View>

        {activeTab === 'overview' && (
          <View>
            {/* Current Trip */}
            {vehicle.currentTrip && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Current Trip</Text>
                <View style={styles.card}>
                  <View style={styles.tripHeader}>
                    <Text style={styles.tripOrder}>Order: {vehicle.currentTrip.orderId}</Text>
                    <View style={styles.progressBadge}>
                      <Text style={styles.progressText}>{vehicle.currentTrip.progress}%</Text>
                    </View>
                  </View>
                  <View style={styles.tripRoute}>
                    <View style={styles.routePoint}>
                      <Ionicons name="location" size={16} color="#388e3c" />
                      <Text style={styles.routeText}>{vehicle.currentTrip.origin}</Text>
                    </View>
                    <View style={styles.routeLine} />
                    <View style={styles.routePoint}>
                      <Ionicons name="flag" size={16} color="#d32f2f" />
                      <Text style={styles.routeText}>{vehicle.currentTrip.destination}</Text>
                    </View>
                  </View>
                  <View style={styles.etaRow}>
                    <Ionicons name="time-outline" size={16} color="#757575" />
                    <Text style={styles.etaText}>
                      ETA: {new Date(vehicle.currentTrip.eta).toLocaleString()}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Driver Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Driver Information</Text>
              {vehicle.driver ? (
                <View style={styles.card}>
                  <View style={styles.driverRow}>
                    <View style={styles.driverAvatar}>
                      <Text style={styles.driverInitial}>
                        {vehicle.driver.name.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.driverInfo}>
                      <Text style={styles.driverName}>{vehicle.driver.name}</Text>
                      <Text style={styles.driverDetail}>ID: {vehicle.driver.id}</Text>
                      <Text style={styles.driverDetail}>License: {vehicle.driver.license}</Text>
                    </View>
                  </View>
                  {renderTouchable(
                    handleCallDriver,
                    <View style={styles.callButton}>
                      <Ionicons name="call" size={20} color="#fff" />
                      <Text style={styles.callButtonText}>Call Driver</Text>
                    </View>
                  )}
                </View>
              ) : (
                <View style={styles.card}>
                  <Text style={styles.noDriverText}>No driver assigned</Text>
                  <TouchableOpacity style={styles.assignButton}>
                    <Text style={styles.assignButtonText}>Assign Driver</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Vehicle Metrics */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Vehicle Metrics</Text>
              <View style={styles.metricsGrid}>
                <MetricCard
                  icon="speedometer"
                  label="Mileage"
                  value={`${vehicle.mileage.toLocaleString()} km`}
                  color="#1976d2"
                />
                <MetricCard
                  icon="water"
                  label="Fuel Level"
                  value={`${vehicle.fuelLevel}%`}
                  color={vehicle.fuelLevel < 30 ? '#d32f2f' : '#388e3c'}
                />
                <MetricCard
                  icon="cube"
                  label="Capacity"
                  value={vehicle.capacity}
                  color="#7b1fa2"
                />
                <MetricCard
                  icon="location"
                  label="Location"
                  value={vehicle.currentLocation.address.split(',')[0]}
                  color="#f57c00"
                />
              </View>
            </View>

            {/* Insurance */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Insurance</Text>
              <View style={styles.card}>
                <InfoRow icon="shield-checkmark" label="Provider" value={vehicle.insurance.provider} />
                <InfoRow icon="document-text" label="Policy Number" value={vehicle.insurance.policyNumber} />
                <InfoRow 
                  icon="calendar" 
                  label="Expiry Date" 
                  value={new Date(vehicle.insurance.expiryDate).toLocaleDateString()} 
                />
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.actionsGrid}>
                <ActionButton
                  icon="play"
                  label="Set Active"
                  onPress={() => handleStatusChange('active')}
                  disabled={vehicle.status === 'active'}
                />
                <ActionButton
                  icon="pause"
                  label="Set Idle"
                  onPress={() => handleStatusChange('idle')}
                  disabled={vehicle.status === 'idle'}
                />
                <ActionButton
                  icon="construct"
                  label="Maintenance"
                  onPress={() => handleStatusChange('maintenance')}
                  disabled={vehicle.status === 'maintenance'}
                />
                <ActionButton
                  icon="map"
                  label="Track Live"
                  onPress={() => Alert.alert('Track', 'Live tracking feature coming soon')}
                />
              </View>
            </View>
          </View>
        )}

        {activeTab === 'documents' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vehicle Documents</Text>
            <DocumentCard
              title="Registration Certificate (RC)"
              status={vehicle.documents.rc.status}
              expiry={vehicle.documents.rc.expiryDate}
              getStatusColor={getDocumentStatusColor}
            />
            <DocumentCard
              title="Permit"
              status={vehicle.documents.permit.status}
              expiry={vehicle.documents.permit.expiryDate}
              getStatusColor={getDocumentStatusColor}
            />
            <DocumentCard
              title="Fitness Certificate"
              status={vehicle.documents.fitness.status}
              expiry={vehicle.documents.fitness.expiryDate}
              getStatusColor={getDocumentStatusColor}
            />
            <DocumentCard
              title="Pollution Certificate"
              status={vehicle.documents.pollution.status}
              expiry={vehicle.documents.pollution.expiryDate}
              getStatusColor={getDocumentStatusColor}
            />
          </View>
        )}

        {activeTab === 'maintenance' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Maintenance Schedule</Text>
            <View style={styles.card}>
              <InfoRow 
                icon="calendar-outline" 
                label="Last Maintenance" 
                value={new Date(vehicle.lastMaintenance).toLocaleDateString()} 
              />
              <InfoRow 
                icon="calendar" 
                label="Next Maintenance" 
                value={new Date(vehicle.nextMaintenance).toLocaleDateString()} 
              />
            </View>
            {vehicle.maintenanceIssue && (
              <View style={[styles.card, styles.warningCard]}>
                <View style={styles.warningHeader}>
                  <Ionicons name="warning" size={24} color="#d32f2f" />
                  <Text style={styles.warningTitle}>Active Issue</Text>
                </View>
                <Text style={styles.warningText}>{vehicle.maintenanceIssue}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.scheduleButton}>
              <Ionicons name="add-circle-outline" size={20} color="#1976d2" />
              <Text style={styles.scheduleButtonText}>Schedule Maintenance</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

// Component: Tab Button
const TabButton = ({ label, isActive, onPress }) => {
  const content = (
    <View style={[styles.tab, isActive && styles.tabActive]}>
      <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{label}</Text>
    </View>
  );

  if (isAndroid) {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {content}
    </TouchableOpacity>
  );
};

// Component: Metric Card
const MetricCard = ({ icon, label, value, color }) => (
  <View style={styles.metricCard}>
    <View style={[styles.metricIcon, { backgroundColor: color + '15' }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

// Component: Info Row
const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoLeft}>
      <Ionicons name={icon} size={18} color="#757575" />
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

// Component: Action Button
const ActionButton = ({ icon, label, onPress, disabled }) => {
  const content = (
    <View style={[styles.actionButton, disabled && styles.actionButtonDisabled]}>
      <Ionicons name={icon} size={24} color={disabled ? '#bdbdbd' : '#1976d2'} />
      <Text style={[styles.actionLabel, disabled && styles.actionLabelDisabled]}>{label}</Text>
    </View>
  );

  if (disabled) {
    return content;
  }

  if (isAndroid) {
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple('#e3f2fd', false)}
      >
        {content}
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {content}
    </TouchableOpacity>
  );
};

// Component: Document Card
const DocumentCard = ({ title, status, expiry, getStatusColor }) => (
  <View style={styles.documentCard}>
    <View style={styles.documentHeader}>
      <Ionicons name="document-text" size={24} color="#1976d2" />
      <View style={styles.documentInfo}>
        <Text style={styles.documentTitle}>{title}</Text>
        <Text style={styles.documentExpiry}>Expires: {new Date(expiry).toLocaleDateString()}</Text>
      </View>
    </View>
    <View style={[styles.documentStatus, { backgroundColor: getStatusColor(status) }]}>
      <Text style={styles.documentStatusText}>{status.toUpperCase()}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  header: {
    backgroundColor: '#1976d2',
    paddingTop: 16,
    paddingBottom: 16,
    elevation: 4
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12
  },
  backButton: {
    padding: 8,
    marginRight: 8
  },
  headerCenter: {
    flex: 1
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)'
  },
  menuButton: {
    padding: 8
  },
  statusContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 12
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'white'
  },
  vehicleModel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)'
  },
  content: {
    flex: 1
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 2
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  tabActive: {
    borderBottomColor: '#1976d2'
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#757575'
  },
  tabTextActive: {
    color: '#1976d2',
    fontWeight: '600'
  },
  section: {
    padding: 16
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    marginBottom: 12
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  tripOrder: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212121'
  },
  progressBadge: {
    backgroundColor: '#1976d2',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white'
  },
  tripRoute: {
    marginBottom: 16
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  routeText: {
    fontSize: 14,
    color: '#212121',
    marginLeft: 8,
    fontWeight: '500'
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: '#e0e0e0',
    marginLeft: 8,
    marginVertical: 4
  },
  etaRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  etaText: {
    fontSize: 13,
    color: '#757575',
    marginLeft: 8
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  driverAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1976d2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  driverInitial: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white'
  },
  driverInfo: {
    flex: 1
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4
  },
  driverDetail: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 2
  },
  callButton: {
    backgroundColor: '#388e3c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8
  },
  callButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8
  },
  noDriverText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 12
  },
  assignButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  assignButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white'
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  metricCard: {
    width: (width - 48) / 2,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    alignItems: 'center'
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4
  },
  metricLabel: {
    fontSize: 12,
    color: '#757575'
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5'
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  infoLabel: {
    fontSize: 14,
    color: '#616161',
    marginLeft: 8
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121'
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  actionButton: {
    width: (width - 48) / 2,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    alignItems: 'center'
  },
  actionButtonDisabled: {
    opacity: 0.4
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#212121',
    marginTop: 8
  },
  actionLabelDisabled: {
    color: '#bdbdbd'
  },
  documentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  documentInfo: {
    marginLeft: 12,
    flex: 1
  },
  documentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4
  },
  documentExpiry: {
    fontSize: 12,
    color: '#757575'
  },
  documentStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  documentStatusText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white'
  },
  warningCard: {
    backgroundColor: '#ffebee'
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#d32f2f',
    marginLeft: 8
  },
  warningText: {
    fontSize: 14,
    color: '#c62828'
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 2,
    marginTop: 8
  },
  scheduleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1976d2',
    marginLeft: 8
  },
  bottomSpacing: {
    height: 24
  }
});

export default VehicleDetails;

