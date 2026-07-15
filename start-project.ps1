$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$venvActivate = Join-Path $projectRoot "..\.venv\Scripts\Activate.ps1"

Set-Location $projectRoot

if (Test-Path $venvActivate) {
    . $venvActivate
}

Write-Host "Starting Collectify backend at http://127.0.0.1:5000"
Write-Host "Open index.html with Live Server for the frontend."
python backend/app.py
