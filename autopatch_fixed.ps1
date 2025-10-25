# autopatch_fixed.ps1
# Safer autopatcher: fixes guarded useSelector occurrences and conservatively wraps plain text in <Text>.
# Run from project root. Creates full backup + per-file .bak files.

Set-StrictMode -Version Latest

$root = Get-Location
$ts = (Get-Date).ToString("yyyyMMdd-HHmmss")
$fullBackup = Join-Path $root "backup_autopatch_fixed_$ts"
Write-Host "Creating full project backup at: $fullBackup"
New-Item -ItemType Directory -Force -Path $fullBackup | Out-Null

# Backup all source files (exclude node_modules)
Get-ChildItem -Recurse -File | Where-Object { $_.FullName -notmatch "\\node_modules\\" } | ForEach-Object {
  $dest = $_.FullName.Replace($root, $fullBackup)
  $dir = Split-Path $dest -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  Copy-Item -Path $_.FullName -Destination $dest -Force
}

# source files list
$sourceFiles = Get-ChildItem -Recurse -Include *.js,*.jsx,*.ts,*.tsx | Where-Object { $_.FullName -notmatch "\\node_modules\\" } | Select-Object -ExpandProperty FullName

# Regex for guarded useSelector (use a here-string so quoting inside pattern is safe)
$guardPattern = [regex]::new(@"
useSelector\s*\(\s*typeof\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*!==\s*['""]undefined['""]\s*\?\s*\1\s*:\s*\(\s*s\s*\)\s*=>\s*s\s*\)
"@, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)

$modifiedFiles = @()
$skipped = @()
$fixed = @()

Write-Host "Scanning files for guarded useSelector occurrences..." -ForegroundColor Cyan

foreach ($f in $sourceFiles) {
  try {
    $text = Get-Content -Raw -LiteralPath $f -ErrorAction Stop
  } catch {
    continue
  }

  $matches = $guardPattern.Matches($text)
  if ($matches.Count -eq 0) { continue }

  $newText = $text
  $changed = $false

  foreach ($m in $matches) {
    $ident = $m.Groups[1].Value
    # check if identifier exists anywhere in repo (excluding node_modules)
    $exists = Select-String -Path (Get-ChildItem -Recurse -Include *.js,*.jsx,*.ts,*.tsx | Where-Object { $_.FullName -notmatch "\\node_modules\\" } | Select-Object -ExpandProperty FullName) -Pattern ("\b" + [regex]::Escape($ident) + "\b") -Quiet

    if ($exists) {
      # replace guarded call with clean useSelector(identifier)
      $guardedLiteral = [regex]::Escape($m.Value)
      $newText = [regex]::Replace($newText, $guardedLiteral, "useSelector($ident)")
      $changed = $true
      if (-not $fixed.ContainsKey($ident)) { $fixed[$ident] = @() } 2>$null
      $fixed[$ident] += $f
    } else {
      $skipped += @{ file = $f; selector = $ident }
      Write-Host "SKIP (selector not found): $ident in $f" -ForegroundColor Yellow
    }
  }

  if ($changed -and $newText -ne $text) {
    # backup and write
    Copy-Item -Path $f -Destination "$f.bak" -Force
    Set-Content -LiteralPath $f -Value $newText -Encoding UTF8
    $modifiedFiles += $f
    Write-Host "Patched: $f" -ForegroundColor Green
  }
}

# Conservative JSX text wrapping patterns
Write-Host "Running conservative JSX text-wrapping pass..." -ForegroundColor Cyan

$wrapPattern1 = [regex]::new(@"
(?s)<(View|Pressable|TouchableOpacity|TouchableHighlight|SafeAreaView)\b([^>]*)>\s*([^<\r\n][^<]*?)\s*</\1>
"@, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)

$wrapPatternCond = [regex]::new(@"
\{\s*([^&\}]+?)\s*&&\s*(['""])(.+?)\2\s*\}
"@, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)

$wrapPatternReturn = [regex]::new(@"
return\s+(['""])(.+?)\1\s*;
"@, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)

$wrapPatternIcon = [regex]::new(@"
<(Icon\b[^/>]*?/>)\s*([A-Za-z0-9].+?)($|\r?\n)
"@, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)

foreach ($f in $sourceFiles) {
  try { $text = Get-Content -Raw -LiteralPath $f -ErrorAction Stop } catch { continue }
  $orig = $text

  # 1) wrap plain children
  $text = $wrapPattern1.Replace($text, {
    param($mm)
    $tag = $mm.Groups[1].Value
    $attrs = $mm.Groups[2].Value
    $inner = $mm.Groups[3].Value.Trim()
    if ($inner -match '<Text\b' -or $inner -match '^\{') { return $mm.Value }
    return "<$tag$attrs><Text>$inner</Text></$tag>"
  })

  # 2) wrap conditional "string"
  $text = $wrapPatternCond.Replace($text, {
    param($mm)
    $cond = $mm.Groups[1].Value.Trim()
    $content = $mm.Groups[3].Value
    return ("{" + $cond + " && <Text>" + $content + "</Text>}")
  })

  # 3) return "literal"
  $text = $wrapPatternReturn.Replace($text, {
    param($mm)
    $content = $mm.Groups[2].Value
    return ("return <Text>" + $content + "</Text>;")
  })

  # 4) Icon ... text
  $text = $wrapPatternIcon.Replace($text, {
    param($mm)
    $icon = $mm.Groups[1].Value.Trim()
    $txt = $mm.Groups[2].Value.Trim()
    if ($txt -match '^<Text\b' -or $txt -match '^\{') { return $mm.Value }
    return $icon + " <Text>" + $txt + "</Text>" + $mm.Groups[3].Value
  })

  if ($text -ne $orig) {
    if (-not (Test-Path "$f.bak")) {
      Copy-Item -Path $f -Destination "$f.bak" -Force
    } else {
      Copy-Item -Path $f -Destination "$f.bak.$ts" -Force
    }
    Set-Content -LiteralPath $f -Value $text -Encoding UTF8
    if (-not ($modifiedFiles -contains $f)) { $modifiedFiles += $f }
    Write-Host "Wrapped text in: $f" -ForegroundColor Green
  }
}

# Summary
Write-Host "`n--- autopatch_fixed summary ---" -ForegroundColor Cyan
Write-Host "Full project backup: $fullBackup"
Write-Host "Files modified: $($modifiedFiles.Count)"
$modifiedFiles | ForEach-Object { Write-Host "- $_" }

if ($fixed.Keys.Count -gt 0) {
  Write-Host "`nFixed selectors:"
  foreach ($k in $fixed.Keys) { Write-Host " - $k (patched in $($fixed[$k].Count) file(s))" }
}

if ($skipped.Count -gt 0) {
  Write-Host "`nSKIPPED (guarded selectors not found):"
  foreach ($s in $skipped) { Write-Host " - $($s.selector) in $($s.file)" }
  Write-Host "`nFor skipped selectors: add the selector export/import or replace the guarded call manually."
}

Write-Host "`nPer-file backups (*.bak) created alongside modified files."
Write-Host "To view diff for a file: fc .\\path\\to\\file.bak .\\path\\to\\file"
Write-Host "To revert one file: Copy-Item .\\path\\to\\file.bak .\\path\\to\\file -Force"
Write-Host "------------------------------" -ForegroundColor Cyan
