# Fix Text Errors and Add PersistGate
Write-Host "Fixing Text errors and adding PersistGate..." -ForegroundColor Green

# 1. Fix OrderManagementScreen.js - Add missing comma
Write-Host "`n1. Fixing OrderManagementScreen.js..." -ForegroundColor Yellow
$orderScreen = Get-Content "screens\orders\OrderManagementScreen.js" -Raw

# Fix the missing comma on line with Phone Case
$orderScreen = $orderScreen -replace "(\{ id: 2, name: 'Phone Case', quantity: 2, price: 50\.00 \})\s+(\{ id: 4)", '$1,`n        $2'

Set-Content -Path "screens\orders\OrderManagementScreen.js" -Value $orderScreen

# 2. Fix App.js - Add PersistGate
Write-Host "`n2. Adding PersistGate to App.js..." -ForegroundColor Yellow
$appJs = @'
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, ActivityIndicator, View, Text, LogBox } from 'react-native';
import { store, persistor } from './store';
import AppNavigator from './navigation/AppNavigator';

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
    <ActivityIndicator size="large" color="#3498db" />
    <Text style={{ marginTop: 10, fontSize: 16, color: '#7f8c8d' }}>Loading GroupA Logistics...</Text>
  </View>
);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <AppNavigator />
        <StatusBar style="auto" />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
'@
Set-Content -Path "App.js" -Value $appJs

# 3. Create backup
Write-Host "`n3. Creating backups..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
Copy-Item "screens\orders\OrderManagementScreen.js" -Destination "screens\orders\OrderManagementScreen.js.backup-$timestamp"
Copy-Item "App.js" -Destination "App.js.backup-$timestamp"

Write-Host "`n=== All fixes applied ===" -ForegroundColor Green
Write-Host "`nWhat was fixed:" -ForegroundColor Cyan
Write-Host "  - Fixed missing comma in OrderManagementScreen.js" -ForegroundColor White
Write-Host "  - Added PersistGate to App.js for proper state persistence" -ForegroundColor White
Write-Host "  - Created backups of both files" -ForegroundColor White

Write-Host "`nCRITICAL: Clear persisted state on your device!" -ForegroundColor Red
Write-Host "`nOn your Android device:" -ForegroundColor Yellow
Write-Host "  1. Close Expo Go app completely" -ForegroundColor White
Write-Host "  2. Settings - Apps - Expo Go - Storage - Clear Data" -ForegroundColor Cyan
Write-Host "  3. Restart Expo: npx expo start -c" -ForegroundColor White
Write-Host "  4. Open app in Expo Go" -ForegroundColor White

Write-Host "`nThis will fix all remaining errors!" -ForegroundColor Green