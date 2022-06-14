$rootDir = Split-Path $PSScriptRoot -Parent
$distDir = Join-Path -Path $rootDir -ChildPath "dist"
if (Test-Path $distDir) {
  Remove-Item -Path $distDir -Recurse -Force
}
$indexFile = Join-Path -Path $rootDir -ChildPath "index.js"
& ncc build $indexFile -o $distDir -C
$toolDir = Join-Path -Path $rootDir -ChildPath "tools"
Copy-Item -Path $toolDir -Destination $distDir -Recurse -Exclude @("bundler.ps1", "packup.ps1")
$configFile = Join-Path -Path $rootDir -ChildPath "config.json"
Copy-Item -Path $configFile -Destination $distDir