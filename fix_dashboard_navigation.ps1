# Fix Dashboard Navigation for Cards and Quick Actions
Write-Host "Fixing dashboard navigation..." -ForegroundColor Green

# Read the DashboardScreen.js file
$dashboardFile = "screens\dashboard\DashboardScreen.js"
$content = Get-Content $dashboardFile -Raw

# 1. Fix Pending Orders KPI Card - Change from OrdersList to PendingOrders
Write-Host "`n1. Fixing Pending Orders card..." -ForegroundColor Yellow
$content = $content -replace "onPress=\{\(\) => handleModuleNavigation\('Order Management', 'OrdersList'\)\}", "onPress={() => navigation.navigate('PendingOrders')}"

# 2. Fix On-Time Rate KPI Card - Change to DeliveryMetrics
Write-Host "2. Fixing On-Time Rate card..." -ForegroundColor Yellow
$content = $content -replace "onPress=\{\(\) => handleModuleNavigation\('Performance', 'DeliveryMetrics'\)\}", "onPress={() => navigation.navigate('DeliveryMetrics')}"

# 3. Fix New Order Quick Action - Change from CreateOrder to OrderManagement
Write-Host "3. Fixing New Order button..." -ForegroundColor Yellow
$content = $content -replace "onPress=\{\(\) => handleModuleNavigation\('Orders', 'CreateOrder'\)\}", "onPress={() => navigation.navigate('CreateOrder')}"

# 4. Fix Add Driver Quick Action
Write-Host "4. Fixing Add Driver button..." -ForegroundColor Yellow
$content = $content -replace "onPress=\{\(\) => handleModuleNavigation\('Fleet', 'AddDriver'\)\}", "onPress={() => navigation.navigate('AddDriver')}"

# 5. Fix Track Package Quick Action
Write-Host "5. Fixing Track Package button..." -ForegroundColor Yellow
$content = $content -replace "onPress=\{\(\) => handleModuleNavigation\('Tracking', 'TrackShipment'\)\}", "onPress={() => navigation.navigate('TrackPackage')}"

# Save the updated file
Set-Content -Path $dashboardFile -Value $content

# Create backup
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
Copy-Item $dashboardFile -Destination "$dashboardFile.backup-$timestamp"

Write-Host "`n=== Navigation Fixed ===" -ForegroundColor Green
Write-Host "`nWhat was fixed:" -ForegroundColor Cyan
Write-Host "  - Pending Orders card -> Now opens PendingOrders screen" -ForegroundColor White
Write-Host "  - On-Time Rate card -> Now opens DeliveryMetrics screen" -ForegroundColor White
Write-Host "  - New Order button -> Now opens CreateOrder screen" -ForegroundColor White
Write-Host "  - Add Driver button -> Now opens AddDriver screen" -ForegroundColor White
Write-Host "  - Track Package button -> Now opens TrackPackage screen" -ForegroundColor White

Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "  1. Reload the app (Press 'r' in Expo terminal)" -ForegroundColor White
Write-Host "  2. Test all buttons - they should navigate directly now!" -ForegroundColor White
Write-Host "  3. No more 'will be built next' popups!" -ForegroundColor Green