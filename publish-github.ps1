# Publish SkyCast to GitHub and enable GitHub Pages
$ErrorActionPreference = "Stop"
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

Set-Location $PSScriptRoot

Write-Host "Checking GitHub authentication..."
$authCheck = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "You need to log in to GitHub first."
  gh auth login -h github.com -p https -w
}

$repoName = "weather-app"
$user = gh api user -q .login
$remote = "https://github.com/$user/$repoName.git"

Write-Host "Creating repository $user/$repoName ..."
gh repo view "$user/$repoName" 2>$null
if ($LASTEXITCODE -ne 0) {
  gh repo create $repoName --public --source=. --remote=origin --description "SkyCast - React weather app powered by Open-Meteo"
} else {
  git remote remove origin 2>$null
  git remote add origin $remote
}

Write-Host "Pushing to GitHub..."
git push -u origin main

Write-Host "Enabling GitHub Pages (GitHub Actions source)..."
gh api repos/$user/$repoName/pages -X POST -f build_type=workflow 2>$null
if ($LASTEXITCODE -ne 0) {
  gh api repos/$user/$repoName/pages -X PUT -f build_type=workflow
}

Write-Host ""
Write-Host "Done! Your site will be live in 1-2 minutes at:"
Write-Host "https://$user.github.io/$repoName/"
Write-Host ""
Write-Host "Track deployment: https://github.com/$user/$repoName/actions"
