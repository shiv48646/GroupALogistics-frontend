// screens/settings/SettingsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    pushNotifications: true,
    darkMode: false,
    language: 'English',
    autoSync: true,
    biometricAuth: false
  });

  const [userProfile] = useState({
    name: 'Shiv Kumar',
    email: 'shiv@groupalogistics.com',
    phone: '+91 98765 43210',
    role: 'Admin',
    company: 'Group A Logistics'
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { profile: userProfile });
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Password change functionality will be implemented');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => Alert.alert('Logged out') }
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, rightComponent }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color="#3B82F6" />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent || <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{userProfile.name.split(' ').map(n => n[0]).join('')}</Text>
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userProfile.name}</Text>
              <Text style={styles.profileRole}>{userProfile.role}</Text>
              <Text style={styles.profileEmail}>{userProfile.email}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
            <Ionicons name="create-outline" size={18} color="#3B82F6" />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <SettingItem
              icon="person-outline"
              title="Personal Information"
              subtitle="Update your personal details"
              onPress={handleEditProfile}
            />
            <SettingItem
              icon="lock-closed-outline"
              title="Change Password"
              subtitle="Update your password"
              onPress={handleChangePassword}
            />
            <SettingItem
              icon="shield-checkmark-outline"
              title="Privacy & Security"
              subtitle="Manage your privacy settings"
              onPress={() => Alert.alert('Privacy Settings', 'Privacy settings will be implemented')}
            />
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            <SettingItem
              icon="moon-outline"
              title="Dark Mode"
              subtitle="Enable dark theme"
              rightComponent={
                <Switch
                  value={settings.darkMode}
                  onValueChange={() => toggleSetting('darkMode')}
                  trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                />
              }
            />
            <SettingItem
              icon="language-outline"
              title="Language"
              subtitle={settings.language}
              onPress={() => Alert.alert('Language', 'Language selection will be implemented')}
            />
            <SettingItem
              icon="sync-outline"
              title="Auto Sync"
              subtitle="Automatically sync data"
              rightComponent={
                <Switch
                  value={settings.autoSync}
                  onValueChange={() => toggleSetting('autoSync')}
                  trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                />
              }
            />
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.card}>
            <SettingItem
              icon="notifications-outline"
              title="Push Notifications"
              subtitle="Receive push notifications"
              rightComponent={
                <Switch
                  value={settings.pushNotifications}
                  onValueChange={() => toggleSetting('pushNotifications')}
                  trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                />
              }
            />
            <SettingItem
              icon="mail-outline"
              title="Email Notifications"
              subtitle="Receive email updates"
              rightComponent={
                <Switch
                  value={settings.emailNotifications}
                  onValueChange={() => toggleSetting('emailNotifications')}
                  trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                />
              }
            />
          </View>
        </View>

        {/* Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.card}>
            <SettingItem
              icon="finger-print-outline"
              title="Biometric Authentication"
              subtitle="Use fingerprint or face ID"
              rightComponent={
                <Switch
                  value={settings.biometricAuth}
                  onValueChange={() => toggleSetting('biometricAuth')}
                  trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                />
              }
            />
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            <SettingItem
              icon="information-circle-outline"
              title="App Version"
              subtitle="1.0.0"
            />
            <SettingItem
              icon="document-text-outline"
              title="Terms & Conditions"
              onPress={() => Alert.alert('Terms', 'Terms and conditions will be displayed')}
            />
            <SettingItem
              icon="shield-outline"
              title="Privacy Policy"
              onPress={() => Alert.alert('Privacy Policy', 'Privacy policy will be displayed')}
            />
            <SettingItem
              icon="help-circle-outline"
              title="Help & Support"
              onPress={() => Alert.alert('Support', 'Support options will be displayed')}
            />
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Group A Logistics v1.0.0</Text>
          <Text style={styles.footerText}> 2025 All rights reserved</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { backgroundColor: '#fff', padding: 20, paddingTop: 50, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1F2937' },
  content: { flex: 1 },
  profileCard: { backgroundColor: '#fff', margin: 16, padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatarContainer: { marginRight: 16 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#3B82F6', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  profileRole: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  profileEmail: { fontSize: 14, color: '#9CA3AF', marginTop: 4 },
  editProfileButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 8, borderWidth: 1, borderColor: '#3B82F6', gap: 6 },
  editProfileText: { fontSize: 14, fontWeight: '600', color: '#3B82F6' },
  section: { marginBottom: 8 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#6B7280', marginLeft: 16, marginBottom: 8, marginTop: 8 },
  card: { backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', overflow: 'hidden' },
  settingItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  settingLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconContainer: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  settingContent: { flex: 1 },
  settingTitle: { fontSize: 15, fontWeight: '500', color: '#1F2937' },
  settingSubtitle: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', marginHorizontal: 16, marginVertical: 16, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#FEE2E2', gap: 8 },
  logoutText: { fontSize: 15, fontWeight: '600', color: '#EF4444' },
  footer: { alignItems: 'center', paddingVertical: 24 },
  footerText: { fontSize: 12, color: '#9CA3AF', marginTop: 4 }
});

export default SettingsScreen;
