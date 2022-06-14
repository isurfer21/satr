param([Parameter(Mandatory=$true)] $bucket)

$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$headers.Add("Authorization", "Bearer am9obmRvZXwwMGU1ZmNmMmExN2ZhMTc3NDk3NGMyMDE5Y2RmZGNmOQ==")

$subscribeUrl = 'http://localhost:3000/subscribe/' + $bucket

$response = Invoke-RestMethod $subscribeUrl -Method 'DELETE' -Headers $headers
$response | ConvertTo-Json