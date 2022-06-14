$rootDir = Split-Path $PSScriptRoot -Parent
$distDir = Resolve-Path -Path "$rootDir\dist"
if (Test-Path $distDir) {
  Remove-Item -Path $distDir -Recurse -Force
}
$toolDir = Resolve-Path -Path "$rootDir\tools"
& ncc build $rootDir\index.js -o $distDir -C
Copy-Item -Path $toolDir -Destination $distDir\tools\ -Recurse -Exclude @("bundler.ps1", "packup.ps1")
Copy-Item -Path $rootDir\config.json -Destination $distDir