import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Switch,
  Alert,
  Share,
} from 'react-native';

const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editProfile, setEditProfile] = useState({});
  const [settings, setSettings] = useState({
    notifications: true,
    locationTracking: true,
    darkMode: false,
    autoBackup: true,
    biometricLogin: false,
  });
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadUserProfile();
    loadUserStats();
  }, []);

  const loadUserProfile = () => {
    // Mock user data - replace with actual API call
    const mockProfile = {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1-555-0123',
      role: 'Delivery Driver',
      department: 'Operations',
      employeeId: 'EMP-001',
      joinDate: '2023-03-15',
      address: '123 Main Street, City, State 12345',
      emergencyContact: 'Jane Smith - +1-555-0456',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&size=200&background=2196F3&color=fff',
      badgeNumber: 'BD-12345',
      licenseNumber: 'DL-987654321',
      vehicleAssigned: 'Van #15 (ABC-123)',
    };
    setUserProfile(mockProfile);
    setEditProfile(mockProfile);
  };

  const loadUserStats = () => {
    // Mock stats data
    const mockStats = {
      totalDeliveries: 1248,
      completedRoutes: 156,
      onTimePercentage: 94.5,
      customerRating: 4.8,
      totalDistance: '15,234 km',
      workingDays: 245,
      averageDeliveryTime: '12 min',
      fuelEfficiency: '8.2 L/100km',
    };
    setStats(mockStats);
  };

  const handleUpdateProfile = () => {
    if (!editProfile.name || !editProfile.email) {
      Alert.alert('Error', 'Please fill in required fields');
      return;
    }

    setUserProfile(editProfile);
    setShowEditModal(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Add logout logic here
            Alert.alert('Success', 'Logged out successfully');
          }
        }
      ]
    );
  };

  const handleShareProfile = async () => {
    try {
      const result = await Share.share({
        message: `${userProfile.name}\n${userProfile.role}\n${userProfile.email}\n${userProfile.phone}`,
        title: 'Contact Information',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share profile');
    }
  };

  const handleSettingToggle = (settingKey) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [settingKey]: !prevSettings[settingKey]
    }));
  };

  const menuItems = [
    {
      id: 'edit',
      title: 'Edit Profile',
      icon: '✏️',
      onPress: () => setShowEditModal(true),
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: '⚙️',
      onPress: () => setShowSettingsModal(true),
    },
    {
      id: 'share',
      title: 'Share Profile',
      icon: '📤',
      onPress: handleShareProfile,
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: '❓',
      onPress: () => Alert.alert('Help', 'Contact support at help@company.com'),
    },
    {
      id: 'about',
      title: 'About App',
      icon: 'ℹ️',
      onPress: () => Alert.alert('About', 'Delivery Management App v1.0.0'),
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: '🚪',
      onPress: handleLogout,
      isDestructive: true,
    },
  ];

  const renderStatCard = (title, value, subtitle = '') => (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      {subtitle ? <Text style={styles.statSubtitle}>{subtitle}</Text> : null}
    </View>
  );

  const renderMenuItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.menuItem, item.isDestructive && styles.destructiveMenuItem]}
      onPress={item.onPress}
    >
      <Text style={styles.menuIcon}>{item.icon}</Text>
      <Text style={[styles.menuTitle, item.isDestructive && styles.destructiveMenuTitle]}>
        {item.title}
      </Text>
      <Text style={styles.menuArrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: userProfile.avatar }} style={styles.profileImage} />
        <Text style={styles.profileName}>{userProfile.name}</Text>
        <Text style={styles.profileRole}>{userProfile.role}</Text>
        <Text style={styles.profileDepartment}>{userProfile.department}</Text>
        
        <View style={styles.profileBadge}>
          <Text style={styles.badgeText}>ID: {userProfile.employeeId}</Text>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Performance Stats</Text>
        <View style={styles.statsGrid}>
          {renderStatCard('Total Deliveries', stats.totalDeliveries)}
          {renderStatCard('Completed Routes', stats.completedRoutes)}
          {renderStatCard('On-Time Rate', `${stats.onTimePercentage}%`)}
          {renderStatCard('Customer Rating', `${stats.customerRating} ⭐`)}
        </View>
        <View style={styles.statsGrid}>
          {renderStatCard('Total Distance', stats.totalDistance)}
          {renderStatCard('Working Days', stats.workingDays)}
          {renderStatCard('Avg Delivery Time', stats.averageDeliveryTime)}
          {renderStatCard('Fuel Efficiency', stats.fuelEfficiency)}
        </View>
      </View>

      {/* Profile Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{userProfile.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{userProfile.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Join Date:</Text>
            <Text style={styles.infoValue}>{userProfile.joinDate}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Badge Number:</Text>
            <Text style={styles.infoValue}>{userProfile.badgeNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>License:</Text>
            <Text style={styles.infoValue}>{userProfile.licenseNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Vehicle:</Text>
            <Text style={styles.infoValue}>{userProfile.vehicleAssigned}</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <Text style={styles.sectionTitle}>Options</Text>
        <View style={styles.menuCard}>
          {menuItems.map(renderMenuItem)}
        </View>
      </View>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModal}>
            <ScrollView>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={editProfile.name}
                onChangeText={(text) => setEditProfile({ ...editProfile, name: text })}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={editProfile.email}
                onChangeText={(text) => setEditProfile({ ...editProfile, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={editProfile.phone}
                onChangeText={(text) => setEditProfile({ ...editProfile, phone: text })}
                keyboardType="phone-pad"
              />

              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Address"
                value={editProfile.address}
                onChangeText={(text) => setEditProfile({ ...editProfile, address: text })}
                multiline={true}
                numberOfLines={3}
              />

              <TextInput
                style={styles.input}
                placeholder="Emergency Contact"
                value={editProfile.emergencyContact}
                onChangeText={(text) => setEditProfile({ ...editProfile, emergencyContact: text })}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setShowEditModal(false);
                    setEditProfile(userProfile);
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleUpdateProfile}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Settings Modal */}
      <Modal
        visible={showSettingsModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.settingsModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Settings</Text>
              <TouchableOpacity onPress={() => setShowSettingsModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View style={styles.settingSection}>
                <Text style={styles.settingSectionTitle}>Notifications</Text>
                <View style={styles.settingItem}>
                  <Text style={styles.settingLabel}>Push Notifications</Text>
                  <Switch
                    value={settings.notifications}
                    onValueChange={() => handleSettingToggle('notifications')}
                    trackColor={{ false: '#ccc', true: '#2196F3' }}
                  />
                </View>
              </View>

              <View style={styles.settingSection}>
                <Text style={styles.settingSectionTitle}>Privacy</Text>
                <View style={styles.settingItem}>
                  <Text style={styles.settingLabel}>Location Tracking</Text>
                  <Switch
                    value={settings.locationTracking}
                    onValueChange={() => handleSettingToggle('locationTracking')}
                    trackColor={{ false: '#ccc', true: '#2196F3' }}
                  />
                </View>
              </View>

              <View style={styles.settingSection}>
                <Text style={styles.settingSectionTitle}>Appearance</Text>
                <View style={styles.settingItem}>
                  <Text style={styles.settingLabel}>Dark Mode</Text>
                  <Switch
                    value={settings.darkMode}
                    onValueChange={() => handleSettingToggle('darkMode')}
                    trackColor={{ false: '#ccc', true: '#2196F3' }}
                  />
                </View>
              </View>

              <View style={styles.settingSection}>
                <Text style={styles.settingSectionTitle}>Data</Text>
                <View style={styles.settingItem}>
                  <Text style={styles.settingLabel}>Auto Backup</Text>
                  <Switch
                    value={settings.autoBackup}
                    onValueChange={() => handleSettingToggle('autoBackup')}
                    trackColor={{ false: '#ccc', true: '#2196F3' }}
                  />
                </View>
              </View>

              <View style={styles.settingSection}>
                <Text style={styles.settingSectionTitle}>Security</Text>
                <View style={styles.settingItem}>
                  <Text style={styles.settingLabel}>Biometric Login</Text>
                  <Switch
                    value={settings.biometricLogin}
                    onValueChange={() => handleSettingToggle('biometricLogin')}
                    trackColor={{ false: '#ccc', true: '#2196F3' }}
                  />
                </View>
              </View>

              <View style={styles.settingActions}>
                <TouchableOpacity style={styles.settingActionButton}>
                  <Text style={styles.settingActionText}>Clear Cache</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingActionButton}>
                  <Text style={styles.settingActionText}>Export Data</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.settingActionButton, styles.destructiveAction]}>
                  <Text style={[styles.settingActionText, styles.destructiveActionText]}>
                    Delete Account
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: '#2196F3',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileRole: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '500',
    marginBottom: 3,
  },
  profileDepartment: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  profileBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  badgeText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statCard: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 3,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  statSubtitle: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    marginTop: 2,
  },
  infoContainer: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  menuContainer: {
    padding: 20,
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  destructiveMenuItem: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 25,
  },
  menuTitle: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  destructiveMenuTitle: {
    color: '#F44336',
  },
  menuArrow: {
    fontSize: 20,
    color: '#ccc',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editModal: {
    backgroundColor: '#fff',
    width: '90%',
    maxHeight: '80%',
    borderRadius: 10,
    padding: 20,
  },
  settingsModal: {
    backgroundColor: '#fff',
    width: '90%',
    maxHeight: '85%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 18,
    color: '#666',
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    textAlignVertical: 'top',
    height: 80,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  settingSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingActions: {
    padding: 20,
  },
  settingActionButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  destructiveAction: {
    backgroundColor: '#ffebee',
  },
  settingActionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  destructiveActionText: {
    color: '#F44336',
  },
});

export default ProfileScreen;