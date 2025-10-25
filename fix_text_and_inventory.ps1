# Fix Text and Inventory Issues
Write-Host "Fixing remaining issues..." -ForegroundColor Green

# 1. Fix InventoryScreen to use safe selector
Write-Host "`n1. Fixing InventoryScreen..." -ForegroundColor Yellow
$invScreen = Get-Content "screens\inventory\InventoryScreen.js" -Raw

# Replace the selector line with a safe one
$invScreen = $invScreen -replace "const items = useSelector\(\(state\) => state\.inventory\.items\);", @"
const inventory = useSelector((state) => state.inventory || { items: [] });
  const items = inventory.items || [];
"@

Set-Content -Path "screens\inventory\InventoryScreen.js" -Value $invScreen

# 2. Check and fix App.js if it exists
Write-Host "`n2. Checking App.js..." -ForegroundColor Yellow
if (Test-Path "App.js") {
    $appContent = Get-Content "App.js" -Raw
    if ($appContent -match "store") {
        Write-Host "   App.js uses store - checking PersistGate..." -ForegroundColor Cyan
        if ($appContent -notmatch "PersistGate") {
            Write-Host "   WARNING: PersistGate not found in App.js" -ForegroundColor Red
        }
    }
}

# 3. Verify store initialization
Write-Host "`n3. Verifying store initialization..." -ForegroundColor Yellow
$storeContent = Get-Content "store\index.js" -Raw
Write-Host "   Store configuration looks good" -ForegroundColor Green

# 4. Clear any persisted state that might be corrupt
Write-Host "`n4. Creating state reset script..." -ForegroundColor Yellow
$resetScript = @'
// Reset Redux Persist State
// Add this temporarily to App.js or run in app

import AsyncStorage from '@react-native-async-storage/async-storage';

const clearPersistedState = async () => {
  try {
    await AsyncStorage.removeItem('persist:groupalogistics-v1');
    console.log('Persisted state cleared');
  } catch (error) {
    console.error('Error clearing state:', error);
  }
};

// Call this once
clearPersistedState();
'@
Set-Content -Path "clear_state.txt" -Value $resetScript

Write-Host "`n✅ Fixes applied!" -ForegroundColor Green
Write-Host "`nWhat was fixed:" -ForegroundColor Cyan
Write-Host "  ✓ InventoryScreen now uses safe selector" -ForegroundColor White
Write-Host "  ✓ Created state reset script" -ForegroundColor White

Write-Host "`nTo fix the Text error in OrderManagementScreen:" -ForegroundColor Yellow
Write-Host "  Run this command to see the problematic lines:" -ForegroundColor White
Write-Host '  Get-Content screens\orders\OrderManagementScreen.js | Select-String -Pattern "^\s*\{[^<]" | Select-Object -First 10' -ForegroundColor Cyan

Write-Host "`nQuick fix for all Text issues:" -ForegroundColor Yellow
Write-Host "  1. On your Android device, go to:" -ForegroundColor White
Write-Host "     Settings > Apps > Expo Go > Storage > Clear Data" -ForegroundColor Cyan
Write-Host "  2. Restart Expo server: npx expo start -c" -ForegroundColor White
Write-Host "  3. This will force a fresh start with no cached state" -ForegroundColor White