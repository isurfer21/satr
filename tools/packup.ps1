$rootDir = Split-Path $PSScriptRoot -Parent
$distDir = Join-Path -Path "$rootDir" -ChildPath "dist"
$zipFile = Join-Path -Path "$distDir" -ChildPath "Satr.zip"
if (Test-Path $zipFile) {
    Remove-Item -Path $zipFile
}
Compress-Archive -Path $distDir -DestinationPath $zipFile