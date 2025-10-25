<#
autopatch_useSelector_and_wrap_text.ps1
Safe autopatcher:
 - Creates full project backup
 - Finds guarded useSelector occurrences and tries to replace with clean useSelector(selector) when selector is found in repo
 - Adds import lines for found selectors if missing (named import)
 - Leaves guarded occurrences unchanged when selector not found and prints them
 - Also runs a conservative Text-wrapping pass for common JSX cases (creates .bak)
 - Prints summary and list of modified files
#>

Set-StrictMode -Version Latest
$root = Get-Location
$timestamp = (Get-Date).ToString("yyyyMMdd-HHmmss")
$fullBackup = Join-Path $root "backup_autopatch_$timestamp"
Write-Host "Creating full project backup at: $fullBackup"
New-Item -ItemType Directory -Force -Path $fullBackup | Out-Null

# copy project files (exclude node_modules)
Get-ChildItem -Recurse -File | Where-Object { $_.FullName -notmatch "\\node_modules\\" } | ForEach-Object {
    $dest = $_.FullName.Replace($root, $fullBackup)
    $destDir = Split-Path $dest -Parent
    if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
    Copy-Item -Path $_.FullName -Destination $dest -Force
}

# gather repo files list
$sourceFiles = Get-ChildItem -Recurse -Include *.js,*.jsx,*.ts,*.tsx | Where-Object { $_.FullName -notmatch "\\node_modules\\" } | Select-Object -ExpandProperty FullName

# Build a simple export index: selectorName -> file(s)
# Look for patterns: export const NAME, export function NAME, export { NAME }, export { NAME as ... }
Write-Host "Indexing exports (this may take a few seconds)..."
$exportIndex = @{}
$exportPatterns = @(
  'export\s+const\s+([A-Za-z_$][A-Za-z0-9_$]*)\b',
  'export\s+function\s+([A-Za-z_$][A-Za-z0-9_$]*)\b',
  'export\s+\{\s*([A-Za-z_$][A-Za-z0-9_$]*)(?:\s+as\s+[A-Za-z_$][A-Za-z0-9_$]*)?\s*(?:,\s*[A-Za-z_$][A-Za-z0-9_$]*\s*)*\}',
  'module\.exports\.\s*([A-Za-z_$][A-Za-z0-9_$]*)\b'
)

foreach ($f in $sourceFiles) {
  try {
    $text = Get-Content -Raw -LiteralPath $f -ErrorAction Stop
  } catch { continue }
  foreach ($pat in $exportPatterns) {
    [regex]::Matches($text, $pat) | ForEach-Object {
      $name = $_.Groups[1].Value
      if ($name) {
        if (-not $exportIndex.ContainsKey($name)) { $exportIndex[$name] = @() }
        $exportIndex[$name] += $f
      }
    }
  }
}

Write-Host "Indexed $($exportIndex.Keys.Count) exported identifiers."

# Pattern for guarded useSelector form created earlier
$guardPattern = 'useSelector\s*\(\s*typeof\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*!==\s*[\'"]undefined[\'"]\s*\?\s*\1\s*:\s*\(\s*s\s*\)\s*=>\s*s\s*\)'

$modifiedFiles = @()
$skippedOccurrences = @()
$fixedSelectors = @{}

# helper to compute import path (relative, without extension)
function Get-ImportPath([string]$fromFile, [string]$targetFile) {
  $fromDir = Split-Path $fromFile -Parent
  $rel = Resolve-Path -Path $targetFile -Relative -ErrorAction SilentlyContinue
  # If Resolve-Path -Relative isn't available, compute manually:
  try {
    $uriFrom = New-Object System.Uri((Resolve-Path $fromDir).ProviderPath + [System.IO.Path]::DirectorySeparatorChar)
    $uriTo   = New-Object System.Uri((Resolve-Path $targetFile).ProviderPath)
    $relUri  = $uriFrom.MakeRelativeUri($uriTo).ToString()
    $relPath = [System.Uri]::UnescapeDataString($relUri) -replace '/', '\'
    # remove extension
    $noExt = [System.IO.Path]::ChangeExtension($relPath, $null)
    # convert back to posix style import path
    if ($noExt -notmatch '^[.\\]') { $noExt = ".\$noExt" }
    # convert backslashes to forward slashes
    $imp = $noExt -replace '\\','/'
    return $imp
  } catch {
    # fallback: just return file name without extension
    return [System.IO.Path]::GetFileNameWithoutExtension($targetFile)
  }
}

