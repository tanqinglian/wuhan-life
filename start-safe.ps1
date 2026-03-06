# wuhan-life safe launcher
$ErrorActionPreference = "Continue"

Write-Host "[INFO] Stopping existing process on port 3000..."
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | ForEach-Object {
    Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
}
Start-Sleep -Seconds 2

Write-Host "[INFO] Starting wuhan-life..."
Set-Location D:\workspace\wuhan-life

# Start in background
$job = Start-Job -ScriptBlock {
    Set-Location D:\workspace\wuhan-life
    npm run dev 2>&1
}

Write-Host "[OK] Started job: $($job.Id)"
Write-Host "[INFO] Waiting 5 seconds..."
Start-Sleep -Seconds 5

# Check
$check = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($check) {
    Write-Host "[SUCCESS] Server running on http://localhost:3000"
} else {
    Write-Host "[WARN] Server not yet started"
}

exit 0
