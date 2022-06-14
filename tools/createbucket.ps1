param([Parameter(Mandatory=$true)] $bucket)

$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$headers.Add("Content-Type", "application/json")
$headers.Add("Authorization", "Bearer am9obmRvZXwwMGU1ZmNmMmExN2ZhMTc3NDk3NGMyMDE5Y2RmZGNmOQ==")

$body = "{
`n    `"expiry`": `"2023-12-31`"
`n}"

$subscribeUrl = 'http://localhost:3000/subscribe/' + $bucket

$response = Invoke-RestMethod $subscribeUrl -Method 'POST' -Headers $headers -Body $body
$response | ConvertTo-Json