Write-Host "Scanning files for guarded useSelector occurrences..."
foreach ($f in $sourceFiles) {
  try { $text = Get-Content -Raw -LiteralPath $f -ErrorAction Stop } catch { continue }
  $matches = [regex]::Matches($text, $guardPattern)
  if ($matches.Count -eq 0) { continue }

  $newText = $text
  $changedFile = $false

  foreach ($m in $matches) {
    $ident = $m.Groups[1].Value
    if ($exportIndex.ContainsKey($ident)) {
      # pick first exported file that is not the same as current file
      $candidates = $exportIndex[$ident] | Where-Object { $_ -ne $f }
      if ($candidates.Count -eq 0) { $candidates = $exportIndex[$ident] } # allow import from same file if needed
      $target = $candidates[0]
      # Create import if not present
      $alreadyImported = $false
      # Check for existing import lines for that identifier
      if ($newText -match "\bimport\s+\{\s*.*\b$ident\b.*\}\s+from\b" -or $newText -match "\bimport\s+$ident\s+from\b") { $alreadyImported = $true }

      if (-not $alreadyImported) {
        # compute a relative import path
        $importPath = Get-ImportPath -fromFile $f -targetFile $target
        # normalize import path: if it doesn't start with '.' add './'
        if ($importPath -notmatch '^\.' ) { $importPath = "./$importPath" }
        # remove leading .\/.\ occurrences
        $importPath = $importPath -replace '^\./\./','./'

        # Prepare import line to add after existing imports
        # find last import line index
        $lines = $newText -split "`n"
        $lastImportIndex = -1
        for ($i=0; $i -lt $lines.Length; $i++) {
          if ($lines[$i] -match '^\s*import\b') { $lastImportIndex = $i }
        }
        $importLine = "import { $ident } from '$importPath';"
        if ($lastImportIndex -ge 0) {
          # insert after last import
          $before = $lines[0..$lastImportIndex]
          $after = $lines[($lastImportIndex+1)..($lines.Length - 1)]
          $lines = $before + $importLine + $after
        } else {
          # no imports - add at top
          $lines = $importLine + $lines
        }
        $newText = ($lines -join "`n")
        $changedFile = $true
      }

      # Now replace guarded with clean useSelector(ident)
      $guardedLiteral = [regex]::Escape($m.Value)
      $newText = [regex]::Replace($newText, $guardedLiteral, "useSelector($ident)")
      $changedFile = $true
      if (-not $fixedSelectors.ContainsKey($ident)) { $fixedSelectors[$ident] = @() }
      $fixedSelectors[$ident] += $f
    } else {
      # selector not found in index - skip and report
      $skippedOccurrences += @{ file = $f; selector = $ident; context = ($text.Substring([Math]::Max(0,$m.Index-200), [Math]::Min(400, $text.Length - $m.Index))) }
      Write-Host "SKIP: selector '$ident' not found in repo (file: $f)."
    }
  }

  if ($changedFile) {
    # create .bak and write new content
    Copy-Item -Path $f -Destination "$f.bak" -Force
    Set-Content -LiteralPath $f -Value $newText -Encoding UTF8
    $modifiedFiles += $f
  }
}

