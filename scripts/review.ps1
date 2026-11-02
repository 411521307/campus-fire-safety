<#
.SYNOPSIS
    Runs OpenCode CLI to double-check code against specifications.
.DESCRIPTION
    AI Lab Double Checker review script.
.PARAMETER TargetFile
    Path to the source code file to check.
.PARAMETER TaskFile
    Optional path to the task specification file.
#>
param(
    [Parameter(Mandatory=$false)]
    [string]$TargetFile = "src/fire_safety/index.html",

    [Parameter(Mandatory=$false)]
    [string]$TaskFile = "tasks/active/TASK-002-fire-safety-guide.md"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🔍 AI Lab: OpenCode Double Checker" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if (-not (Test-Path $TargetFile)) {
    Write-Error "Target file not found: $TargetFile"
    exit 1
}

Write-Host "Checking target: $TargetFile" -ForegroundColor Yellow
if ($TaskFile -and (Test-Path $TaskFile)) {
    Write-Host "Referencing task spec: $TaskFile" -ForegroundColor Yellow
    Write-Host "`nLaunching OpenCode session..." -ForegroundColor Green
    $prompt = "Act as Double Checker according to prompts/CHECKER_PROMPT.md. Review $TargetFile against the specifications in $TaskFile."
    & opencode.cmd run --file $TargetFile --file $TaskFile $prompt
} else {
    Write-Host "`nLaunching OpenCode session..." -ForegroundColor Green
    $prompt = "Act as Double Checker according to prompts/CHECKER_PROMPT.md. Review $TargetFile for bugs, edge cases, and safety."
    & opencode.cmd run --file $TargetFile $prompt
}
