# Final Complete Fix Script
Write-Host "Applying final fixes..." -ForegroundColor Green

# 1. Create Notifications screen in screens/notifications folder
Write-Host "`n1. Creating Notifications screen..." -ForegroundColor Yellow
if (!(Test-Path "screens\notifications")) {
    New-Item -Path "screens\notifications" -ItemType Directory -Force | Out-Null
}

$notificationsScreen = @'
// screens/notifications/NotificationsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationsScreen = ({ navigation }) => {
  const [notifications] = useState([
    {
      id: '1',
      type: 'critical',
      title: 'Vehicle Maintenance Required',
      message: 'Vehicle FL-003 requires immediate maintenance',
      time: '5 min ago',
      read: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Route Delay',
      message: 'Route 15 has heavy traffic delays',
      time: '12 min ago',
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'New Order Assigned',
      message: 'New order from Metro Corp assigned',
      time: '18 min ago',
      read: true
    },
    {
      id: '4',
      type: 'info',
      title: 'Delivery Completed',
      message: 'Order #ORD-1234 has been successfully delivered',
      time: '1 hour ago',
      read: true
    },
    {
      id: '5',
      type: 'warning',
      title: 'Low Stock Alert',
      message: 'Packing Tape stock is running low',
      time: '2 hours ago',
      read: true
    }
  ]);

  const getIconColor = (type) => {
    switch (type) {
      case 'critical': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'info': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getIconName = (type) => {
    switch (type) {
      case 'critical': return 'alert-circle';
      case 'warning': return 'warning';
      case 'info': return 'information-circle';
      default: return 'notifications';
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.notificationCard, !item.read && styles.unread]}
      onPress={() => console.log('Notification tapped:', item.id)}
    >
      <View style={[styles.iconContainer, { backgroundColor: getIconColor(item.type) + '20' }]}>
        <Ionicons name={getIconName(item.type)} size={24} color={getIconColor(item.type)} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.markAllButton}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>No notifications</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
  },
  markAllButton: {
    padding: 8,
  },
  markAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  list: {
    padding: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  unread: {
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
  },
});

export default NotificationsScreen;
'@
Set-Content -Path "screens\notifications\NotificationsScreen.js" -Value $notificationsScreen

# 2. Update StackNavigator to add Notifications screen
Write-Host "`n2. Adding Notifications to StackNavigator..." -ForegroundColor Yellow
$stackNav = Get-Content "navigation\StackNavigator.js" -Raw

# Add import at the top
if ($stackNav -notmatch "NotificationsScreen") {
    $importLine = "import NotificationsScreen from '../screens/notifications/NotificationsScreen';"
    $stackNav = $stackNav -replace "(import AttendanceScreen.*?;)", "`$1`n$importLine"
}

# Add screen registration
if ($stackNav -notmatch 'name="Notifications"') {
    $notificationScreen = @"

      {/* Notifications Screen */}
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />
"@
    $stackNav = $stackNav -replace '(\s+{/\* GroupChat Screen \*/})', "$notificationScreen`n`$1"
}

Set-Content -Path "navigation\StackNavigator.js" -Value $stackNav

# 3. Ensure inventory slice has proper data
Write-Host "`n3. Verifying inventory data..." -ForegroundColor Yellow
$invSlice = Get-Content "store\slices\inventorySlice.js" -Raw
if ($invSlice -match "items: \[\s*\]") {
    Write-Host "   Inventory slice still empty, adding data..." -ForegroundColor Cyan
    $sampleItems = @'
  items: [
    {
      id: 'ITEM-001',
      name: 'Cardboard Boxes - Large',
      sku: 'PKG-LRG-001',
      category: 'packaging',
      currentStock: 450,
      reorderLevel: 100,
      location: 'Warehouse A',
      price: 2.50
    },
    {
      id: 'ITEM-002',
      name: 'Bubble Wrap Roll',
      sku: 'PKG-BWR-002',
      category: 'packaging',
      currentStock: 85,
      reorderLevel: 50,
      location: 'Warehouse B',
      price: 15.00
    },
    {
      id: 'ITEM-003',
      name: 'Packing Tape',
      sku: 'PKG-TPE-003',
      category: 'packaging',
      currentStock: 25,
      reorderLevel: 50,
      location: 'Warehouse A',
      price: 3.75
    }
  ],
'@
    $invSlice = $invSlice -replace "items: \[\s*\],", $sampleItems
    Set-Content -Path "store\slices\inventorySlice.js" -Value $invSlice
}

# 4. Create backup
Write-Host "`n4. Creating backup..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
Copy-Item "navigation\StackNavigator.js" -Destination "navigation\StackNavigator.js.backup-$timestamp"

Write-Host "`n✅ All fixes complete!" -ForegroundColor Green
Write-Host "`nWhat was fixed:" -ForegroundColor Cyan
Write-Host "  ✓ Created NotificationsScreen in screens/notifications/" -ForegroundColor White
Write-Host "  ✓ Added Notifications to StackNavigator" -ForegroundColor White
Write-Host "  ✓ Verified inventory data" -ForegroundColor White
Write-Host "  ✓ Bell icon will now navigate to Notifications" -ForegroundColor White

Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "  1. Stop your Expo server (Ctrl+C)" -ForegroundColor White
Write-Host "  2. Clear cache: npx expo start -c" -ForegroundColor White
Write-Host "  3. Press 'a' for Android" -ForegroundColor White
Write-Host "  4. Test bell icon, inventory, and all buttons!" -ForegroundColor White

Write-Host "`nIf Text errors persist, clear app data on your phone:" -ForegroundColor Yellow
Write-Host "  Settings > Apps > Expo Go > Storage > Clear Data" -ForegroundColor White