# Now run conservative Text-wrapping pass for common JSX issues (creates .bak if it changes file)
Write-Host "Running conservative Text-wrapping pass (wraps plain strings inside View/Pressable/Touchable... tags)."
$wrapPattern1 = '(?s)<(View|Pressable|TouchableOpacity|TouchableHighlight|SafeAreaView|Pressable[^>]*)\b([^>]*)>\s*([^<\r\n][^<]*?)\s*</\1>'
$wrapPattern3 = '\{\s*([^&\}]+?)\s*&&\s*([\"\'])(.+?)\2\s*\}'
$wrapPattern4 = 'return\s+([\"\'])(.+?)\1\s*;'
$wrapPattern5 = '<(Icon\b[^/>]*?/>)\s*([A-Za-z0-9].+?)($|\r?\n)'

foreach ($f in $sourceFiles) {
  try { $text = Get-Content -Raw -LiteralPath $f -ErrorAction Stop } catch { continue }

  $orig = $text
  # wrap plain children
  $text = [regex]::Replace($text, $wrapPattern1, {
    param($m)
    $tag = $m.Groups[1].Value
    $attrs = $m.Groups[2].Value
    $inner = $m.Groups[3].Value.Trim()
    if ($inner -match '<Text\b' -or $inner -match '^\{') { return $m.Value }
    return "<$tag$attrs><Text>$inner</Text></$tag>"
  }, 'IgnoreCase')

  # { cond && "string" }
  $text = [regex]::Replace($text, $wrapPattern3, {
    param($m)
    $cond = $m.Groups[1].Value.Trim()
    $content = $m.Groups[3].Value
    return ("{" + $cond + " && <Text>" + $content + "</Text>}")
  }, 'IgnoreCase')

  # return "literal";
  $text = [regex]::Replace($text, $wrapPattern4, {
    param($m)
    $content = $m.Groups[2].Value
    return ("return <Text>" + $content + "</Text>;")
  }, 'IgnoreCase')

  # Icon ... text
  $text = [regex]::Replace($text, $wrapPattern5, {
    param($m)
    $icon = $m.Groups[1].Value.Trim()
    $txt = $m.Groups[2].Value.Trim()
    if ($txt -match '^<Text\b' -or $txt -match '^\{') { return $m.Value }
    return $icon + " <Text>" + $txt + "</Text>" + $m.Groups[3].Value
  }, 'IgnoreCase')

  if ($text -ne $orig) {
    # avoid double .bak (if existed skip), create .bak if not present for this run
    if (-not (Test-Path "$f.bak")) {
      Copy-Item -Path $f -Destination "$f.bak" -Force
    } else {
      # if a .bak already exists, create timestamped backup
      Copy-Item -Path $f -Destination "$f.bak.$timestamp" -Force
    }
    Set-Content -LiteralPath $f -Value $text -Encoding UTF8
    if (-not ($modifiedFiles -contains $f)) { $modifiedFiles += $f }
  }
}

# Summary
Write-Host "`n--- Autopatch summary ---"
Write-Host "Full project backup: $fullBackup"
Write-Host "Files modified: $($modifiedFiles.Count)"
if ($modifiedFiles.Count -gt 0) { $modifiedFiles | ForEach-Object { Write-Host "- $_" } }

if ($fixedSelectors.Keys.Count -gt 0) {
  Write-Host "`nFixed selectors:"
  foreach ($k in $fixedSelectors.Keys) {
    Write-Host " - $k fixed in $($fixedSelectors[$k].Count) file(s)"
  }
}

if ($skippedOccurrences.Count -gt 0) {
  Write-Host "`nSKIPPED guarded selectors (not found in repo):"
  foreach ($s in $skippedOccurrences) {
    Write-Host " - $($s.selector) in $($s.file)"
  }
  Write-Host "`nFor skipped selectors either add the correct selector export or replace the guarded call with an inline selector, e.g.:"
  Write-Host "  useSelector(state => state.routes?.filtered || [])"
}

Write-Host "`nPer-file backups (*.bak) have been created alongside modified files."
Write-Host "To view diffs: use 'fc file.bak file' (Windows) or open both files in VS Code."
Write-Host "To revert a file: Copy-Item path\\to\\File.js.bak path\\to\\File.js -Force"
Write-Host "-------------------------`n"
