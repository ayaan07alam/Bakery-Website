# Quick ESLint auto-fix script
# This script batch-fixes common ESLint errors

Write-Host "Running ESLint auto-fix..." -ForegroundColor Cyan

# First, try auto-fixing what ESLint can fix automatically
cd d:\SahaBakery\frontend
npm run lint -- --fix

Write-Host "`nAuto-fix complete. Running final lint check..." -ForegroundColor Green
npm run lint
