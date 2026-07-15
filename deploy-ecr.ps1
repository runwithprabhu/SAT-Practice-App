# SAT Practice App - Deploy via ECR (push image to AWS, pull from EC2)
# Prerequisites: AWS CLI, Docker, EC2 instance already running

param(
    [string]$Region = "us-east-1",
    [string]$RepoName = "sat-practice-app"
)

Write-Host "=== Deploy via AWS ECR ===" -ForegroundColor Cyan

# Get AWS account ID
$AccountId = aws sts get-caller-identity --query Account --output text
$EcrUri = "$AccountId.dkr.ecr.$Region.amazonaws.com"

# Step 1: Create ECR repo (ignore if exists)
Write-Host "`n[1/4] Creating ECR repository..." -ForegroundColor Yellow
aws ecr create-repository --repository-name $RepoName --region $Region 2>$null
Write-Host "ECR repo ready: $EcrUri/$RepoName" -ForegroundColor Green

# Step 2: Login to ECR
Write-Host "`n[2/4] Logging into ECR..." -ForegroundColor Yellow
aws ecr get-login-password --region $Region | docker login --username AWS --password-stdin $EcrUri
Write-Host "Logged in." -ForegroundColor Green

# Step 3: Build and push
Write-Host "`n[3/4] Building and pushing Docker image..." -ForegroundColor Yellow
docker build -t ${RepoName}:latest .
docker tag ${RepoName}:latest ${EcrUri}/${RepoName}:latest
docker push ${EcrUri}/${RepoName}:latest
Write-Host "Image pushed to ECR." -ForegroundColor Green

# Step 4: Instructions for EC2
Write-Host "`n[4/4] Deploy on EC2:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  SSH into your EC2 instance and run:" -ForegroundColor Gray
Write-Host ""
Write-Host "  aws ecr get-login-password --region $Region | docker login --username AWS --password-stdin $EcrUri" -ForegroundColor White
Write-Host "  docker pull ${EcrUri}/${RepoName}:latest" -ForegroundColor White
Write-Host "  docker stop sat-app 2>/dev/null; docker rm sat-app 2>/dev/null" -ForegroundColor White
Write-Host "  docker run -d -p 3000:3000 --restart always --name sat-app ${EcrUri}/${RepoName}:latest" -ForegroundColor White
Write-Host ""
Write-Host "=== Done ===" -ForegroundColor Cyan
