# Fix Dashboard Text Rendering and Navigation
Write-Host "Fixing dashboard issues..." -ForegroundColor Green

$dashboardFile = "screens\dashboard\DashboardScreen.js"
$content = Get-Content $dashboardFile -Raw

# 1. Fix the renderTouchableWrapper function - Remove {children} wrapper issue
Write-Host "`n1. Fixing renderTouchableWrapper..." -ForegroundColor Yellow
$oldWrapper = @'
  const renderTouchableWrapper = (onPress, children, style = {}) => {
    if (isAndroid) {
      return (
        <TouchableNativeFeedback
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple('#e3f2fd', false)}
          useForeground={true}
        >
          <View style={style}>
            {children}
          </View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity onPress={onPress} style={style} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  };
'@

$newWrapper = @'
  const renderTouchableWrapper = (onPress, children, style = {}) => {
    if (isAndroid) {
      return (
        <TouchableNativeFeedback
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple('#e3f2fd', false)}
          useForeground={true}
        >
          {children}
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity onPress={onPress} style={style} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  };
'@

$content = $content -replace [regex]::Escape($oldWrapper), $newWrapper

# 2. Update the header buttons to include the style in the View wrapper
Write-Host "2. Fixing header button wrappers..." -ForegroundColor Yellow
$content = $content -replace "renderTouchableWrapper\(\s+\(\) => navigation\.navigate\('Notifications'\),\s+<View style=\{styles\.headerButton\}>", @'
renderTouchableWrapper(
              () => navigation.navigate('Notifications'),
              <View style={[styles.headerButton, styles.headerButtonWrapper]}>
'@

# 3. Fix all navigation calls to use direct navigation
Write-Host "3. Fixing navigation calls..." -ForegroundColor Yellow
$content = $content -replace "onPress=\{\(\) => handleModuleNavigation\('Order Management', 'OrdersList'\)\}", "onPress={() => navigation.navigate('PendingOrders')}"
$content = $content -replace "onPress=\{\(\) => handleModuleNavigation\('Performance', 'DeliveryMetrics'\)\}", "onPress={() => navigation.navigate('DeliveryMetrics')}"
$content = $content -replace "onPress=\{\(\) => handleModuleNavigation\('Orders', 'CreateOrder'\)\}", "onPress={() => navigation.navigate('CreateOrder')}"
$content = $content -replace "onPress=\{\(\) => handleModuleNavigation\('Fleet', 'AddDriver'\)\}", "onPress={() => navigation.navigate('AddDriver')}"
$content = $content -replace "onPress=\{\(\) => handleModuleNavigation\('Tracking', 'TrackShipment'\)\}", "onPress={() => navigation.navigate('TrackPackage')}"

# Save the file
Set-Content -Path $dashboardFile -Value $content

# Backup
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
Copy-Item $dashboardFile -Destination "$dashboardFile.backup-$timestamp"

Write-Host "`n=== Fixed ===" -ForegroundColor Green
Write-Host "  - Fixed renderTouchableWrapper text rendering" -ForegroundColor White
Write-Host "  - Fixed Pending Orders navigation" -ForegroundColor White
Write-Host "  - Fixed On-Time Rate navigation" -ForegroundColor White
Write-Host "  - Fixed Quick Action buttons" -ForegroundColor White

Write-Host "`nPress 'r' in Expo to reload!" -ForegroundColor Yellow