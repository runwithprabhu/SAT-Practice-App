# SAT Practice App - AWS EC2 Deployment Script
# Prerequisites: AWS CLI configured, Docker installed locally

param(
    [string]$StackName = "sat-practice-app",
    [string]$Region = "us-east-1",
    [string]$KeyPairName = ""
)

Write-Host "=== SAT Practice App - AWS EC2 Deployment ===" -ForegroundColor Cyan

if (-not $KeyPairName) {
    Write-Host "ERROR: You must provide a KeyPairName." -ForegroundColor Red
    Write-Host "Usage: .\deploy.ps1 -KeyPairName your-key-pair-name" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To create a key pair:" -ForegroundColor Gray
    Write-Host "  aws ec2 create-key-pair --key-name sat-app-key --query KeyMaterial --output text > sat-app-key.pem" -ForegroundColor Gray
    exit 1
}

# Step 1: Deploy CloudFormation stack (creates EC2 instance)
Write-Host "`n[1/4] Deploying EC2 infrastructure..." -ForegroundColor Yellow
aws cloudformation deploy `
    --template-file infra/template.yaml `
    --stack-name $StackName `
    --region $Region `
    --parameter-overrides KeyPairName=$KeyPairName `
    --no-fail-on-empty-changeset

if ($LASTEXITCODE -ne 0) {
    Write-Host "CloudFormation deployment failed!" -ForegroundColor Red
    exit 1
}
Write-Host "EC2 instance created." -ForegroundColor Green

# Step 2: Get EC2 public IP
Write-Host "`n[2/4] Getting instance details..." -ForegroundColor Yellow
$PublicIP = aws cloudformation describe-stacks `
    --stack-name $StackName `
    --region $Region `
    --query "Stacks[0].Outputs[?OutputKey=='PublicIP'].OutputValue" `
    --output text

Write-Host "EC2 Public IP: $PublicIP" -ForegroundColor Green

# Step 3: Build Docker image
Write-Host "`n[3/4] Building Docker image..." -ForegroundColor Yellow
docker build -t sat-practice-app .
if ($LASTEXITCODE -ne 0) {
    Write-Host "Docker build failed!" -ForegroundColor Red
    exit 1
}

# Save image to tar for transfer
docker save sat-practice-app -o sat-practice-app.tar
Write-Host "Docker image built and saved." -ForegroundColor Green

# Step 4: Deploy to EC2
Write-Host "`n[4/4] Deploying to EC2..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Run these commands to deploy to your EC2 instance:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  # Copy the image to EC2" -ForegroundColor Gray
Write-Host "  scp -i $KeyPairName.pem sat-practice-app.tar ec2-user@${PublicIP}:~/" -ForegroundColor White
Write-Host ""
Write-Host "  # SSH into the instance" -ForegroundColor Gray
Write-Host "  ssh -i $KeyPairName.pem ec2-user@${PublicIP}" -ForegroundColor White
Write-Host ""
Write-Host "  # Load and run the Docker container" -ForegroundColor Gray
Write-Host "  docker load -i sat-practice-app.tar" -ForegroundColor White
Write-Host "  docker run -d -p 3000:3000 --restart always --name sat-app sat-practice-app" -ForegroundColor White
Write-Host ""
Write-Host "=== Your app will be available at ===" -ForegroundColor Cyan
Write-Host "http://${PublicIP}:3000" -ForegroundColor Green
Write-Host ""

# Cleanup
Remove-Item sat-practice-app.tar -ErrorAction SilentlyContinue
