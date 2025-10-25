# Find All Unwrapped Text Issues
Write-Host "Searching for unwrapped text in all screens..." -ForegroundColor Green

$screens = @(
    "screens\dashboard\DashboardScreen.js",
    "screens\orders\OrdersListScreen.js",
    "screens\fleet\FleetOverview.js",
    "screens\shipments\ShipmentsScreen.js",
    "screens\routes\RoutesScreen.js",
    "screens\notifications\NotificationsScreen.js"
)

$issues = @()

foreach ($screen in $screens) {
    if (Test-Path $screen) {
        Write-Host "`nChecking $screen..." -ForegroundColor Yellow
        $content = Get-Content $screen -Raw
        
        # Check for common issues:
        # 1. String literals directly in JSX: <View>"text"</View>
        # 2. Variables without Text: <View>{variable}</View> where variable is a string
        # 3. Template literals: <View>`text`</View>
        
        # Look for suspicious patterns
        $lines = Get-Content $screen
        $lineNum = 0
        foreach ($line in $lines) {
            $lineNum++
            
            # Pattern: <View> followed by quote or backtick
            if ($line -match '<View[^>]*>\s*["`'']' -and $line -notmatch '<Text') {
                $issues += "$screen : Line $lineNum : $line"
            }
            
            # Pattern: Direct string in component without Text wrapper
            if ($line -match '>\s*["''](?!<)' -and $line -notmatch '</Text>' -and $line -notmatch '{/\*') {
                $issues += "$screen : Line $lineNum : $line"
            }
        }
    }
}

if ($issues.Count -gt 0) {
    Write-Host "`n=== FOUND ISSUES ===" -ForegroundColor Red
    foreach ($issue in $issues) {
        Write-Host $issue -ForegroundColor Yellow
    }
} else {
    Write-Host "`nNo obvious text issues found in main screens." -ForegroundColor Green
    Write-Host "The error might be in a component or during conditional rendering." -ForegroundColor Yellow
}

Write-Host "`n=== ALTERNATIVE FIX ===" -ForegroundColor Cyan
Write-Host "Since the error happens at app start, try this:" -ForegroundColor Yellow
Write-Host "1. Add LogBox.ignoreAllLogs() temporarily to see if app works" -ForegroundColor White
Write-Host "2. Check each tab screen one by one" -ForegroundColor White

Write-Host "`nCreate this file to ignore the warning temporarily:" -ForegroundColor Yellow
$ignoreWarnings = @'
// Add to App.js at the top, after imports:
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Text strings must be rendered']);
'@

Set-Content -Path "ignore_warnings.txt" -Value $ignoreWarnings
Write-Host "Instructions saved to ignore_warnings.txt" -ForegroundColor Green