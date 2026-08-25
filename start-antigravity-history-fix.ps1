Set-Location $PSScriptRoot
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "Node.js 16 or newer is required."
  exit 1
}
node .\wizard\server.mjs
