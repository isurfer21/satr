$rootDir = Split-Path $PSScriptRoot -Parent
$distDir = Resolve-Path -Path "$rootDir\dist"
$zipFile = Resolve-Path -Path "$rootDir\dist\Satr.zip"
Remove-Item -Path $zipFile
Compress-Archive -Path $distDir -DestinationPath $zipFile