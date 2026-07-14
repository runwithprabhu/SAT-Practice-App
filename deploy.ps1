# SAT Practice App - AWS Deployment Script
# Prerequisites: AWS CLI configured, Node.js installed

param(
    [string]$StackName = "sat-practice-app",
    [string]$Region = "us-east-1"
)

Write-Host "=== SAT Practice App - AWS Deployment ===" -ForegroundColor Cyan

# Step 1: Build the React app
Write-Host "`n[1/4] Building the app..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "Build complete." -ForegroundColor Green

# Step 2: Deploy CloudFormation stack
Write-Host "`n[2/4] Deploying CloudFormation stack..." -ForegroundColor Yellow
aws cloudformation deploy `
    --template-file infra/template.yaml `
    --stack-name $StackName `
    --region $Region `
    --no-fail-on-empty-changeset

if ($LASTEXITCODE -ne 0) {
    Write-Host "CloudFormation deployment failed!" -ForegroundColor Red
    exit 1
}
Write-Host "Stack deployed." -ForegroundColor Green

# Step 3: Get bucket name and distribution ID from stack outputs
Write-Host "`n[3/4] Uploading files to S3..." -ForegroundColor Yellow
$BucketName = aws cloudformation describe-stacks `
    --stack-name $StackName `
    --region $Region `
    --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" `
    --output text

$DistributionId = aws cloudformation describe-stacks `
    --stack-name $StackName `
    --region $Region `
    --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" `
    --output text

# Sync build output to S3
aws s3 sync dist/ "s3://$BucketName" --delete --region $Region
Write-Host "Files uploaded." -ForegroundColor Green

# Step 4: Invalidate CloudFront cache
Write-Host "`n[4/4] Invalidating CloudFront cache..." -ForegroundColor Yellow
aws cloudfront create-invalidation `
    --distribution-id $DistributionId `
    --paths "/*" | Out-Null
Write-Host "Cache invalidation started." -ForegroundColor Green

# Get the website URL
$WebsiteURL = aws cloudformation describe-stacks `
    --stack-name $StackName `
    --region $Region `
    --query "Stacks[0].Outputs[?OutputKey=='WebsiteURL'].OutputValue" `
    --output text

Write-Host "`n=== Deployment Complete ===" -ForegroundColor Cyan
Write-Host "Your app is live at: $WebsiteURL" -ForegroundColor Green
Write-Host "(CloudFront may take a few minutes to fully propagate)" -ForegroundColor Gray
