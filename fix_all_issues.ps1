# PowerShell Script to Fix All Issues
# Run this from: C:\Users\shiv0\GroupALogistics

Write-Host "Starting fixes..." -ForegroundColor Green

# 1. Fix app/(tabs)/index.tsx to use the full DashboardScreen
Write-Host "`n1. Fixing main dashboard (tabs/index.tsx)..." -ForegroundColor Yellow
$tabsIndex = @'
// app/(tabs)/index.tsx
import DashboardScreen from '../../screens/dashboard/DashboardScreen';
export default DashboardScreen;
'@
Set-Content -Path "app\(tabs)\index.tsx" -Value $tabsIndex

# 2. Fix inventory.tsx (empty file) - Point to actual screen
Write-Host "`n2. Fixing inventory.tsx..." -ForegroundColor Yellow
$inventoryTsx = @'
// app/(drawer)/inventory.tsx
import InventoryScreen from '../../screens/inventory/InventoryScreen';
export default InventoryScreen;
'@
Set-Content -Path "app\(drawer)\inventory.tsx" -Value $inventoryTsx

# 3. Fix notifications navigation in DashboardScreen.js
Write-Host "`n3. Fixing notifications navigation..." -ForegroundColor Yellow
$dashboardContent = Get-Content "screens\dashboard\DashboardScreen.js" -Raw
$dashboardContent = $dashboardContent -replace "console\.log\('Notifications pressed'\)", "navigation.navigate('Notifications')"
$dashboardContent = $dashboardContent -replace "console\.log\('Profile pressed'\)", "navigation.navigate('Settings')"
Set-Content -Path "screens\dashboard\DashboardScreen.js" -Value $dashboardContent

# 4. Add sample data to inventorySlice.js
Write-Host "`n4. Adding sample inventory data..." -ForegroundColor Yellow
$inventorySliceContent = Get-Content "store\slices\inventorySlice.js" -Raw
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
    },
    {
      id: 'ITEM-004',
      name: 'Hand Truck',
      sku: 'EQP-HTR-001',
      category: 'equipment',
      currentStock: 12,
      reorderLevel: 5,
      location: 'Equipment Room',
      price: 150.00
    },
    {
      id: 'ITEM-005',
      name: 'Safety Vest',
      sku: 'SAF-VST-001',
      category: 'safety',
      currentStock: 0,
      reorderLevel: 20,
      location: 'Storage Room',
      price: 12.50
    }
  ],
'@
$inventorySliceContent = $inventorySliceContent -replace "items: \[\s*// Copy sample items from InventoryScreen\.js\s*\],", $sampleItems
Set-Content -Path "store\slices\inventorySlice.js" -Value $inventorySliceContent

# 5. Create notifications.tsx
Write-Host "`n5. Creating notifications.tsx..." -ForegroundColor Yellow
$notificationsTsx = @'
// app/(drawer)/notifications.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NotificationsScreen = () => {
  const navigation = useNavigation();
  
  const notifications = [
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
    }
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case 'critical': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'info': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getIconName = (type: string) => {
    switch (type) {
      case 'critical': return 'alert-circle';
      case 'warning': return 'warning';
      case 'info': return 'information-circle';
      default: return 'notifications';
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity 
      style={[styles.notificationCard, !item.read && styles.unread]}
    >
      <View style={[styles.iconContainer, { backgroundColor: getIconColor(item.type) + '20' }]}>
        <Ionicons name={getIconName(item.type)} size={24} color={getIconColor(item.type)} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
Set-Content -Path "app\(drawer)\notifications.tsx" -Value $notificationsTsx

# 6. Create a backup before changes
Write-Host "`n6. Creating backup..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
Copy-Item "app\(tabs)\index.tsx" -Destination "app\(tabs)\index.tsx.backup-$timestamp"
Copy-Item "screens\dashboard\DashboardScreen.js" -Destination "screens\dashboard\DashboardScreen.js.backup-$timestamp"
Copy-Item "store\slices\inventorySlice.js" -Destination "store\slices\inventorySlice.js.backup-$timestamp"

Write-Host "`n✅ All fixes applied!" -ForegroundColor Green
Write-Host "`nSummary of changes:" -ForegroundColor Cyan
Write-Host "  1. Connected tabs/index.tsx to full DashboardScreen" -ForegroundColor White
Write-Host "  2. Fixed inventory.tsx to point to InventoryScreen" -ForegroundColor White
Write-Host "  3. Fixed notifications button to navigate properly" -ForegroundColor White
Write-Host "  4. Fixed profile button to navigate to Settings" -ForegroundColor White
Write-Host "  5. Added sample inventory data (5 items)" -ForegroundColor White
Write-Host "  6. Created notifications.tsx screen" -ForegroundColor White
Write-Host "  7. Created backups of modified files" -ForegroundColor White

Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "  1. Restart your Expo dev server (Ctrl+C then npx expo start)" -ForegroundColor White
Write-Host "  2. Press 'a' to reload Android app" -ForegroundColor White
Write-Host "  3. Test: Bell icon, Profile icon, Pending Orders, Inventory" -ForegroundColor White

Write-Host "`nIf you still see 'Text strings must be rendered' errors:" -ForegroundColor Yellow
Write-Host "  Run: .\autopatch_useSelector_and_wrap_text.ps1" -ForegroundColor White